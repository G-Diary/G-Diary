import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  position: relative;
  bottom: 236px;
  right: 146px;
  font-size: 80px;`

function Titles({children}) {
  return(
    <Title>
      {children}
    </Title>
  )
}

export default Titles;