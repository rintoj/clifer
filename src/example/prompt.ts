import { input } from '../cli-input-builder'
import { prompt } from '../cli-prompt'

async function run() {
  // yes/no confirmation
  const { overwrite } = await prompt(
    input('overwrite').description('Should overwrite?').prompt('Should overwrite?'),
  )
  console.log({ overwrite })

  // string prompt
  const { projectName } = await prompt(
    input('projectName')
      .description('Name of the project')
      .string()
      .prompt('What is the name of the project?'),
  )
  console.log({ projectName })

  // string prompt with auto complete
  const { environment } = await prompt(
    input('environment')
      .description('Environment')
      .string()
      .prompt('Enter environment')
      .choices(['local', 'dev', 'prod']),
  )
  console.log({ environment })

  // number prompt
  const { port } = await prompt(
    input('port').description('Server port').number().prompt('Enter port'),
  )
  console.log({ port })

  // number prompt with choices
  const { diskSize } = await prompt(
    input('diskSize')
      .description('Disk size to use the cloud')
      .number()
      .choices([10, 20, 50, 100])
      .prompt('Disk sizes (in GB)'),
  )
  console.log({ diskSize })

  // multiple inputs together
  const output = await prompt(
    input('firstName').description('First name').string().prompt(),
    input('lastName').description('Last name').string().prompt(),
    input('gender').description('Gender').string().choices(['Male', 'Female']).prompt(),
  )
  console.log(output)
}

run().catch(e => console.error(e))
