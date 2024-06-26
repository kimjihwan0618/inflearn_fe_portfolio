import { toYYYYMMDD } from 'src/lib/utils/date';
import * as S from './BoardCommentList.styles';
import Image from 'next/image';
import BoardCommentWriteUI from '../write/BoardCommentWrite.presenter';
import { IBoardCommentListUIProps } from './BoardCommentList.types';

export default function BoardCommentListUI({
  comments,
  onClickCommentEdit,
  onClickCommentUpdate,
  onClickCommentDelete,
  onClickRating,
  rating,
  contents,
  writer,
  password,
  onInputContents,
  onInputUserInfo,
}: IBoardCommentListUIProps) {
  return (
    <S.Wrapper>
      {comments.map((comment, idx) =>
        !comment.isEdit ? (
          <S.CommentBox key={`${comment.writer}_${idx}`}>
            <S.CommentInfo>
              <Image src={'/images/ic_profile.png'} width={40} height={40} />
              <div>
                <S.UserName>{comment.writer}</S.UserName>
                <S.Rating>
                  {Array.from({ length: 5 }, (_, index) =>
                    comment.rating < index + 1 ? (
                      <div key={index}>
                        <Image src={'/images/ic_star-gray.png'} width={20} height={20} />
                      </div>
                    ) : (
                      <div key={index}>
                        <Image src={'/images/ic_star-yellow.png'} width={20} height={20} />
                      </div>
                    )
                  )}
                </S.Rating>
                <S.Comment>{comment.contents}</S.Comment>
                <S.Date>{toYYYYMMDD(new Date(comment.updatedAt))}</S.Date>
              </div>
            </S.CommentInfo>
            <S.Buttons>
              <button
                id={comment._id}
                data-writer={comment.writer}
                data-contents={comment.contents}
                data-rating={comment.rating}
                onClick={onClickCommentEdit}>
                <Image src={'/images/ic_pencil-gray.png'} width={18} height={18} />
              </button>
              <button id={comment._id} onClick={onClickCommentDelete}>
                <Image src={'/images/ic_close-gray.png'} width={14} height={14} />
              </button>
            </S.Buttons>
          </S.CommentBox>
        ) : (
          <BoardCommentWriteUI
            key={`${comment.writer}_${idx}`}
            onClickRating={onClickRating}
            rating={rating}
            contents={contents}
            writer={writer}
            password={password}
            onInputContents={onInputContents}
            onInputUserInfo={onInputUserInfo}
            onClickSubmit={onClickCommentUpdate}
            isEdit={true}
          />
        )
      )}
    </S.Wrapper>
  );
}
