import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { accessTokenState, vistedPageState } from 'src/commons/stores'

const SKIP_PAGE_HISTORY = ['/login', '/signup']

interface IUseMoveToPageReturn {
  moveToPage: (path: string) => () => void
  moveToBack: (path: string) => () => void
  vistedPage: string
}

export const useMoveToPage = (): IUseMoveToPageReturn => {
  const router = useRouter()
  const [vistedPage, setVisitedPage] = useRecoilState(vistedPageState)
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)

  const moveToPage = (path: string) => () => {
    if (!SKIP_PAGE_HISTORY.includes(path)) {
      setVisitedPage(path)
    }
    void router.push(path)
  }

  const moveToBack = (path: string) => () => {
    if (!vistedPage) {
      setVisitedPage(path)
      void router.push(path)
    } else if (!accessToken) {
      window.history.go(-2)
    } else {
      window.history.go(-1)
    }
  }

  return {
    vistedPage,
    moveToPage,
    moveToBack,
  }
}
