import { useRouter } from 'next/router';
import BoardCommentWriteUI from './BoardCommentWrite.presenter';
import { useMutation } from '@apollo/client';
import { CREATE_BOARD_COMMENT } from './BoardCommentWrite.queries';
import { FETCH_BOARD_COMMENTS } from '../list/BoardCommentList.queries';
import { useState } from 'react';

export default function BoardCommentWrite() {
  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [contents, setContents] = useState('');
  const [writer, setWriter] = useState('');
  const [password, setPassword] = useState('');

  const onInputContents = (event) => {
    const {
      target: { value },
    } = event;
    if (value.length <= 100) {
      setContents(value);
    } else {
      setContents(value.substring(0, 100));
    }
  };

  const onClickRating = (event) => {
    setRating(Number(event.target.id.replace('rating', '')));
  };

  const onInputUserInfo = (event) => {
    const {
      target: { value, id },
    } = event;
    if (id === 'writerInput') setWriter(value);
    if (id === 'pwInput') setPassword(value);
  };

  const onClickSubmit = async () => {
    try {
      if (writer === '') {
        alert('작성자를 입력해주세요.');
        return;
      }
      if (password === '') {
        alert('비밀번호를 입력해주세요.');
        return;
      }
      const result = await createBoardComment({
        variables: {
          boardId: router.query.boardId,
          createBoardCommentInput: {
            writer,
            password,
            contents,
            rating,
          },
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
      if (result?.data?.createBoardComment?.createdAt) {
        setPassword('');
        setWriter('');
        setContents('');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <BoardCommentWriteUI
      onClickRating={onClickRating}
      rating={rating}
      contents={contents}
      writer={writer}
      password={password}
      onInputContents={onInputContents}
      onInputUserInfo={onInputUserInfo}
      onClickSubmit={onClickSubmit}
      isEdit={false}
    />
  );
}
