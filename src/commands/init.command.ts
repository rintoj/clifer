import { spawnSync } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'
import { command } from '../cli-command-builder'
import { input } from '../cli-input-builder'

interface Props {
  name: string
}

export default command<Props>('init')
  .argument(input('name').description('Name of the project to initialize').string().required())
  .handle(async ({ name }) => {
    console.log(`Initializing new project '${name}'...`)

    const projectPath = path.resolve(process.cwd(), name)

    // Check if the directory exists
    if (fs.existsSync(projectPath)) {
      // Check if package.json exists and contains a bin property
      const packageJsonPath = path.join(projectPath, 'package.json')
      if (fs.existsSync(packageJsonPath)) {
        try {
          const packageJsonContent = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
          if (packageJsonContent.bin) {
            console.error(`Error: Project '${name}' is already initialized.`)
            process.exit(1)
          }
        } catch (error) {
          console.error('Error parsing package.json:', error)
          process.exit(1)
        }
      }
    } else {
      // Create the project directory
      fs.mkdirSync(projectPath, { recursive: true })
    }

    // Create package.json
    const packageJsonContent = {
      name: name,
      version: '1.0.0',
      description: '',
      main: 'dist/cli.js',
      bin: {
        [name.replace('-cli', '')]: 'bin/cli',
      },
      scripts: {
        start: 'bun build src/cli.ts --target=bun --outdir=dist --watch',
        build: 'rimraf dist; bun build src/cli.ts --target=bun --outdir=dist',
        link: `bun link [${name}]`,
        unlink: 'bun unlink',
      },
      dependencies: {
        clifer: '*',
      },
      devDependencies: {
        '@types/fs-extra': '^11.0.4',
        '@types/markdown-it': '^14.1.2',
        '@types/node': '^22.10.2',
        '@types/shelljs': '^0.8.15',
        rimraf: '^6.0.1',
      },
      keywords: ['cli', 'command-line', 'typescript'],
      author: '',
      license: 'MIT',
    }
    fs.writeFileSync(
      path.join(projectPath, 'package.json'),
      JSON.stringify(packageJsonContent, null, 2),
    )

    const tsconfigContent = {
      compilerOptions: {
        target: 'es2016',
        jsx: 'preserve',
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        module: 'commonjs',
        outDir: './dist',
        esModuleInterop: true,
        forceConsistentCasingInFileNames: true,
        strict: true,
        skipLibCheck: true,
      },
    }
    fs.writeFileSync(
      path.join(projectPath, 'tsconfig.json'),
      JSON.stringify(tsconfigContent, null, 2),
    )

    fs.writeFileSync(
      path.join(projectPath, '.gitignore'),
      ['node_modules', 'dist/', '.DS_Store'].join('\n'),
    )

    // Create bin/cli executable
    const binDirPath = path.join(projectPath, 'bin')
    fs.mkdirSync(binDirPath, { recursive: true })
    const cliExecutableContent = `#!/usr/bin/env bun\n\nconst { spawn } = await import('child_process')\nconst { resolve } = await import('path')\nconst os = await import('os')\n\nconst cli = resolve(__dirname, '..', 'dist', 'cli.js')\nconst args = process.argv.slice(2)\nconst bunPath = resolve(os.homedir(), '.bun', 'bin', 'bun')\n\nconst child = spawn(bunPath, [cli, ...args], {\n  detached: false,\n  stdio: 'inherit',\n  cwd: process.cwd(),\n})\n\nchild.on('exit', (code, signal) => {\n  process.exit(code)\n})\n`
    const cliExecutablePath = path.join(binDirPath, 'cli')
    fs.writeFileSync(cliExecutablePath, cliExecutableContent)
    fs.chmodSync(cliExecutablePath, 0o755)

    // Scaffold source directory and files
    const srcDirPath = path.join(projectPath, 'src')
    const commandsDirPath = path.join(srcDirPath, 'commands')
    fs.mkdirSync(commandsDirPath, { recursive: true })

    // Create src/cli.ts
    const cliTsContent = `#!/usr/bin/env bun
import { cli, runCli } from 'clifer'
import hello from './commands/hello'

const program = cli('ask').version('0.1').command(hello)

runCli(program).catch(e => console.error(e))
`
    fs.writeFileSync(path.join(srcDirPath, 'cli.ts'), cliTsContent)

    // Create src/commands/init.command.ts
    const initCommandTsContent = `
import { command, input } from 'clifer'

interface Props {
  name: string
}

export default command<Props>('hello')
  .argument(input('name').description('Name of the project to initialize').string().required())
  .handle(async ({ name }) => {
    console.log(\`Hello, ${name}\`)
    console.log('')
    console.log("Use 'npx clifer command add [name]' to add a new command")
  })
`
    fs.writeFileSync(path.join(commandsDirPath, 'hello.ts'), initCommandTsContent)

    // Run "bun install"
    console.log('Installing dependencies...')
    runCommand('bun install', { cwd: projectPath })

    // Run "bun run build"
    console.log('Building project...')
    runCommand('bun run build', { cwd: projectPath })

    // Run "bun run link"
    console.log('Linking project...')
    runCommand('bun link', { cwd: projectPath })

    console.log('✅ Project initialized successfully!')
    console.log('')
    console.log(`Use "${name.replace('-cli', '')}" command to run your CLI.`)
    console.log('')
  })

function runCommand(
  command: string,
  options?: { cwd?: string; stdio?: 'inherit' | 'pipe'; shell?: boolean },
) {
  const [cmd, ...args] = command.split(' ')
  const result = spawnSync(cmd, args, {
    ...(options ?? {}),
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })
  if (result.error) {
    throw new Error(`Error executing command: ${command} ${args.join(' ')}`)
  }
  return result.stdout?.toString() ?? ''
}
