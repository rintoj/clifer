import * as fs from 'fs'
import { glob } from 'glob'
import { dirname, resolve } from 'path'
import { command } from '../../cli-command-builder'
import { input } from '../../cli-input-builder'

interface Props {
  name: string
}

// function findFiles(search: string, targetDirectory: string) {
//   function walk(dir: string, search: string, fileList: string[] = []): string[] {
//     const files = fs.readdirSync(dir)
//     for (const file of files) {
//       const filePath = path.join(dir, file)
//       const stat = fs.statSync(filePath)
//       if (stat.isDirectory()) {
//         walk(filePath, search, fileList)
//       } else if (file.includes(search)) {
//         fileList.push(filePath)
//       }
//     }
//     return fileList
//   }

//   return walk(targetDirectory, search)
// }

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
  // This regular expression looks for the following pattern:
  // \.command\(  - Matches the literal text ".command("
  // ([a-zA-Z0-9_]+) - This is a capturing group. It matches and "captures" one or more
  //                  alphanumeric characters (a-z, A-Z, 0-9) and underscores (_).
  //                  This represents the [word] you want to extract.
  // \)            - Matches the literal closing parenthesis ")".
  // The 'g' flag at the end ensures that the search is global, finding all matches
  // in the string, not just the first one.
  const commandRegex = /\.command\(([a-zA-Z0-9_]+)\)/g

  // The matchAll method returns an iterator of all results matching the regular expression.
  const matches = content.matchAll(commandRegex)

  // We convert the iterator to an array and then map over it.
  // For each match object, the captured word is in the second element (index 1).
  // The first element (index 0) would be the full match, e.g., ".command(initCommand)".
  const extractedWords = Array.from(matches, match => match[1])

  return extractedWords
}

/**
 * Maps command variable names to their import paths from the given content.
 *
 * @param content The input string to search within, containing import statements.
 * @param commands An array of command names to find the import paths for.
 * @returns A Map where keys are command names and values are their corresponding import paths.
 */
function mapCommandsToPaths(
  content: string,
  commands: string[],
  path: string,
): Record<string, string> {
  const commandPathMap: Record<string, string> = {}

  for (const command of commands) {
    // This regex finds the import statement for a given command variable.
    // It handles both default imports (e.g., `import myCommand from './path'`)
    // and named imports (e.g., `import { myCommand } from './path'`).
    // - `import\s+`: Matches 'import' and one or more spaces.
    // - `(?:\{[^}]*?\b${command}\b[^}]*?\}|\b${command}\b)`: A non-capturing group that matches
    //   either a named import containing the command or a default import.
    // - `\s+from\s+`: Matches ' from '.
    // - `['"](.+?)['"]`: Captures the path from within single or double quotes.
    const importRegex = new RegExp(
      String.raw`import\s+(?:\{[^}]*?\b${command}\b[^}]*?\}|\b${command}\b)\s+from\s+['"](.+?)['"]`,
    )

    const match = content.match(importRegex)

    // If a match is found, the captured path is in the second element (index 1).
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

function findFiles(entryFile: string, parentCommands: string[]) {
  const files: string[] = []
  files.push(entryFile)
  for (const parentCommand of parentCommands) {
    const commands = findCommandsFromFile(entryFile)
    if (!commands[parentCommand]) {
      console.error(`Command "${parentCommand}" not found in entry file: ${entryFile}`)
      console.log(addCommand(entryFile, parentCommand))
      return
    }
    files.push(commands[parentCommand])
    entryFile = commands[parentCommand]
  }
  return files
}

function addCommand(path: string, command: string) {
  const content = fs.readFileSync(path, 'utf-8')
  const lines = content.split('\n')
  const lastImportIndex = lines
    .map(line => line.match(/import .+ from .+$/))
    .reduce((lastIdx, match, idx) => (match ? idx : lastIdx), -1)
  const lastCommandIndex = lines
    .map(line => line.match(/\.command\(([a-zA-Z0-9_]+)\)/))
    .reduce((lastIdx, match, idx) => (match ? idx : lastIdx), -1)
  return [
    ...lines.slice(0, lastImportIndex + 1),
    `import ${command} from './${command}/${command}.command'`,
    ...lines.slice(lastImportIndex + 1, lastCommandIndex + 1),
    `  .command(${command})`,
    ...lines.slice(lastCommandIndex + 1),
  ].join('\n')
}

export default command<Props>('add')
  .description('Add a new command')
  .argument(input('name').description('Name of the command to add').string().required())
  .handle(async ({ name }) => {
    console.log('🚀 ~ .handle ~ name:', name)
    const parentCommands = name.split('/')
    const entryFile = findEntryFile(process.cwd())
    const files = findFiles(entryFile.path, parentCommands)
    console.log('🚀 ~ .handle ~ files:', files)
  })
