export enum InputType {
  TEXT = 'text',
  EMAIL = 'email',
  NUMBER = 'number',
  PASSWORD = 'password',
  TEXTAREA = 'textarea',
  SINGLE_CHECKBOX = 'single_checkbox',
  CHECKBOX = 'checkbox',
  FILE = 'file',
  RADIO = 'radio',
}

export enum validationTypes {
  REQUIRED = 'required',
  PATTERN = 'pattern',
  MIN = 'min',
  MAX = 'max',
  MIN_LENGTH = 'min_length',
  ACCEPT = 'accept',
}

export interface InputObject {
  create: (question: Question, option?: InputOption) => HTMLElement
  reset: (form: HTMLFormElement, name: string) => void
}

export interface ValidationObject {
  message: (question: Question) => string
  validate: (formData: FormData, question: Question) => Boolean
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
    checked?: boolean
    check: 'some' | 'every'
  }
}
