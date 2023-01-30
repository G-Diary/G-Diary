import styled from 'styled-components';

const Control = styled.div`
  display: flex;
  justify-content : center;
  flex-direction : column;
  align-items : center;`

function CoverControl({children}) {
  return(
    <Control>
      {children}         
    </Control>
  )
}

export default CoverControl;