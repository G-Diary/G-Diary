import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BookCover from '../components/bookshape/bookCover';
import Titles from './Title';

const CoverControl = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;`

const LinkBox = styled.div`
  width: 180%;
  margin: 10px auto;
  display: flex;
  text-align: center;`

function Main() {
  return(
    <BookCover>
      <CoverControl>
        <Titles>G.Diary</Titles>
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