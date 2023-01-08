import React from 'react';
import styled from 'styled-components';

const BookShape2Right = styled.div`
    /* display: block; */
    /* margin: 0 auto; */
    display: flex;
    /* position: relative; */
    width: 600px;
    height: 750px; 
    justify-content: center;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    border: 5px solid #535353;
    background-color: white;
    background-size:cover;
    /*css파일에서 image불러올 때 public폴더에 있는 이미지는 못 불러옴(정확한 경로 작성해야함)*/
    background-image: url("images/paper2.jpeg");
    z-index: 10;
`

function BookShape2R({children}){
  return(   
    <BookShape2Right>
      {children}
    </BookShape2Right>)
}

export default BookShape2R;