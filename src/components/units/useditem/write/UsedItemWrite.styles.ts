import styled from '@emotion/styled'

export const ContentWrapper = styled.div`
  padding: 40px 75px 60px;
  /* min-width: 920px; */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`

export const ContentTitle = styled.h2`
  font-size: 3.6rem;
  font-weight: 700;
  margin-bottom: 80px;
  text-align: center;
`

export const FormWrapper = styled.div`
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  dl {
    margin-bottom: 21px;
  }
`

export const FormItem = styled.div`
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

export const ItemTitle = styled.div`
  font-size: 1.6rem;
  margin-bottom: 21px;
`

export const ImagesWrapper = styled.div`
  display: flex;
`

export const RadioItem = styled.div`
  display: flex;
  & > label {
    margin-left: 8px;
  }
  & > label {
    margin-right: 20px;
  }
  & > label:last-of-type {
    margin-right: 0px;
  }
  & > input[type='radio'] {
    width: 16px;
    height: 16px;
    appearance: none;
    transition: border 0.1s ease-in-out;
    vertical-align: middle;
    appearance: none;
    border: max(2px, 0.1em) solid gray;
    border-radius: 50%;
  }
  & > input[type='radio']:checked {
    border: 0.4em solid ${({ theme }) => theme.colors.main};
  }
  & > input[type='radio']:focus-visible {
    outline: max(2px, 0.1em) dotted ${({ theme }) => theme.colors.main};
    outline-offset: max(2px, 0.1em);
  }
`

export const MapAddressWrapper = styled.div``
export const MapWrapper = styled.div``
export const AddressWrapper = styled.div``

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  button:first-of-type {
    margin-right: 16px;
  }
`

export const TextEditorWrapper = styled.div`
  width: 100%;
  margin-bottom: 21px;
  height: 320px;
`

export const TextEditorLabel = styled.label`
  display: block;
  font-size: 1.6rem;
  margin-bottom: 21px;
`
