import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from '@apollo/client'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

interface IApolloSettingProps {
  children: JSX.Element
}

export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
  const uploadLink = createUploadLink({
    uri: 'https://backendonline.codebootcamp.co.kr/graphql',
  })

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache(), // 컴퓨터의 메모리에다가 백엔드에서 받아온 데이터 임시로 저장해 놓기 => 나중에 더 자세히 알아보기
  })
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
