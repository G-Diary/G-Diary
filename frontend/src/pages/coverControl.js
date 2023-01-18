import styled from 'styled-components';

const Control = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;`

function CoverControl({children}) {
  return(
    <Control>
      {children}         
    </Control>
  )
}

export default CoverControl;