import React from 'react';
import styled from 'styled-components';

const BookMark = styled.div`
    width: 70px;
    height: 700px;
`

const Mark = styled.div`
    width: 65px;
    height: 43px;
    margin-bottom: 10px;
    font-size: 20px;
    border-radius: 0 5px 5px 0;
    text-align: center;
    line-height: 43px;
    border: 1px groove gray;
    border-left: none;
`
function Bookmark(){
  return(<BookMark>
    <Mark style={{background:'#F2B3B3'}}>홈</Mark>
    <Mark style={{background:'#D99152'}}>기록</Mark>
    <Mark style={{background:'#F2B56B'}}>달력</Mark>
    <Mark style={{background:'#C2D2F2'}}>소개</Mark>
  </BookMark>)
}

export default Bookmark;