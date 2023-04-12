import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
 
type BookShape2LProps = {
  children:React.ReactNode;
}

function BookShape2L({ children }:BookShape2LProps) {
  return( 
    <>
      <BookShape2Left>
        {children}
      </BookShape2Left>
      <Line/>
    </>

  )
}

export default BookShape2L;

const BookShape2Left = styled.div`
    display: flex;
    align-items: center;
    width: 600px;
    height: 750px; 
    justify-content: center;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    border: 5px solid #F0DB6D;
    border-right : rgba(245, 245, 245, 1);
    background-color: white;
    background-size:cover;
    background-image: url("images/paper.jpeg");
    box-shadow:12px 9px 10px 0 #676262;
`
const Line =styled.div`
  width: 8px;
  border-top : 5px solid #F0DB6D;
  border-bottom : 5px solid #F0DB6D;
  background: linear-gradient(-90deg, rgba(129, 121, 121, 1), rgba(244, 244, 244, 1));
  height : 750px;
  box-shadow:12px 9px 10px 0 #676262;
  `