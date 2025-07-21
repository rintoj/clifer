import * as fs from 'fs'
import { ensureDirSync } from 'fs-extra'
import { glob } from 'glob'
import { dirname, resolve } from 'path'
import { command } from '../../cli-command-builder'
import { input } from '../../cli-input-builder'

interface Props {
  name: string
}

function findFilesInDirectory(search: string, pattern: string) {
  const files = glob.sync(pattern, {
    cwd: process.cwd(),
    absolute: true,
  })
  const targetFiles = []
  for (const path of files) {
    const content = fs.readFileSync(path, 'utf-8')
    if (content.includes(search)) {
      targetFiles.push({ path, content })
    }
  }
  return targetFiles
}

function findCommands(content: string): string[] {
  const commandRegex = /\.command\(([a-zA-Z0-9_]+)\)/g
  const matches = content.matchAll(commandRegex)
  const extractedWords = Array.from(matches, match => match[1])
  return extractedWords
}

function mapCommandsToPaths(
  content: string,
  commands: string[],
  path: string,
): Record<string, string> {
  const commandPathMap: Record<string, string> = {}

  for (const command of commands) {
    const importRegex = new RegExp(
      String.raw`import\s+(?:\{[^}]*?\b${command}\b[^}]*?\}|\b${command}\b)\s+from\s+['"](.+?)['"]`,
    )

    const match = content.match(importRegex)

    if (match?.[1]) {
      commandPathMap[command] = resolve(
        path.endsWith('.ts') ? dirname(path) : path,
        `${match[1]}.ts`,
      )
    }
  }

  return commandPathMap
}

function findCommandsFromFile(file: string) {
  const content = fs.readFileSync(file, 'utf-8')
  return mapCommandsToPaths(content, findCommands(content), file)
}

function findEntryFile(directory: string) {
  const files = findFilesInDirectory('runCli(program)', `${directory}/src/*.ts`)
  return files[0]
}

function modifyFiles(entryFile: string, parentCommands: string[]) {
  const files: string[] = []
  files.push(entryFile)
  for (let index = 0; index < parentCommands.length; index++) {
    const currentCommand = parentCommands[index]
    const nextCommand = parentCommands[index + 1]
    const commands = findCommandsFromFile(entryFile)
    if (!commands[currentCommand]) {
      importCommand(entryFile, currentCommand)
      const nextFile = nextCommand
        ? addParentCommandFile(entryFile, currentCommand)
        : addCommandFile(entryFile, currentCommand)
      files.push(nextFile)
      entryFile = nextFile
    } else {
      files.push(commands[currentCommand])
      entryFile = commands[currentCommand]
    }
  }
  return files
}

function importCommand(path: string, command: string) {
  const content = fs.readFileSync(path, 'utf-8')
  const lines = content.split('\n')
  const addImportAt = lines
    .map(line => line.match(/import .+ from .+$/))
    .reduce((lastIdx, match, idx) => (match ? idx : lastIdx), -1)
  const lastCommandIndex = lines
    .map(line => line.match(/\.command\(([.+]+)\)/))
    .reduce((lastIdx, match, idx) => (match ? idx : lastIdx), -1)
  const lastDescriptionIndex = lines
    .map(line => line.match(/\.description\((.+)\)/))
    .reduce((lastIdx, match, idx) => (match ? idx : lastIdx), -1)
  const lastVersionIndex = lines
    .map(line => line.match(/\.version\((.+)\)/))
    .reduce((lastIdx, match, idx) => (match ? idx : lastIdx), -1)

  const addCommandAt =
    lastCommandIndex > -1
      ? lastCommandIndex
      : lastVersionIndex > -1
      ? lastVersionIndex
      : lastDescriptionIndex > -1
      ? lastDescriptionIndex
      : addImportAt

  const updatedContent = [
    ...lines.slice(0, addImportAt + 1),
    `import ${command} from './${command}/${command}.command'`,
    ...lines.slice(addImportAt + 1, addCommandAt + 1),
    `  .command(${command})`,
    ...lines.slice(addCommandAt + 1),
  ].join('\n')
  console.log(`\n-----\n\n${path}:\n${updatedContent}`)
  fs.writeFileSync(path, updatedContent)
}

function addParentCommandFile(path: string, command: string) {
  const content = `import { command } from 'clifer'

export default command('${command}')
  .description('Description of the command')
`
  const targetPath = resolve(dirname(path), command, `${command}.command.ts`)
  console.log(`\n-----\n\n${targetPath}:\n${content}`)
  ensureDirSync(dirname(targetPath))
  fs.writeFileSync(targetPath, content)
  return targetPath
}

function addCommandFile(path: string, command: string) {
  const content = `import { command, input } from 'clifer'

interface Props {
  arg: string
}

export default command<Props>('${command}')
  .description('Description of the command')
  .option(input('arg').description('Description of the argument').string().required())
  .handle(async ({ arg }) => {
    console.log('Command executed with argument:', arg)
  })
`
  const targetPath = resolve(dirname(path), command, `${command}.command.ts`)
  console.log(`\n-----\n\n${targetPath}:\n${content}`)
  ensureDirSync(dirname(targetPath))
  fs.writeFileSync(targetPath, content)
  return targetPath
}

export default command<Props>('add')
  .description('Add a new command')
  .argument(input('name').description('Name of the command to add').string().required())
  .handle(async ({ name }) => {
    const parentCommands = name.split('/')
    const entryFile = findEntryFile(process.cwd())
    modifyFiles(entryFile.path, parentCommands)
  })
