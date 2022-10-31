export interface ById<T> {
  [id: string]: T
}

export enum InputType {
  String = 'String',
  Number = 'Number',
  Boolean = 'Boolean',
}

export enum Kind {
  Command = 'Command',
  Input = 'Input',
}

export type InputValueType = string | number

export interface Input<T extends InputValueType> {
  kind: Kind.Input
  name: string
  description?: string
  type: InputType
  options?: Array<T>
  isRequired?: boolean
}

export interface Command<T> {
  kind: Kind.Command
  name: string
  description?: string
  version?: string
  arguments: Array<Command<any> | Input<InputValueType>>
  inputs: ById<Input<InputValueType>>
  handler?: (props: T) => void | Promise<any>
}

export function isCommand<T>(cmd: any): cmd is Command<T> {
  return cmd?.kind === Kind.Command
}

export function isInput<T extends InputValueType>(cmd: any): cmd is Input<T> {
  return cmd?.kind === Kind.Input
}
