import { prompt as enquire } from 'enquirer'
import { capitalize, toCamelCase, toDashedName } from 'name-util'
import { InputOrBuilder, isInputBuilder } from './cli-input-builder'
import { InputType } from './cli-types'

function nonEmpty<T>(array: Array<T | undefined | null>): T[] {
  return array.filter(i => !!i) as any
}

export async function prompt(...inputOrBuilders: InputOrBuilder<any, any>[]) {
  const prompts = nonEmpty(
    inputOrBuilders.map(inputOrBuilder => {
      const input = isInputBuilder(inputOrBuilder) ? inputOrBuilder.toInput() : inputOrBuilder
      if (!input.shouldPrompt) return
      const isBoolean = input.type === InputType.Boolean
      const isNumber = input.type === InputType.Number
      const isMultiChoice = !!input.choices?.length
      return {
        type: isMultiChoice
          ? 'autocomplete'
          : isBoolean
          ? 'confirm'
          : isNumber
          ? 'numeral'
          : 'input',
        name: toCamelCase(input.name as string),
        message:
          input.promptMessage ?? capitalize(toDashedName(input.name as string).replace(/-/g, ' ')),
        ...(isMultiChoice ? { choices: [...(input.choices ?? [])].map(i => `${i}`) } : {}),
      }
    }),
  )
  return await enquire<any>(prompts)
}
