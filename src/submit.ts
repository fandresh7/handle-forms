import { validations } from './helpers/validations'
import { Question, validationTypes } from './types'

const validateQuestion = (formData: FormData, question: Question) => {
  const entries = Object.entries(question.validations)

  return entries.every((entry) => {
    const type = entry[0] as validationTypes
    const validation = validations[type].validate(formData, question)
    return validation
  })
}

export const validateForm = (form: HTMLFormElement, questions: Question[]) => {
  const formData = new FormData(form)

  const questionsWithErrors = questions.map((question) => {
    const questionInput = form.querySelector(`[name="${question.name}"]`) as HTMLInputElement
    const questionWrapper = questionInput.closest('.div-wrapper')!

    const isShow = !questionWrapper.classList.contains('d-none')
    const validation = validateQuestion(formData, question)

    if (isShow && !validation) return question

    return null
  })

  return questionsWithErrors.filter((item) => item != null)
}

export const getValidationMessages = (questionsWithError: Question[]) => {
  const errors = {} as Record<string, string[]>

  questionsWithError.forEach((question) => {
    const messages: string[] = []

    const entries = Object.entries(question.validations)
    entries.forEach((entry) => {
      const type = entry[0] as validationTypes
      const message = validations[type].message(question)
      messages.push(message)
    })

    errors[question.name] = messages
  })

  return errors
}
