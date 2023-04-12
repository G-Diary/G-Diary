import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Control = styled.div`
  display: flex;
  justify-content : center;
  flex-direction : column;
  align-items : center;
  position: relative;
  top: 10px;`

function CoverControl({children} : PropsWithChildren) {
  return(
    <Control>
      {children}         
    </Control>
  )
}

export default CoverControl;