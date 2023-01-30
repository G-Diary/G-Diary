import React from 'react';
import styled from 'styled-components';

const BookShape2Left = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    border: 5px solid #F0DB6D;
    border-right : rgba(245, 245, 245, 1);
    background-color: white;
    background-size:cover;
    background-image: url("images/paper.jpeg");
    box-shadow:12px 9px 10px 0 #676262;
    @media screen and (min-width: 1401px), screen and (min-height: 701px) {
      width: 600px;
      height: 750px; 
    }
    @media screen and (max-width: 1400px), screen and (max-height: 700px) {
      width: 480px;
      height: 600px; 
    }
`
const Line =styled.div`
  border-top : 5px solid #F0DB6D;
  border-bottom : 5px solid #F0DB6D;
  background: linear-gradient(-90deg, rgba(129, 121, 121, 1), rgba(244, 244, 244, 1));
  box-shadow:12px 9px 10px 0 #676262;
  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    height : 750px;
    width: 8px;

  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    height : 600px;
    width: 6.4px;

  }
`
function BookShape2L({children}){
  return( 
    <>
      <BookShape2Left>
        {children}
      </BookShape2Left>
      <Line></Line>
    </>

  )
}

export default BookShape2L;