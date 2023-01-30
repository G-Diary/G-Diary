import React from 'react';
import BookCover from '../components/bookshape/BookCover';
import CoverControl from './CoverControl';
import SignInForm from '../components/account/SignInForm';
import Titles from './Title';
import { LockOutlined } from '@mui/icons-material';
import styled from 'styled-components';

const Icon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-items: center;
  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    bottom:135px;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    bottom:108px;
  }
`

function SignIn() {
  return(
    <BookCover>
      <CoverControl>
        <Titles>로그인</Titles>
        <Icon>
          <LockOutlined style={{
            '@media screen and (min-width: 1401px), screen and (min-height: 701px)' :{
              fontSize:'80px', 
            },
            '@media screen and (max-width: 1400px), screen and (max-height: 700px)' :{
              fontSize:'70px', 
            },
            backgroundColor: '#F0DB6D',
            borderRadius: '50px'
          }}/>
        </Icon>
        <SignInForm />
      </CoverControl>
    </BookCover>
  );
}

export default SignIn;