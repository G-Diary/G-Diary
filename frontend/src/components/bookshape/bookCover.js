import React from 'react';
import styled from 'styled-components';
import Bookmark from '../diary/Bookmark';
import LogoutBtn from '../access/Logout';
import isLogin from '../access/IsLogin';



const AllControl = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;`

const Left = styled.div`
  background-color: #F0DB6D;
  float: left;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  box-shadow:16px 9px 10px 0 #676262;
  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    width: 55px;
    height: 760px;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    width: 44px;
    height: 608px;
  }
`

const Right = styled.div`
  background-color: #FDF6EA;
  float: left;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  box-shadow:12px 9px 10px 0 #676262;
  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    width: 675px;
    height: 760px;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    width: 540px;
    height: 608px;
  }
`

const Year = styled.div`
  display:flex;
  justify-content:space-between;
  border-bottom: solid 2px black;

  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    font-size: 30px;
    margin: 35px;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    font-size: 24px;
    margin: 28px;
  }
`





function BookCover({children}) {
  let now = new Date();
  let year = now.getFullYear();
  return (
    <AllControl>
      <Left/>
      <Right>
        <Year>
          {year}
          {isLogin() ? <LogoutBtn/> : ''}
        </Year>
        {children}
      </Right>
      <Bookmark/>
    </AllControl>
  );
}

export default BookCover;