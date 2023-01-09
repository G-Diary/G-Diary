import styled from 'styled-components';

const CoverControling = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;`

function CoverControl({children}) {
  return(
    <CoverControling>
      {children}         
    </CoverControling>
  )
}

export default CoverControl;