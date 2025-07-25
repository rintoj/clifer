import * as fs from 'fs'
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

function findFilesByCommands(entryFile: string, parent = '') {
  let commandsByPath: Record<string, string> = {}
  const nextFile: string | undefined = entryFile
  const commands = findCommandsFromFile(nextFile)
  commandsByPath[parent] = entryFile
  for (const command of Object.keys(commands)) {
    commandsByPath = {
      ...commandsByPath,
      ...findFilesByCommands(commands[command], `${parent}/${command}`),
    }
  }
  return commandsByPath
}

function removeCommandFromFile(file: string, commandName: string) {
  const content = fs.readFileSync(file, 'utf-8')
  const commandRegex = new RegExp(`\\.command\\(\\s*['"]${commandName}['"]\\s*\\)`, 'g')
  const updatedContent = content.replace(commandRegex, '')
  const hasAdditionalCommands = updatedContent.search(commandRegex) >= 0
  const isRootCommand = updatedContent.includes('runCli(program)')
  if (!hasAdditionalCommands && !isRootCommand) {
    fs.unlinkSync(file)
    const dir = dirname(file)
    if (fs.readdirSync(dir).length === 0) {
      return fs.rmdirSync(dir, { recursive: true })
    }
    return
  }
  fs.writeFileSync(file, updatedContent)
}

export default command<Props>('remove')
  .description('Remove an existing command')
  .argument(input('name').description('Name of the command to remove').string().required())
  .handle(async ({ name }) => {
    const commandParts = name.split('/')
    const entryFile = findEntryFile(process.cwd())
    const filesByCommand = findFilesByCommands(entryFile.path)
    while (commandParts.length > 0) {
      const commandName = commandParts.join('/')
      const file = filesByCommand[`/${commandName}`]
      if (file) {
        removeCommandFromFile(file, commandParts[commandParts.length - 1])
      }
      commandParts.pop()
    }
    removeCommandFromFile(entryFile.path, name.split('/')[0])
  })
