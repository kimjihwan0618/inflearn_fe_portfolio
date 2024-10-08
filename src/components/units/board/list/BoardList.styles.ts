import styled from '@emotion/styled'

export const Wrapper = styled.div`
  max-width: 1200px;
`
export const BottomWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`

export const BestBoardsSectionTitle = styled.h3`
  font-size: 3.6rem;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: center;
`

export const BestBoardWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 80px;
`
export const BestBoardItem = styled.div`
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  height: 257px;
  width: 25%;
  margin-right: 24px;
  overflow: hidden;
  cursor: pointer;
  &:last-of-type {
    margin-right: 0px;
  }
`

export const ItemImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray06};
`

export const BoardInfo = styled.dl`
  padding: 20px;
`

export const Title = styled.dt`
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const Detail = styled.dd`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ul {
    margin-bottom: 8px;
  }
`

export const Writer = styled.li`
  font-size: 1.6rem;
`
export const CreatedAt = styled.li`
  color: ${({ theme }) => theme.colors.gray03};
  font-size: 1.2rem;
  margin-top: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const ThumbBox = styled.li``
export const ThumbCount = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
`
