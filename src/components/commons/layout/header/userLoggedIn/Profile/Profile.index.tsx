import * as S from 'src/components/commons/layout/header/Header.styles'
import Image from 'next/image'
import { useQueryFetchUserLoggedIn } from 'src/components/commons/hooks/quires/user/useQueryFetchUserLoggedIn'
import { useRouter } from 'next/router'
import { useMoveToPage } from 'src/components/commons/hooks/custom/useMoveToPage'
import { useMutationLogoutUser } from 'src/components/commons/hooks/mutations/user/useMutationLogout'
import { Modal } from 'antd'

export default function PorfileUI(props): JSX.Element {
  const router = useRouter()
  const { data } = useQueryFetchUserLoggedIn()
  const { moveToPage } = useMoveToPage()
  const { logoutUser } = useMutationLogoutUser()

  const onClickProfileButton = () => {
    props.setIsHidden((prev) => !prev)
  }

  const onClickLogout = async (): Promise<void> => {
    try {
      const result = await logoutUser()
      if (result?.data?.logoutUser) {
        router.reload()
      }
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message })
    }
  }

  return (
    <S.ProfileBoxWrapper>
      <S.ProfileButton ref={props.profileButtonRef} onClick={onClickProfileButton}>
        {data?.fetchUserLoggedIn?.picture ? (
          <Image
            src={`https://storage.googleapis.com/${data?.fetchUserLoggedIn?.picture}`}
            width={48}
            height={48}
            alt="프로필 이미지"
          />
        ) : (
          <Image src="/images/ic_profile2.png" width={48} height={48} alt="프로필 이미지" />
        )}
        <Image src="/images/ic_more.png" alt="아래방향 화살표" width={24} height={24} />
      </S.ProfileButton>
      <S.ProfileBox data-hidden={props.isHidden}>
        <S.ProfileInfo onClick={moveToPage('/mypage/market')}>
          <S.ImgSettingButton>
            {data?.fetchUserLoggedIn?.picture ? (
              <Image
                src={`https://storage.googleapis.com/${data?.fetchUserLoggedIn?.picture}`}
                width={40}
                height={40}
                alt="프로필 이미지"
              />
            ) : (
              <Image src="/images/ic_profile2.png" width={40} height={40} alt="프로필 이미지" />
            )}
          </S.ImgSettingButton>
          <S.TextWrapper>
            <S.Name>{data?.fetchUserLoggedIn.name}</S.Name>
            <S.Point>{data?.fetchUserLoggedIn.userPoint?.amount}P</S.Point>
          </S.TextWrapper>
        </S.ProfileInfo>
        <S.ProfileButtonWrapper>
          <S.AddPointButton>
            <Image src="/images/ic_savings.png" width={24} height={24} /> 충전하기
          </S.AddPointButton>
          <S.LogoutButton onClick={onClickLogout}>
            <Image src="/images/ic_logout.png" width={24} height={24} />
            로그아웃
          </S.LogoutButton>
        </S.ProfileButtonWrapper>
      </S.ProfileBox>
    </S.ProfileBoxWrapper>
  )
}