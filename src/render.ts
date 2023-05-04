import { getLabelHtml, inputs } from './helpers/inputs'
import { Question } from './types'

const getIsInside = (name: string, questions: Question[]) => {
  const isInsideQuestion = questions.some((q) => q.inside === name)

  const questionsWithOptions = questions.filter((q) => q.options != null)
  const questionsOptions = questionsWithOptions.map((q) => q.options).flat()
  const optionsWithInsideProperty = questionsOptions.filter((opt) => opt?.inside != null)
  const isInsideOption = optionsWithInsideProperty.some((opt) => opt?.inside === name)

  return isInsideQuestion || isInsideOption
}

const getOptionsHtml = (question: Question, questions: Question[]) => {
  const { type, options } = question

  const optionsElements = options?.map((option) => {
    const container = document.createElement('div')

    const optionElement = inputs[type].create(question, option)
    container.appendChild(optionElement)

    if (option.label != null) {
      const labelElement = getLabelHtml(optionElement.id, option.label)
      container.appendChild(labelElement)
    }

    if (option.inside != null) {
      const subQuestion = questions.find((q) => q.name === option.inside)
      if (subQuestion != null) {
        const subQuestionHtml = getQuestionHtml(subQuestion, questions)
        container.appendChild(subQuestionHtml)
      }
    }

    return container
  })

  return optionsElements
}

const getQuestionHtml = (question: Question, questions: Question[]): HTMLElement => {
  const { label, name, type, options, show } = question

  const wrapper = document.createElement('div')
  wrapper.classList.add('div-wrapper')

  if (show != null) wrapper.classList.add('d-none')

  if (label != null) {
    const labelElement = getLabelHtml(name, label)
    wrapper.appendChild(labelElement)
  }

  if (options != null) {
    const optionsElements = getOptionsHtml(question, questions)!
    optionsElements.forEach((optionElement) => wrapper.appendChild(optionElement))
  } else {
    const inputElement = inputs[type].create(question)
    wrapper.appendChild(inputElement)
  }

  return wrapper
}

export const renderForm = (form: HTMLFormElement, questions: Question[]) => {
  questions.forEach((question) => {
    const isInside = getIsInside(question.name, questions)

    if (!isInside) {
      const questionElement = getQuestionHtml(question, questions)
      form.appendChild(questionElement)
    }
  })

  const button = document.createElement('button')
  button.setAttribute('type', 'submit')
  button.textContent = 'Submit'
  form.appendChild(button)
}
