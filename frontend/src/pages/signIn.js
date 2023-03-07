import React from 'react';
import BookCover from '../components/bookshape/BookCover';
import CoverControl from './CoverControl';
import SignInForm from '../components/account/SignInForm';
import Titles from './Title';
import { LockOutlined } from '@mui/icons-material';
import styled from 'styled-components';

const Icon = styled.div`
  position: relative;
  bottom:135px;
  display: flex;
  align-items: center;
  justify-items: center;
`

function SignIn() {
  return(
    <BookCover>
      <CoverControl>
        <Titles>로그인</Titles>
        <Icon>
          <LockOutlined style={{
            fontSize:'50px', 
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