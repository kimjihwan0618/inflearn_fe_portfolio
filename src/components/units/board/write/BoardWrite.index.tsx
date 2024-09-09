import * as S from './BoardWrite.styles'
import uuid4 from 'uuid4'
import Uploads01 from 'src/components/commons/uploads/01/Upload01.index'
import Button01 from 'src/components/commons/buttons/01/Button01.index'
import theme from 'src/commons/styles/theme'
import { useForm } from 'react-hook-form'
import { IBoardWriterForm, schema } from './BoardWrite.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useImageInput } from 'src/components/commons/hooks/custom/useImageInput'
import { useMutationCreateBoard } from 'src/components/commons/hooks/mutations/board/useMutationCreateBoard'
import { useMutationUpdateBoard } from 'src/components/commons/hooks/mutations/board/useMutationUpdateBoard'
import { useRouter } from 'next/router'
import { useUpdateForm } from 'src/components/commons/hooks/custom/useUpdateForm'
import { useDaumPostModal } from 'src/components/commons/hooks/custom/useDaumPostModal'
import { IQuery } from 'src/commons/types/generated/types'
import InputWithError from 'src/components/commons/inputs/02/InputWithError.index'
import TextAreaWithError from 'src/components/commons/textareas/01/TextAreaWithError.index'
import { useMoveToPage } from 'src/components/commons/hooks/custom/useMoveToPage'

export interface IBoardWriteUIProps {
  isEdit: boolean
  data?: Pick<IQuery, 'fetchBoard'>
}

export default function BoardWriteUI(props: IBoardWriteUIProps): JSX.Element {
  const router = useRouter()
  const {
    handleModalToggle,
    DaumPostModal,
    postModalOpen,
    address,
    zonecode,
    setAddress,
    setZoneCode,
  } = useDaumPostModal()
  const { moveToBack } = useMoveToPage()
  const { fileUrls, onChangeFileUrls, onClickReset, setFileUrls } = useImageInput(3)
  const { register, formState, setValue, getValues } = useForm<IBoardWriterForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })
  const { createBoard } = useMutationCreateBoard({ getValues, fileUrls })
  const { updateBoard } = useMutationUpdateBoard({ getValues, fileUrls })
  const { handleFormUpdate } = useUpdateForm({
    setValue,
    updateKeys: ['writer', 'title', 'contents', 'boardAddress.addressDetail', 'youtubeUrl'],
    fetchData: props.data?.fetchBoard,
  })

  useEffect(() => {
    setValue('zipcode', zonecode)
    setValue('address', address)
  }, [address, zonecode])

  useEffect(() => {
    const fetchBoard = props.data?.fetchBoard
    if (fetchBoard) {
      handleFormUpdate()
    }
    if (fetchBoard?.images?.length > 0) {
      const images = fetchBoard.images
      const filledImages: string[] = [images[0] || '', images[1] || '', images[2] || '']
      setFileUrls(filledImages)
    }
    const fetchAddress = fetchBoard?.boardAddress?.address
    const fetchZipCode = fetchBoard?.boardAddress?.zipcode
    fetchAddress && setAddress(fetchAddress)
    fetchZipCode && setZoneCode(fetchZipCode)
  }, [props.data?.fetchBoard])

  return (
    <>
      {postModalOpen && <DaumPostModal />}
      <S.ContentWrapper>
        <S.ContentTitle>게시물 {props.isEdit ? '수정' : '등록'}</S.ContentTitle>
        <S.FormWrapper>
          <InputWithError
            width="48.78%"
            register={register('writer')}
            disabled={!!props.data?.fetchBoard.writer}
            readOnly={!!props.data?.fetchBoard.writer}
            placeholder="이름을 적어주세요."
            label={'작성자'}
            error={formState.errors.writer?.message}
          />
          <InputWithError
            width="48.78%"
            type="password"
            register={register('password')}
            placeholder="비밀번호를 입력해주세요."
            label={'비밀번호'}
            error={formState.errors.password?.message}
          />
          <InputWithError
            register={register('title')}
            placeholder="제목을 작성해주세요."
            label={'제목'}
            error={formState.errors.title?.message}
          />
          <TextAreaWithError
            label="내용"
            register={register('contents')}
            placeholder="내용을 작성해주세요"
            height="480px"
            error={formState.errors.contents?.message}
          />
          <S.PostAddressWrapper>
            <InputWithError
              register={register('zipcode')}
              placeholder="우편번호"
              width="100px"
              readOnly
              label={'주소'}
            />
            <Button01
              onClick={handleModalToggle}
              name={'우편번호 검색'}
              color="white"
              background={theme.colors.dark01}
            />
            <InputWithError register={register('address')} readOnly />
            <InputWithError
              register={register('addressDetail')}
              readOnly={zonecode === null ? true : false}
              placeholder="상세주소를 입력해주세요."
            />
          </S.PostAddressWrapper>
          <InputWithError
            label={'유튜브'}
            register={register('youtubeUrl')}
            placeholder="유튜브 링크를 입력해주세요"
            error={formState.errors.youtubeUrl?.message}
          />
          <S.FormItem style={{ width: '100%' }}>
            <S.ItemTitle>사진 첨부</S.ItemTitle>
            <S.ImagesWrapper>
              {fileUrls.map((el, index) => (
                <Uploads01
                  key={uuid4()}
                  index={index}
                  fileUrl={el}
                  onChangeFileUrls={onChangeFileUrls}
                  onClickReset={onClickReset}
                />
              ))}
            </S.ImagesWrapper>
          </S.FormItem>
          {/* <S.FormItem style={{ width: '100%' }}>
            <S.ItemTitle>메인 설정</S.ItemTitle>
            <S.RadioItem>
              <input id="youtube" type="radio" value={'유튜브'} name="main-set"></input>
              <label htmlFor="youtube">유튜브</label>
              <input id="photo" type="radio" value={'사진'} name="main-set"></input>
              <label htmlFor="photo">사진</label>
            </S.RadioItem>
          </S.FormItem> */}
        </S.FormWrapper>
        <S.ButtonWrapper>
          <Button01
            onClick={moveToBack(`/boards/${router.query.boardId}`)}
            background={theme.colors.gray04}
            name={'취소하기'}
            width="03"
          />
          <Button01
            disabled={!formState.isValid}
            onClick={props.isEdit ? updateBoard : createBoard}
            background={theme.colors.main}
            name={`${props.isEdit ? '수정' : '등록'}하기`}
            width="03"
          />
        </S.ButtonWrapper>
      </S.ContentWrapper>
    </>
  )
}