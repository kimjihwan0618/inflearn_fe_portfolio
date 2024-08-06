import styled from '@emotion/styled'

export const Header = styled.header`
  background: white;
  height: 152px;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
`
export const HeaderInner = styled.div`
  width: 62.5%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Logo = styled.h1`
  cursor: pointer;
`

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`
export const LodginButton = styled.button`
  font-size: 1.6rem;
  width: 92px;
  height: 44px;
  border-radius: 10px;
  background: white;
  cursor: pointer;
  font-weight: 'bold';
`

export const JoinButton = styled.button`
  background: ${({ theme }) => theme.colors.main};
  font-weight: bold;
  font-size: 1.6rem;
  border-radius: 10px;
  padding: 10px 16px;
  height: 44px;
  cursor: pointer;
  font-weight: 'bold';
`
