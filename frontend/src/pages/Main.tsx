import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BookCover from '../components/bookshape/BookCover';
import Titles from './Title';
import CoverControl from './CoverControl';

const LinkBox = styled.div`
  width: 41.9rem;
  margin: auto;
  padding-bottom: 1rem;
  display: flex;
  text-align: center;
  position: relative;
  left: 0.15rem;
`;

const ShowImage = styled.img`
  display: flex;
  justify-contents: center;
  align-items: center;
  width: 26.25rem;
  heigth: 28.12rem;
`;

function Main() {
  return (
    <BookCover>
      <CoverControl>
        <Titles>G.Diary</Titles>
        <ShowImage id='logo' src='images/logo.png' />
        <LinkBox id='linkBox'>
          <Link to='/signin' className='link'>
            로그인
          </Link>
          <Link to='/signup' className='link'>
            회원가입
          </Link>
          <Link to='/about' className='link'>
            소개
          </Link>
        </LinkBox>
      </CoverControl>
    </BookCover>
  );
}

export default Main;