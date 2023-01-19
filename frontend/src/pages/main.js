import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BookCover from '../components/bookshape/BookCover';
import Titles from './Title';
import CoverControl from './CoverControl'

const LinkBox = styled.div`
  width: 180%;
  margin: 10px auto;
  display: flex;
  text-align: center;`

const ShowImage = styled.img`
  position: relative;
  width: 254px;
  height: 330px;
  bottom: 206px;
  right: 125px;
  `

function Main() {
  return(
    <BookCover>
      <CoverControl>
        <Titles>G.Diary</Titles>
        <ShowImage src='images/logo.png' />
        <LinkBox>
          <Link to='/signIn' className='link'>Sign In</Link>
          <Link to='/signUp' className='link'>Sign Up</Link>
          <Link to='/about' className='link'>Manual</Link>
        </LinkBox>
      </CoverControl>
    </BookCover>
  );
}

export default Main;