import React from 'react';
import styled from 'styled-components';
import Bookmark from '../diary/Bookmark';
import LogoutBtn from '../access/Logout';
import isLogin from '../access/IsLogin';
import BookShape2R from './BookShapeR'

const AllControl = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;`

const Left = styled.div`
  background-color: #F0DB6D;
  float: left;
  width: 55px;
  height: 760px;
  margin-left: 18px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  box-shadow:16px 9px 10px 0 #676262;`

const Right = styled.div`
  background-color: #FDF6EA;
  float: left;
  width: 610px;
  height: 760px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  box-shadow:12px 9px 10px 0 #676262;`

const Year = styled.div`
  display:flex;
  justify-content:space-between;
  border-bottom: solid 2px black;
  font-size: 30px;
  margin: 35px;`


function BookCover({children}) {
  let now = new Date();
  let year = now.getFullYear();
  return (
    <AllControl className='slide'>
      <Left/>
      <Right className='flip'>
        <Year>
          {year}
          {isLogin() ? <LogoutBtn/> : ''}
        </Year>
        {children}
      </Right>
      <BookShape2R/>
      <Bookmark/>
    </AllControl>
  );
}

export default BookCover;