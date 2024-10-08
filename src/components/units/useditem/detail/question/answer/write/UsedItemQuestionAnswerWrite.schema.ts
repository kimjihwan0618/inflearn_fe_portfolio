import * as yup from 'yup'

export const schema = yup
  .object({
    contents: yup.string().required('내용을 입력해주세요.'),
  })
  .required()

export interface IUsedItemQuestionWriteForm {
  contents?: string
}
