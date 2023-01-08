import React from 'react';
import styled from 'styled-components';
 
const BookShape2Left = styled.div`
    display: flex;
    align-items: center;
    width: 600px;
    height: 750px; 
    justify-content: center;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    border: 5px solid rgb(83,83,83,70%);
    background-color: white;
    background-size:cover;
    background-image: url("images/paper2.jpeg");
    box-shadow:12px 9px 10px 0 #676262;
`
const Line =styled.div`
  border-left : 1.3px solid #383838;
  height : 760px;
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