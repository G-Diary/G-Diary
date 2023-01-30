import React from 'react';
import styled from 'styled-components';

const BookShape2Right = styled.div`
    /* display: block; */
    /* margin: 0 auto; */
    display: flex;
    /* position: relative; */
    justify-content: center;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    border: 5px solid #F0DB6D;
    border-left: rgba(245, 245, 245, 1);
    background-color: white;
    background-size:cover;
    /*css파일에서 image불러올 때 public폴더에 있는 이미지는 못 불러옴(정확한 경로 작성해야함)*/
    background-image: url("images/paper.jpeg");
    z-index: 10;
    box-shadow: 7px 9px 10px 0px #676262;
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
  background: linear-gradient(90deg, rgba(129, 121, 121, 1) , rgba(244, 244, 244, 1));
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
function BookShape2R({children}){
  return(   
    <>
      <Line></Line>
      <BookShape2Right>
        {children}
      </BookShape2Right>
      
    </>
  )
}

export default BookShape2R;