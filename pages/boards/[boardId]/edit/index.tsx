import BoardWrite from 'src/components/units/board/write/BoardWrite.container';
import { FETCH_BOARD } from 'src/components/units/board/detail/BoardDetail.queries';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { IQuery, IQueryFetchBoardArgs } from 'src/commons/types/generated/types';

export default function BoardEditPage() {
  const router = useRouter();
  const boardId = typeof router.query.boardId === 'string' ? router.query.boardId : '';
  const { data } = useQuery<Pick<IQuery, 'fetchBoard'>, IQueryFetchBoardArgs>(FETCH_BOARD, {
    variables: { boardId },
    skip: !router.query.boardId,
  });
  if (!boardId) return <></>;
  return <BoardWrite isEdit={true} data={data} />;
}
