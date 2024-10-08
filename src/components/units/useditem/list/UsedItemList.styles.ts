import styled from '@emotion/styled'

export const Wrapper = styled.div`
  max-width: 1200px;
`
export const BestUsedItemSectionTitle = styled.h3`
  font-size: 3.6rem;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: center;
`

export const BestUsedItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 80px;
`
export const BestUsedItem = styled.div`
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  /* height: 391px; */
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
  height: 160px;
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray06};
`

export const UsedItemInfo1 = styled.dl`
  padding: 20px;
`

export const Title = styled.dt`
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const InfoBottom = styled.dd`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

export const Remarks = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray02};
`

export const Price = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
`

export const PickedItem = styled.span`
  display: flex;
  align-items: center;
  flex-direction: column;
`
export const PickedCount = styled.p`
  font-size: 1.2rem;
  margin-top: 2px;
`

export const UsedItemSearchWrapper = styled.div``
export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`
export const TabsItem = styled.ul`
  display: flex;
  align-items: center;
  margin-left: 28px;
`
export const Tab = styled.li`
  font-size: 1.8rem;
  white-space: nowrap;
  font-weight: ${(props) => (props['data-isactive'] ? 'bold' : '400')};
  color: ${(props) => (props['data-isactive'] ? '#000' : props.theme.colors.gray04)};
  border-bottom: 2px solid
    ${(props) => (props['data-isactive'] ? props.theme.colors.main : 'white')};
  margin-right: 20px;
  &:last-of-type {
    margin-right: 0px;
  }
  cursor: ${(props) => !props['data-isactive'] && 'pointer'};
`

export const UsedItemsWrapper = styled.div`
  width: 100%;
  padding-right: 20px;
  max-height: 800px;
  overflow-y: auto;
`

export const Bottom = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray04};
`
