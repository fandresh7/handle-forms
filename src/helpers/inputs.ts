import { InputObject, InputOption, InputType, Question } from '../types'

const getInputHtml = ({ name, type, placeholder, multiple }: Question) => {
  const input = document.createElement('input')

  type = type === InputType.SINGLE_CHECKBOX ? InputType.CHECKBOX : type

  input.setAttribute('type', type)
  input.setAttribute('name', name)
  input.setAttribute('id', name)

  if (placeholder != null) {
    input.setAttribute('placeholder', placeholder)
  }

  if (multiple != null && multiple) {
    input.multiple = true
  }

  return input
}

const getOptionInputHtml = ({ type, name }: Question, { value }: InputOption) => {
  const input = document.createElement('input')

  input.setAttribute('type', type)
  input.setAttribute('name', name)
  input.setAttribute('value', value)
  input.setAttribute('id', value)

  return input
}

export const getLabelHtml = (name: string, label: string) => {
  const labelElement = document.createElement('label')
  labelElement.setAttribute('for', name)

  if (label != null) {
    labelElement.textContent = label
  }

  return labelElement
}

export const inputs: Record<InputType, InputObject> = {
  [InputType.TEXT]: {
    create: (question) => getInputHtml(question),
    reset: (form, name) => {
      const input = form.querySelector(`[name="${name}"]`) as HTMLInputElement
      input.value = ''
    },
  },
  [InputType.NUMBER]: {
    create: (question) => getInputHtml(question),
    reset: (form, name) => {
      const input = form.querySelector(`[name="${name}"]`) as HTMLInputElement
      input.value = ''
    },
  },
  [InputType.FILE]: {
    create: (question) => getInputHtml(question),
    reset: (form, name) => {
      const input = form.querySelector(`[name="${name}"]`) as HTMLInputElement
      input.value = ''
    },
  },
  [InputType.RADIO]: {
    create: (question, option = { label: '', value: '' }) => getOptionInputHtml(question, option),
    reset: (form, name) => {
      const inputs = form.querySelectorAll(`[name="${name}"]`)
      inputs.forEach((input) => {
        ;(input as HTMLInputElement).checked = false
      })
    },
  },
  [InputType.SINGLE_CHECKBOX]: {
    create: (question) => getInputHtml(question),
    reset: (form, name) => {
      const input = form.querySelector(`[name="${name}"]`) as HTMLInputElement
      input.checked = false
    },
  },
  [InputType.CHECKBOX]: {
    create: (question, option = { label: '', value: '' }) => getOptionInputHtml(question, option),
    reset: (form, name) => {
      const inputs = form.querySelectorAll(`[name="${name}"]`)
      inputs.forEach((input) => {
        ;(input as HTMLInputElement).checked = false
      })
    },
  },
  [InputType.TEXTAREA]: {
    create: (question: Question) => getInputHtml(question),
    reset: (form, name) => {
      const input = form.querySelector(`[name="${name}"]`) as HTMLTextAreaElement
      input.value = ''
    },
  },
  [InputType.PASSWORD]: {
    create: (question: Question) => getInputHtml(question),
    reset: (form, name) => {
      const input = form.querySelector(`[name="${name}"]`) as HTMLInputElement
      input.value = ''
    },
  },
  [InputType.EMAIL]: {
    create: (question: Question) => getInputHtml(question),
    reset: (form, name) => {
      const input = form.querySelector(`[name="${name}"]`) as HTMLInputElement
      input.value = ''
    },
  },
}
