import { gql, useMutation } from '@apollo/client'
import { Modal } from 'antd'
import type {
  IMutation,
  IMutationCreatePointTransactionOfBuyingAndSellingArgs,
} from 'src/commons/types/generated/types'
import { useRouter } from 'next/router'
import { FETCH_USED_ITEM } from '../../quires/usedItem/useQueryFetchUsedItem'

export const CREATE_POINT_TRANSACTION_BUY_SELLING = gql`
  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {
    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {
      _id
    }
  }
`

export const useMutationCreatePointTransactionOfBuyingAndSelling = () => {
  const router = useRouter()
  const [createPointTransactionBuySellingMutation, { loading }] = useMutation<
    Pick<IMutation, 'createPointTransactionOfBuyingAndSelling'>,
    IMutationCreatePointTransactionOfBuyingAndSellingArgs
  >(CREATE_POINT_TRANSACTION_BUY_SELLING)

  const createPointTransactionBuySelling = async (): Promise<void> => {
    if (typeof router.query.useditemId !== 'string') {
      Modal.error({ content: '시스템에 문제가 있습니다.' })
      return
    }
    try {
      const result = await createPointTransactionBuySellingMutation({
        variables: {
          useritemId: router.query.useditemId,
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM,
            variables: { useditemId: router.query.useditemId },
          },
        ],
      })
      Modal.success({ content: '해당제품 구입이 완료되었습니다.' })
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message })
    }
  }

  return { createPointTransactionBuySelling, loading }
}