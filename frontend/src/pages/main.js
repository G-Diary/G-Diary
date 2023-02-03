import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BookCover from '../components/bookshape/BookCover';
import Titles from './Title';
import CoverControl from './CoverControl'

const LinkBox = styled.div`
  width: 110%;
  margin: auto;
  padding-bottom : 10px;
  display: flex;
  text-align: center;
  position: relative;
  left: 2.5px;
  `

const ShowImage = styled.img`
  display: flex;
  justify-contents : center;
  align-items : center;
  width: 420px;
  heigth: 450px;
  `

function Main() {
  return(
    <BookCover>
      <CoverControl>
        <Titles>G.Diary</Titles>
        <ShowImage src='images/logo.png' />
        <LinkBox>
          <Link to='/signin' className='link'>로그인</Link>
          <Link to='/signup' className='link'>회원가입</Link>
          <Link to='/about' className='link'>소개</Link>
        </LinkBox>
      </CoverControl>
    </BookCover>
  );
}

export default Main;