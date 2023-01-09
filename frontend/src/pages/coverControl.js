import styled from 'styled-components';

const CoverControl = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;`

function CoverControled({children}) {
  return(
    <CoverControl>
      {children}         
    </CoverControl>
  )
}

export default CoverControled;