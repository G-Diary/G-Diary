import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BookCover from '../components/bookshape/BookCover';
import Titles from './Title';
import CoverControl from './CoverControl'
import api from '../apis/axios'

const LinkBox = styled.div`
  width: 110%;
  margin: auto;
  display: flex;
  text-align: center;
  position: relative;
  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    padding-bottom : 10px;
    left: 2.5px;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    padding-bottom : 8px;
    left: 2px;
  }
`

const ShowImage = styled.img`
  display: flex;
  justify-contents : center;
  align-items : center;
  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    width: 420px;
    heigth: 450px;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    width: 336px;
    heigth: 360px;
  }
`

function Main() {
  console.log(api.defaults.headers.common)
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