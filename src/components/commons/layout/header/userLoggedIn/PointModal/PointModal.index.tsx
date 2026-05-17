import { Modal } from 'antd'
import Image from 'next/image'
import type { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'
import * as S from './PointModal.styles'
import Button02 from 'src/components/commons/buttons/02/Button02.index'
import theme from 'src/commons/styles/theme'
import { useMutationCreatePointTransactionOfLoading } from 'src/components/commons/hooks/mutations/usedItem/useMutationCreatePointTransactionOfLoading'
import { useQueryFetchUserLoggedIn } from 'src/components/commons/hooks/quires/user/useQueryFetchUserLoggedIn'
import { useRouter } from 'next/router'

declare const window: typeof globalThis & {
  IMP: any
}

interface IPointModalUIProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function PointModalUI(props: IPointModalUIProps): JSX.Element {
  const router = useRouter()
  const [selectedPoint, setSelectedPoint] = useState('')
  const { createPointTransactionOfLoading, loading } = useMutationCreatePointTransactionOfLoading()
  const { data } = useQueryFetchUserLoggedIn()

  const onChangePoint = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPoint(event.target.value)
  }

  const onClickAddPoint = () => {
    const IMP = window.IMP
    const vistedPage = window.location.href
    IMP.init(process.env.NEXT_PUBLIC_PORTONE_API_KEY)
    IMP.request_pay(
      {
        pg: 'kakaopay',
        pay_method: 'card',
        merchant_uid: `payment-${new Date().getTime()}`, // 주문 고유 번호
        name: '테스트 결제입니다. 실제 돈이 나가지 않아요!',
        amount: selectedPoint,
        buyer_email: data.fetchUserLoggedIn.email,
        buyer_name: data.fetchUserLoggedIn.name,
        buyer_tel: '010-5838-5146',
        buyer_addr: '경기도 용인시 기흥구',
        buyer_postcode: '01181',
        m_redirect_url: vistedPage, // 모바일에서는 결제시, 페이지 주소가 바뀜. 따라서, 결제 끝나고 돌아갈 주소 입력해야함
      },
      async function (response: any) {
        const { success, imp_uid } = response
        if (success) {
          await createPointTransactionOfLoading(imp_uid)
          window.location.href = vistedPage
        } else if (!response?.error_msg.includes('결제포기')) {
          Modal.error({ content: '카카오페이 결제를 정상적으로 처리하지 못하였습니다.' })
        }
      }
    )
  }

  useEffect(() => {
    if (router.isReady) {
      const { imp_uid, imp_success } = router.query
      if (imp_success === 'true' && typeof imp_uid === 'string') {
        createPointTransactionOfLoading(imp_uid)
      }
    }
  }, [router.isReady, router.query])

  return (
    <>
      <script src="https://cdn.iamport.kr/v1/iamport.js"></script>
      <Modal
        open={props.isOpen}
        // onOk={onClickSellingOk}
        // okButtonProps={{ disabled: loading }}
        confirmLoading={loading}
        onCancel={() => props.setIsOpen(false)}
        footer={null}
      >
        <S.Content>
          <S.ContentInner>
            <Image unoptimized src={`/images/ic_point_add.png`} width={79.07} height={54} />
            <S.Title>충전하실 금액을 선택해주세요!</S.Title>
            <S.PointSelect onChange={onChangePoint}>
              <S.Point value={''}>포인트 선택</S.Point>
              <S.Point value={100}>100</S.Point>
              <S.Point value={500}>500</S.Point>
              <S.Point value={2000}>2,000</S.Point>
              <S.Point value={5000}>5,000</S.Point>
              <S.Point value={10000}>10,000</S.Point>
              <S.Point value={30000}>30,000</S.Point>
              <S.Point value={50000}>50,000</S.Point>
              <S.Point value={100000}>100,000</S.Point>
            </S.PointSelect>
            <S.Bottom>
              <Button02
                fullWidth={true}
                disabled={selectedPoint === ''}
                onClick={onClickAddPoint}
                background={theme.colors.main}
                name={'충전하기'}
              />
            </S.Bottom>
          </S.ContentInner>
        </S.Content>
      </Modal>
    </>
  )
}
