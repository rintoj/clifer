import { input, prompt } from '..'

// Demonstrates all interactive prompt types: boolean, string, string with choices,
// number, number with choices, and multi-input prompts.

async function run() {
  // --- Boolean prompt (yes/no confirmation) ---
  const { overwrite } = await prompt(
    input('overwrite').description('Should overwrite existing files?').prompt('Overwrite existing?'),
  )
  console.log({ overwrite })

  // --- String prompt ---
  const { projectName } = await prompt(
    input('projectName')
      .description('Name of the project')
      .string()
      .prompt('What is the project name?'),
  )
  console.log({ projectName })

  // --- String prompt with autocomplete choices ---
  const { environment } = await prompt(
    input('environment')
      .description('Deployment environment')
      .string()
      .choices(['local', 'dev', 'staging', 'prod'])
      .prompt('Select environment'),
  )
  console.log({ environment })

  // --- Number prompt ---
  const { port } = await prompt(
    input('port').description('Server port number').number().prompt('Enter port number'),
  )
  console.log({ port })

  // --- Number prompt with choices ---
  const { diskSize } = await prompt(
    input('diskSize')
      .description('Disk size for cloud instance')
      .number()
      .choices([10, 20, 50, 100])
      .prompt('Select disk size (GB)'),
  )
  console.log({ diskSize })

  // --- Multiple prompts at once ---
  const config = await prompt(
    input('firstName').description('First name').string().prompt(),
    input('lastName').description('Last name').string().prompt(),
    input('role').description('Role').string().choices(['admin', 'editor', 'viewer']).prompt(),
    input('age').description('Age').number().prompt(),
    input('newsletter').description('Subscribe to newsletter?').prompt('Subscribe?'),
  )
  console.log(config)
}

run().catch(e => console.error(e))
