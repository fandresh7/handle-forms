import { inputs } from './helpers/inputs'
import { InputType, Question } from './types'

export const handleChanges = (event: Event, questions: Question[], form: HTMLFormElement) => {
  const input = event.target as HTMLInputElement

  const checkQuestions = (input: HTMLInputElement) => {
    const formData = new FormData(form)
    const inputValues = formData.getAll(input.name)

    const questionsToValidate = questions.filter((question) => {
      return question.show != null && question.show.name === input.name
    })

    questionsToValidate.forEach((question) => {
      checkQuestion(input, inputValues, question)
    })
  }

  const checkQuestion = (input: HTMLInputElement, inputValues: FormDataEntryValue[], question: Question) => {
    let validation = null

    if (input.type === 'file' && input.files != null) {
      validation = input.files.length > 0
    } else if (question?.show?.checked != null) {
      const isChecked = input.checked
      validation = isChecked === question.show.checked
    } else if (question?.show?.values != null) {
      validation = question.show.check === 'every' ? question.show.values.every((value) => inputValues.includes(value)) : question.show.values.some((value) => inputValues.includes(value))
    }

    validation != null && showHideQuestion(question.name, question.type, validation)
  }

  const showHideQuestion = (name: string, type: InputType, validation: boolean) => {
    const inputElement = form.querySelector(`[name="${name}"]`) as HTMLInputElement
    if (inputElement == null) return

    const parent = inputElement.closest('.div-wrapper')

    if (validation) {
      parent?.classList.remove('d-none')
    } else {
      parent?.classList.add('d-none')
      inputs[type].reset(form, inputElement.name)
    }

    checkQuestions(inputElement)
  }

  checkQuestions(input)
}
