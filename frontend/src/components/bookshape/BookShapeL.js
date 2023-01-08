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
    border: 5px solid #535353;
    background-color: white;
    background-size:cover;
    background-image: url("images/paper2.jpeg");
`

function BookShape2L({children}){
  return( 
    <BookShape2Left>
      {children}
    </BookShape2Left>
  )
}

export default BookShape2L;