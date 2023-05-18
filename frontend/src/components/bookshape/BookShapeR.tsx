import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

type BookShape2RProps = {
  children:React.ReactNode;
}

function BookShape2R({children}:BookShape2RProps){
  return(   
    <>
      <Line/>
      <BookShape2Right>
        {children}
      </BookShape2Right>
    </>
  )
}

export default BookShape2R;

const BookShape2Right = styled.div`
    display: flex;
    width: 38rem;
    height: 47rem; 
    justify-content: center;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    border: 5px solid #F0DB6D;
    border-left: rgba(245, 245, 245, 1);
    background-color: white;
    background-size:cover;
    /*css파일에서 image불러올 때 public폴더에 있는 이미지는 못 불러옴(정확한 경로 작성해야함)*/
    background-image: url("images/paper.jpeg");
    box-shadow: 7px 9px 10px 0px #676262;
    transition: width .1s, height .1s;
    @media screen and (max-width: 1400px), screen and (max-height: 500px){
      width: 35rem;
      height: 43rem;
    }
    @media screen and (max-width: 1200px), screen and (max-height: 400px){
      width: 26rem;
      height: 33rem;
    }
`
const Line =styled.div`
  width: 8px;
  border-top : 5px solid #F0DB6D;
  border-bottom : 5px solid #F0DB6D;
  background: linear-gradient(90deg, rgba(129, 121, 121, 1) , rgba(244, 244, 244, 1));
  height : 47rem;
  box-shadow:12px 9px 10px 0 #676262;
  transition: height .1s;
  @media screen and (max-width: 1400px), screen and (max-height: 500px){
    height: 43rem;
  }
  @media screen and (max-width: 1200px), screen and (max-height: 400px){
    height: 33rem;
  }
`