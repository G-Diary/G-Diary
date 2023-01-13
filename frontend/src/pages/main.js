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

const ShowImage = styled.div`
  position: relative;
  width: 330px;
  height: 330px;
  bottom: 206px;
  right: 175px;
  background-color: gray;
  border: solid 2px black;
  color: rgba(0,0,0,0);`

function Main() {
  return(
    <BookCover>
      <CoverControl>
        <Titles>G.Diary</Titles>
        <ShowImage>.</ShowImage>
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