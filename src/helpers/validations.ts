import { Question, validationTypes } from '../types'

export const validations = {
  [validationTypes.REQUIRED]: {
    message: (question: Question) => `The field ${question.label} is required.`,
    validate: (formData: FormData, question: Question) => {
      const answer = formData.get(question.name)
      if (!question.validations.required) return true
      return !(answer instanceof File && answer.name === '') && !(typeof answer === 'string' && answer.trim() === '') && !(answer == null)
    },
  },
  [validationTypes.PATTERN]: {
    message: (question: Question) => `The field ${question.label} must be an email.`,
    validate: (formData: FormData, question: Question) => {
      const answer = formData.get(question.name) as string
      if (question.validations.pattern == null) return true
      return question.validations.pattern.test(answer)
    },
  },
  [validationTypes.MIN]: {
    message: (question: Question) => `The value for field ${question.label} must be greater than ${question.validations.min}.`,
    validate: (formData: FormData, question: Question) => {
      const answer = Number(formData.get(question.name)) as number
      if (question.validations.min == null) return true
      return answer >= question.validations.min
    },
  },
  [validationTypes.MAX]: {
    message: (question: Question) => `The value for field ${question.label} must be less than ${question.validations.max}.`,
    validate: (formData: FormData, question: Question) => {
      const answer = Number(formData.get(question.name)) as number
      if (question.validations.max == null) return true
      return answer <= question.validations.max
    },
  },
  [validationTypes.MIN_LENGTH]: {
    message: (question: Question) => `The value for field ${question.label} must be at least ${question.validations.min_length} characters long.`,
    validate: (formData: FormData, question: Question) => {
      const answer = formData.get(question.name) as string
      if (question.validations.min_length == null) return true
      return answer.length >= question.validations.min_length
    },
  },
  [validationTypes.ACCEPT]: {
    message: (question: Question) => `the field ${question.label} must be one of the following types: ${question.validations.accept?.join(', ')}.`,
    validate: (formData: FormData, question: Question) => {
      const answer = formData.getAll(question.name) as File[]
      if (question.validations.accept == null) return true
      return answer.every((file: File) => {
        const accept = file.name.split('.').reverse()[0].toLowerCase()
        return question.validations.accept?.includes(accept)
      })
    },
  },
}
