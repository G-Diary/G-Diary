import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  display: flex;
  justify-contents : center;
  align-items : center;
  font-size: 80px;`

function Titles({children} : any) {
  return(
    <Title>
      {children}
    </Title>
  )
}

export default Titles;