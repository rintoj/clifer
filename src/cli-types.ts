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

export type AllRequired<T> = { [K in keyof T]-?: T[K] }

export type InputName<T> = keyof AllRequired<T>

export interface Input<T, V extends InputValueType> {
  kind: Kind.Input
  name: InputName<T>
  description?: string
  type: InputType
  choices?: Array<V>
  isRequired?: boolean
  shouldPrompt?: boolean
  promptMessage?: string
}

export interface Command<T> {
  kind: Kind.Command
  name: string
  description?: string
  version?: string
  arguments: Array<Command<any> | Input<T, InputValueType>>
  inputs: ById<Input<any, InputValueType>>
  handler?: (props: T) => void | Promise<any>
}

export function isCommand<T>(cmd: any): cmd is Command<T> {
  return cmd?.kind === Kind.Command
}

export function isInput<T, V extends InputValueType>(cmd: any): cmd is Input<T, V> {
  return cmd?.kind === Kind.Input
}
