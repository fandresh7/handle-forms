# Handle Forms

Handle Forms is a JavaScript library designed to simplify the process of handling forms. With this library, you can easily show or hide questions based on the answer of preview questions and validate each form field.

## Question Structure

The structure of a question in Handle Forms is defined by the following TypeScript interface:

```ts
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
```

## Properties

- `label`: (optional): A string that represents the label of the question.
- `name`: A string that represents the name of the question.
- `type`: The supported types are text, email, password, number, textarea, radio, file and checkbox.
- `placeholder` (optional): A string that represents the placeholder of the question.
- `multiple` (optional): A boolean that indicates whether the question is a multiple-choice question or not.
- `options` (optional): An array of InputOption objects that represent the options of a multiple-choice question.
- `inside` (optional): A string that represents the name of the question that the current question is inside of. This is used to group questions together.
- `validations`: An object that represents the validations of the question. It has the following properties:
  - `required`: A boolean that indicates whether the question is required or not.
  - `pattern` (optional): A regular expression that represents the pattern that the question's value should match.
  - `min` (optional): A number that represents the minimum value that the question's value can be.
  - `max` (optional): A number that represents the maximum value that the question's value can be.
  - `min_length` (optional): A number that represents the minimum length that the question's value can be.
  - `accept` (optional): An array of strings that represent the types of files that the question can accept. This is only applicable to file input questions.
- `show` (optional): An object that indicates whether the question should be shown or hidden based on the answer of another question. It has the following properties:
  - `name`: A string that represents the name of the question that the current question is dependent on.
  - `values`: An array of strings that represent the values of the dependent question that should cause the current question to be shown.
  - `checked` (optional): A boolean that indicates whether the dependent question should be checked or unchecked to show the current question. If this is not provided, the current question will be shown if the dependent question is checked.
  - `check`: An enumerated value of type 'some' | 'every' that indicates whether the current question should be shown if some or every value of the dependent question matches the values array.

## Render Form Questions

Each question is wrapped by a `div` element with the class `div-wrapper`.

```html
<div class="div-wrapper">
  <label for="name">Name</label>
  <input type="text" name="name" id="name" />
</div>
```

The question structure is defined as a JavaScript object:

```js
{
  label: 'Name',
  name: 'name',
  type: 'text',
  validations: {
    required: true
  }
}
```

If there are nested questions, the HTML structure would look like this:

```html
<div class="div-wrapper">
  <label for="gender">Gender</label>
  <div>
    <input type="radio" name="gender" value="gender_other" id="gender_other" />
    <label for="gender_other">Other</label>
    <!-- Nested question -->
    <div class="div-wrapper">
      <input type="text" name="other_gender" id="other_gender" placeholder="Enter other options here" />
    </div>
  </div>
  <div>
    <input type="radio" name="gender" value="male" id="male" />
    <label for="male">Other</label>
  </div>
  <div>
    <input type="radio" name="gender" value="female" id="female" />
    <label for="female">Other</label>
  </div>
</div>
```

The question structure is defined as an array of JavaScript objects:

```js
{
  label: 'Gender',
  name: 'gender',
  type: 'radio',
  options: [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'gender_other', inside: 'other_gender' },
  ],
  validations: {
    required: true
  }
},
{
  name: 'other_gender',
  type: 'text',
  placeholder: 'Enter other options here',
  show: {
    name: 'gender',
    values: ['gender_other'],
    check: 'every'
  },
  validations: {
    required: true
  }
},
```

After define the questions array, you can render them using `renderForm` function:

```js
const form = document.querySelector('#form')
renderForm(form, questions)
```

To check for show/hide questions, you can use `handleChanges` function:

```js
form.addEventListener('change', (event) => {
  handleChanges(event, questions, form)
})
```

To validate and get error messages for each question, you can use `validateForm` and `getValidationMessages` functions:

```js
form.addEventListener('submit', (event) => {
  event.preventDefault()
  const validations = validateForm(form, questions)
  const messages = getValidationMessages(form, validations)
})
```

if you are using a CDN, you must include `handleForm` before each function:

```js
const form = document.querySelector('#form')
handleForms.renderForm(form, questions)

form.addEventListener('change', (event) => {
  handleForms.handleChanges(event, questions, form)
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const validations = handleForms.validateForm(form, questions)
  const messages = handleForms.getValidationMessages(form, validations)
})
```

You can find a complete example in: https://t.ly/CxIvT
