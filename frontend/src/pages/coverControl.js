import styled from 'styled-components';

const Control = styled.div`
  display: flex;
  justify-content : center;
  flex-direction : column;
  align-items : center;
  position: relative;
  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    top: 8px;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    top: 6.4px;
  }
`

function CoverControl({children}) {
  return(
    <Control>
      {children}         
    </Control>
  )
}

export default CoverControl;