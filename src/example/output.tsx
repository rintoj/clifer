import React from 'react'
import {
  Card,
  CliExpectedError,
  ErrorBox,
  Heading,
  KeyValueTable,
  LabelValue,
  Message,
  RichTable,
  StatusBadge,
  cli,
  formatAsList,
  formatAsTable,
  input,
  printJson,
  printMarkdown,
  printText,
  printTextList,
  render,
  renderOnce,
  runCli,
} from '..'
import type { OutputFormat } from '../cli-types'

// Demonstrates: all output formats and Ink UI components added in this PR.

// --- Sample data ---

const services = [
  { name: 'api-gateway', status: 'active', instances: 3, port: 8080 },
  { name: 'auth-service', status: 'active', instances: 2, port: 4001 },
  { name: 'worker', status: 'inactive', instances: 0, port: 4002 },
  { name: 'scheduler', status: 'error', instances: 1, port: 4003 },
]

const deployInfo = {
  version: '2.4.1',
  environment: 'production',
  region: 'us-east-1',
  lastDeploy: '2024-03-15T10:30:00Z',
  status: 'active',
}

// --- Output format examples ---

function showPrintFunctions() {
  // printJson — structured JSON output
  console.log('\n--- printJson ---')
  printJson(deployInfo)

  // printText — key-value pairs, aligned
  console.log('\n--- printText ---')
  printText(deployInfo)

  // printTextList — tabular list
  console.log('\n--- printTextList ---')
  printTextList(services)

  // printTextList with selected fields
  console.log('\n--- printTextList (selected fields) ---')
  printTextList(services, ['name', 'status'])

  // printMarkdown — rendered markdown with tables
  console.log('\n--- printMarkdown ---')
  printMarkdown(`
# Deploy Summary

**Version**: \`2.4.1\`

| Service | Status | Instances |
| --- | --- | --- |
| api-gateway | active | 3 |
| auth-service | active | 2 |
| worker | inactive | 0 |
`)

  // formatAsTable — returns markdown table string
  console.log('\n--- formatAsTable ---')
  printMarkdown(formatAsTable(deployInfo))

  // formatAsList — returns markdown list table string
  console.log('\n--- formatAsList ---')
  printMarkdown(formatAsList(services, ['name', 'status', 'port']))
}

// --- Ink UI component examples ---

async function showUIComponents() {
  // Heading
  await renderOnce(<Heading>Service Dashboard</Heading>)

  // Message — success, error, info, warning
  await renderOnce(<Message type="success">Deployment completed successfully</Message>)
  await renderOnce(<Message type="error">Failed to connect to database</Message>)
  await renderOnce(<Message type="info">Checking service health...</Message>)
  await renderOnce(<Message type="warning">Memory usage above 80%</Message>)

  // StatusBadge — various states
  await renderOnce(<StatusBadge status="active" />)
  await renderOnce(<StatusBadge status="inactive" />)
  await renderOnce(<StatusBadge status="error" />)
  await renderOnce(<StatusBadge status="published" />)
  await renderOnce(<StatusBadge status="draft" />)

  // LabelValue — single key-value display
  await renderOnce(<LabelValue label="Environment" value="production" />)
  await renderOnce(<LabelValue label="Region" value="us-east-1" labelWidth={15} />)

  // KeyValueTable — bordered key-value table
  await renderOnce(<KeyValueTable title="Deploy Info" data={deployInfo} />)

  // Card — bordered content card
  await renderOnce(
    <Card title="Deployment Summary">
      <Message type="success">All services running</Message>
    </Card>,
  )

  // RichTable — full-featured data table with value extractors and conditional styling
  await renderOnce(
    <RichTable
      data={services}
      columns={[
        { key: 'name', header: 'Service', priority: 1, growable: true, value: s => s.name },
        {
          key: 'status',
          header: 'Status',
          priority: 1,
          value: s => s.status,
          color: s => (s.status === 'active' ? 'green' : s.status === 'error' ? 'red' : 'yellow'),
          bold: s => s.status === 'error',
        },
        { key: 'instances', header: 'Instances', priority: 2, value: s => String(s.instances) },
        { key: 'port', header: 'Port', priority: 3, value: s => String(s.port) },
      ]}
    />,
  )

  // RichTable with pagination footer
  await renderOnce(
    <RichTable
      data={services.slice(0, 2)}
      columns={[
        { key: 'name', header: 'Service', value: s => s.name },
        { key: 'status', header: 'Status', value: s => s.status },
      ]}
      pagination={{ total: 12, hasMore: true, limit: 2, offset: 0 }}
    />,
  )

  // ErrorBox — prominent error display
  await renderOnce(<ErrorBox message="Connection refused: database is unreachable at port 5432" />)
}

// --- render() dispatcher example ---

async function showRenderDispatcher(format: OutputFormat) {
  // render() automatically picks the right output based on --format flag
  await render(deployInfo, format, data => <KeyValueTable title="Deploy Info" data={data} />)
}

// --- CliExpectedError example ---

function showExpectedError() {
  // CliExpectedError shows a clean error message without a stack trace
  throw new CliExpectedError('Service "api-gateway" not found. Run `deploy list` to see services.')
}

// --- CLI that ties it all together ---

interface Props {
  demo: string
  format: OutputFormat
}

async function run(props: Props) {
  // If --format is passed without a demo, default to 'render'
  const demo = props.demo ?? (props.format ? 'render' : 'all')

  switch (demo) {
    case 'print':
      showPrintFunctions()
      break
    case 'ui':
      await showUIComponents()
      break
    case 'render':
      await showRenderDispatcher(props.format ?? 'rich')
      break
    case 'error':
      showExpectedError()
      break
    case 'all':
    default:
      showPrintFunctions()
      await showUIComponents()
  }
}

const program = cli<Props>('output-demo')
  .version('1.0')
  .argument(
    input('demo')
      .description('Which demo to run')
      .string()
      .choices(['print', 'ui', 'render', 'error', 'all']),
  )
  .option(
    input('format')
      .description('Output format for render demo')
      .string()
      .choices(['json', 'text', 'rich']),
  )
  .handle(run)

void runCli(program)
