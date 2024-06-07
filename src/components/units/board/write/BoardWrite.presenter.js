import * as S from './BoardWrite.styles';

export default function BoardWriteUI({
  writer,
  password,
  title,
  contents,
  setWriter,
  setPassword,
  setTitle,
  setContents,
  writerError,
  setWriterError,
  passwordError,
  setPasswordError,
  setContentsError,
  titleError,
  setTitleError,
  contentsError,
  handleInputChange,
  handleSumbit,
  formValidation,
}) {
  return (
    <S.ContentWrapper>
      <S.ContentTitle>게시물 등록</S.ContentTitle>
      <S.FormWrapper>
        <S.FormItem style={{ width: '48.78%' }}>
          <S.ItemTitle>작성자</S.ItemTitle>
          <S.ItemInput
            value={writer}
            onChange={(e) => {
              handleInputChange(e, setWriter, setWriterError, '작성자를 입력해주세요');
            }}
            type="text"
            placeholder="이름을 적어주세요."
          />
          <S.FormItemError>{writerError}</S.FormItemError>
        </S.FormItem>
        <S.FormItem style={{ width: '48.78%' }}>
          <S.ItemTitle>비밀번호</S.ItemTitle>
          <S.ItemInput
            value={password}
            onChange={(e) => {
              handleInputChange(e, setPassword, setPasswordError, '비밀번호를 입력해주세요');
            }}
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
          <S.FormItemError>{passwordError}</S.FormItemError>
        </S.FormItem>
        <S.FormItem style={{ width: '100%' }}>
          <S.ItemTitle>제목</S.ItemTitle>
          <S.ItemInput
            value={title}
            onChange={(e) => {
              handleInputChange(e, setTitle, setTitleError, '제목을 입력해주세요');
            }}
            type="text"
            placeholder="제목을 작성해주세요."
          />
          <S.FormItemError>{titleError}</S.FormItemError>
        </S.FormItem>
        <S.FormItem style={{ width: '100%' }}>
          <S.ItemTitle>내용</S.ItemTitle>
          <S.ItemTextArea
            value={contents}
            onChange={(e) => {
              handleInputChange(e, setContents, setContentsError, '내용을 입력해주세요');
            }}
            type="text"
            placeholder="내용을 작성해주세요."
          />
          <S.FormItemError>{contentsError}</S.FormItemError>
        </S.FormItem>
        <S.PostSearchItem>
          <S.FormItem style={{ width: '78px' }}>
            <S.ItemTitle>주소</S.ItemTitle>
            <S.ItemInput type="number" placeholder="07250" />
          </S.FormItem>
          <S.PostSearchButton>우편번호 검색</S.PostSearchButton>
          <S.FormItem style={{ width: '100%' }}>
            <S.DetailAddressInput />
          </S.FormItem>
          <S.FormItem style={{ width: '100%' }}>
            <S.DetailAddressInput />
          </S.FormItem>
        </S.PostSearchItem>
        <S.FormItem style={{ width: '100%' }}>
          <S.ItemTitle>유튜브</S.ItemTitle>
          <S.ItemInput type="text" placeholder="링크를 복사해주세요." />
        </S.FormItem>
        <S.FormItem style={{ width: '100%' }}>
          <S.ItemTitle>사진 첨부</S.ItemTitle>
          <S.UploadButtonWrapper>
            <S.ImageUploadButton>
              <span>+</span>
              <p>Upload</p>
            </S.ImageUploadButton>
            <S.ImageUploadButton>
              <span>+</span>
              <p>Upload</p>
            </S.ImageUploadButton>
            <S.ImageUploadButton>
              <span>+</span>
              <p>Upload</p>
            </S.ImageUploadButton>
          </S.UploadButtonWrapper>
        </S.FormItem>
        <S.FormItem style={{ width: '100%' }}>
          <S.ItemTitle>메인 설정</S.ItemTitle>
          <S.RadioItem>
            <input id="youtube" type="radio" value={'유튜브'} name="main-set"></input>
            <label for="youtube">유튜브</label>
            <input id="photo" type="radio" value={'사진'} name="main-set"></input>
            <label for="photo">사진</label>
          </S.RadioItem>
        </S.FormItem>
      </S.FormWrapper>
      <S.FormItem style={{ width: '100%' }}>
        <S.RegisterButton
          disabled={!formValidation}
          formValidation={formValidation}
          onClick={handleSumbit}>
          등록하기
        </S.RegisterButton>
      </S.FormItem>
    </S.ContentWrapper>
  );
}
