import { command } from '../cli-command-builder'

export default command('init').handle(async () => {
  console.log('Initializing the project...')
  // Here you can add the logic to initialize your project, like creating config files, etc.
  // For example:
  // await createConfigFile();
  console.log('Project initialized successfully!')
})
