import { Input, InputType, InputValueType, Kind } from './cli-types'

export type InputBuilderType<T extends InputValueType> =
  | BaseInputBuilder<T>
  | NonBooleanInputBuilder<T>
  | InputBuilder<T>

export type InputOrBuilder<T extends InputValueType> = Input<T> | InputBuilderType<T>

export function isInputBuilder<T extends InputValueType>(
  inputOrBuilder: InputOrBuilder<T>,
): inputOrBuilder is InputBuilderType<T> {
  return inputOrBuilder instanceof BaseInputBuilder
}

class BaseInputBuilder<T extends InputValueType> {
  protected input: Input<T>

  constructor(name: string) {
    this.input = {
      kind: Kind.Input,
      name,
      type: InputType.Boolean,
    }
  }

  description(description: string) {
    this.input.description = description
    return this
  }

  toInput() {
    return this.input
  }
}

class NonBooleanInputBuilder<T extends InputValueType> extends BaseInputBuilder<T> {
  constructor(input: Input<T>) {
    super(input.name)
    this.input = input
  }

  required(isRequired = true) {
    this.input.isRequired = isRequired
    return this
  }

  options(values: Array<T>) {
    this.input.options = values
    return this
  }
}

export class InputBuilder<T extends InputValueType> extends BaseInputBuilder<T> {
  constructor(name: string) {
    super(name)
  }

  string() {
    return new NonBooleanInputBuilder<string>({
      ...this.input,
      type: InputType.String,
      options: [],
    })
  }

  number() {
    return new NonBooleanInputBuilder<number>({
      ...this.input,
      type: InputType.Number,
      options: [],
    })
  }
}

export function input(name: string) {
  return new InputBuilder(name)
}
