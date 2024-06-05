import {
  ContentWrapper,
  ContentTitle,
  FormWrapper,
  FormItem,
  ItemTitle,
  ItemInput,
  ItemTextArea,
  PostSearchButton,
  PostSearchItem,
  DetailAddressInput,
  RegisterButton,
  ImageUploadButton,
  UploadButtonWrapper,
  RadioItem,
  FormItemError,
} from './BoardWrite.styles';

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
}) {
  return (
    <ContentWrapper>
      <ContentTitle>게시물 등록</ContentTitle>
      <FormWrapper>
        <FormItem style={{ width: '48.78%' }}>
          <ItemTitle>작성자</ItemTitle>
          <ItemInput
            value={writer}
            onChange={(e) => {
              handleInputChange(e, setWriter, setWriterError);
            }}
            type="text"
            placeholder="이름을 적어주세요."
          />
          <FormItemError>{writerError}</FormItemError>
        </FormItem>
        <FormItem style={{ width: '48.78%' }}>
          <ItemTitle>비밀번호</ItemTitle>
          <ItemInput
            value={password}
            onChange={(e) => {
              handleInputChange(e, setPassword, setPasswordError);
            }}
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
          <FormItemError>{passwordError}</FormItemError>
        </FormItem>
        <FormItem style={{ width: '100%' }}>
          <ItemTitle>제목</ItemTitle>
          <ItemInput
            value={title}
            onChange={(e) => {
              handleInputChange(e, setTitle, setTitleError);
            }}
            type="text"
            placeholder="제목을 작성해주세요."
          />
          <FormItemError>{titleError}</FormItemError>
        </FormItem>
        <FormItem style={{ width: '100%' }}>
          <ItemTitle>내용</ItemTitle>
          <ItemTextArea
            value={contents}
            onChange={(e) => {
              handleInputChange(e, setContents, setContentsError);
            }}
            type="text"
            placeholder="내용을 작성해주세요."
          />
          <FormItemError>{contentsError}</FormItemError>
        </FormItem>
        <PostSearchItem>
          <FormItem style={{ width: '78px' }}>
            <ItemTitle>주소</ItemTitle>
            <ItemInput type="number" placeholder="07250" />
          </FormItem>
          <PostSearchButton>우편번호 검색</PostSearchButton>
          <FormItem style={{ width: '100%' }}>
            <DetailAddressInput />
          </FormItem>
          <FormItem style={{ width: '100%' }}>
            <DetailAddressInput />
          </FormItem>
        </PostSearchItem>
        <FormItem style={{ width: '100%' }}>
          <ItemTitle>유튜브</ItemTitle>
          <ItemInput type="text" placeholder="링크를 복사해주세요." />
        </FormItem>
        <FormItem style={{ width: '100%' }}>
          <ItemTitle>사진 첨부</ItemTitle>
          <UploadButtonWrapper>
            <ImageUploadButton>
              <span>+</span>
              <p>Upload</p>
            </ImageUploadButton>
            <ImageUploadButton>
              <span>+</span>
              <p>Upload</p>
            </ImageUploadButton>
            <ImageUploadButton>
              <span>+</span>
              <p>Upload</p>
            </ImageUploadButton>
          </UploadButtonWrapper>
        </FormItem>
        <FormItem style={{ width: '100%' }}>
          <ItemTitle>메인 설정</ItemTitle>
          <RadioItem>
            <input id="youtube" type="radio" value={'유튜브'} name="main-set"></input>
            <label for="youtube">유튜브</label>
            <input id="photo" type="radio" value={'사진'} name="main-set"></input>
            <label for="photo">사진</label>
          </RadioItem>
        </FormItem>
      </FormWrapper>
      <FormItem style={{ width: '100%' }}>
        <RegisterButton onClick={handleSumbit}>등록하기</RegisterButton>
      </FormItem>
    </ContentWrapper>
  );
}