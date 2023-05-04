export enum InputType {
  TEXT = 'text',
  EMAIL = 'email',
  NUMBER = 'number',
  PASSWORD = 'password',
  TEXTAREA = 'textarea',
  SINGLE_CHECKBOX = 'checkbox',
  CHECKBOX = 'checkbox',
  FILE = 'file',
  RADIO = 'radio',
}

export interface InputObject {
  create: (question: Question, option?: InputOption) => HTMLElement
  reset: (form: HTMLFormElement, name: string) => void
}

export interface InputOption {
  label: string
  value: string
  inside?: string
}

export interface Question {
  label?: string
  name: string
  type: InputType
  placeholder?: string
  multiple?: boolean
  options?: InputOption[]
  inside?: string
  validations: {
    required: boolean
    pattern?: RegExp
    min?: number
    max?: number
    min_length?: number
    accept?: string[]
  }
  show?: {
    name: string
    values: string[]
    check: 'some' | 'every'
  }
}
