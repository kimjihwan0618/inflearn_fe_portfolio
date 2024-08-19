import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from '@apollo/client'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { accessTokenState } from 'src/commons/stores'

const GLOBAL_STATE = new InMemoryCache()

interface IApolloSettingProps {
  children: JSX.Element
}

export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  const uploadLink = createUploadLink({
    uri: 'https://backendonline.codebootcamp.co.kr/graphql',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: GLOBAL_STATE, // 컴퓨터의 메모리에다가 백엔드에서 받아온 데이터 임시로 저장해 놓기 => 나중에 더 자세히 알아보기
  })

  useEffect(() => {
    const result = localStorage.getItem('accessToken')
    setAccessToken(result ?? '')
  }, [])

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
