import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  display: flex;
  justify-contents : center;
  align-items : center;
  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    font-size: 80px;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    font-size: 64px;
  }
`

function Titles({children}) {
  return(
    <Title>
      {children}
    </Title>
  )
}

export default Titles;