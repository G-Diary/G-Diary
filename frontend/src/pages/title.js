import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  position: relative;
  bottom: 256px;
  right: 180px;
  font-size: 100px;`

function Titles({children}) {
  return(
    <Title>
      {children}
    </Title>
  )
}

export default Titles;