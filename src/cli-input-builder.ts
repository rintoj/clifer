import { toDashedName } from 'name-util'
import { AllRequired, Input, InputName, InputType, InputValueType, Kind } from './cli-types'

export type InputBuilderType<T, V extends InputValueType> =
  | BaseInputBuilder<T, V>
  | NonBooleanInputBuilder<T, V>
  | InputBuilder<T, V>

export type InputOrBuilder<T, V extends InputValueType> = Input<T, V> | InputBuilderType<T, V>

export function isInputBuilder<T, V extends InputValueType>(
  inputOrBuilder: InputOrBuilder<T, V>,
): inputOrBuilder is InputBuilderType<T, V> {
  return inputOrBuilder instanceof BaseInputBuilder
}

class BaseInputBuilder<T, V extends InputValueType> {
  protected input: Input<T, V>

  constructor(name: InputName<T>) {
    this.input = {
      kind: Kind.Input,
      name: toDashedName(name as any) as any,
      type: InputType.Boolean,
    }
  }

  description(description: string) {
    this.input.description = description
    return this
  }

  default(defaultValue: V) {
    this.input.default = defaultValue
    return this
  }

  prompt(message?: string) {
    this.input.shouldPrompt = true
    this.input.promptMessage = message
    return this
  }

  toInput() {
    return this.input
  }
}

class NonBooleanInputBuilder<T, V extends InputValueType> extends BaseInputBuilder<T, V> {
  constructor(input: Input<T, V>) {
    super(input.name)
    this.input = input
  }

  required(isRequired = true): NonBooleanInputBuilder<AllRequired<T>, V> {
    this.input.isRequired = isRequired
    return this
  }

  choices(values: Array<V>) {
    this.input.choices = values
    return this
  }
}

export class InputBuilder<T, V extends InputValueType> extends BaseInputBuilder<T, V> {
  constructor(name: InputName<T>) {
    super(name)
  }

  string() {
    return new NonBooleanInputBuilder<T, string>({
      ...this.input,
      type: InputType.String,
    } as any)
  }

  number() {
    return new NonBooleanInputBuilder<T, number>({
      ...this.input,
      type: InputType.Number,
    } as any)
  }
}

export function input<T, V extends InputValueType>(name: InputName<T>) {
  return new InputBuilder<Partial<T>, V>(name)
}
