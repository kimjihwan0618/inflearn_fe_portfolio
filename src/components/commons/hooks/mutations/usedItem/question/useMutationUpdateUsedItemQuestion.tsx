import { gql, useMutation } from '@apollo/client'
import { Modal } from 'antd'
import type {
  IMutation,
  IMutationUpdateUseditemQuestionArgs,
  IQueryFetchUseditemQuestionsArgs,
} from 'src/commons/types/generated/types'
import { FETCH_USED_ITEM_QUESTIONS } from '../../../quires/usedItem/question/useQueryFetchUsedItemQuestions'

export const UDATE_USED_ITEM_COMMENTS = gql`
  mutation updateUseditemQuestion(
    $useditemQuestionId: ID!
    $updateUseditemQuestionInput: UpdateUseditemQuestionInput!
  ) {
    updateUseditemQuestion(
      useditemQuestionId: $useditemQuestionId
      updateUseditemQuestionInput: $updateUseditemQuestionInput
    ) {
      _id
      contents
    }
  }
`

interface IUpdateUsedItemQuestionProps {
  useditemQuestionId: IMutationUpdateUseditemQuestionArgs['useditemQuestionId']
  contents: IMutationUpdateUseditemQuestionArgs['updateUseditemQuestionInput']['contents']
}

export const useMutationUpdateUsedItemQuestion = (
  useditemId: IQueryFetchUseditemQuestionsArgs['useditemId']
) => {
  const [updateUsedItemQuestionMutation] = useMutation<
    Pick<IMutation, 'updateUseditemQuestion'>,
    IMutationUpdateUseditemQuestionArgs
  >(UDATE_USED_ITEM_COMMENTS)

  const updateUsedItemQuestion = async (props: IUpdateUsedItemQuestionProps): Promise<void> => {
    try {
      const result = await updateUsedItemQuestionMutation({
        variables: {
          useditemQuestionId: props.useditemQuestionId,
          updateUseditemQuestionInput: {
            contents: props.contents,
          },
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS,
            variables: { useditemId },
          },
        ],
      })
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message })
    }
  }

  return { updateUsedItemQuestion }
}
