import { gql, useMutation } from '@apollo/client'
import { Modal } from 'antd'
import type {
  IUpdateBoardInput,
  IMutation,
  IMutationUpdateBoardArgs,
} from 'src/commons/types/generated/types'
import { IBoardWriterForm } from 'src/components/units/board/write/BoardWrite.schema'
import type { UseFormGetValues } from 'react-hook-form'
import { useMoveToPage } from 'src/components/commons/hooks/custom/useMoveToPage'
import { useRouter } from 'next/router'
import { FETCH_BOARD } from 'src/components/commons/hooks/quires/board/useQueryFetchBoard'
import { useMutationUploadFile } from '../file/useMutationUploadFile'

interface IUseMutationUpdateBoardProps {
  getValues: UseFormGetValues<IBoardWriterForm>
  files: File[]
  fileUrls: string[]
}

export const UPDATE_BOARD = gql`
  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $boardId: ID!, $password: String!) {
    updateBoard(updateBoardInput: $updateBoardInput, boardId: $boardId, password: $password) {
      _id
      title
      contents
      writer
    }
  }
`

export const useMutationUpdateBoard = (props: IUseMutationUpdateBoardProps) => {
  const router = useRouter()
  const { uploadFile } = useMutationUploadFile()
  const { moveToPage } = useMoveToPage()
  const [updateBoardMutation] = useMutation<
    Pick<IMutation, 'updateBoard'>,
    IMutationUpdateBoardArgs
  >(UPDATE_BOARD)

  const updateBoard = async (): Promise<void> => {
    const { addressDetail, password, title, contents, youtubeUrl, address, zipcode } =
      props.getValues()
    try {
      const imagesResult = await (
        await Promise.all(props.files.map((el) => el instanceof File && uploadFile({ file: el })))
      ).map((res) => res?.data?.uploadFile.url ?? '')
      const images = props.fileUrls.map((el, index) => {
        if (imagesResult[index]) {
          return imagesResult[index]
        } else {
          return el.replace('https://storage.googleapis.com/', '')
        }
      })
      const boardAddress = {
        address,
        addressDetail,
        zipcode,
      }
      const updateBoardInput: IUpdateBoardInput = {
        title,
        contents,
        images,
        youtubeUrl,
        boardAddress,
      }
      if (typeof router.query.boardId !== 'string') {
        Modal.error({ content: '시스템에 문제가 있습니다.' })
        return
      }
      const result = await updateBoardMutation({
        variables: {
          boardId: router.query.boardId,
          password: password,
          updateBoardInput,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD,
            variables: { boardId: router.query.boardId },
          },
        ],
      })
      if (result?.data?.updateBoard?._id) {
        Modal.success({ content: '게시글이 수정되었습니다.' })
        moveToPage(`/boards/${result?.data?.updateBoard?._id}`)()
      }
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message })
    }
  }

  return { updateBoard }
}
