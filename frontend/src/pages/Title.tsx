import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Title = styled.div`
  display: flex;
  justify-contents: center;
  align-items: center;
  font-size: 5rem;
`;

function Titles({ children }: PropsWithChildren) {
  return <Title id="title">{children}</Title>;
}

export default Titles;
