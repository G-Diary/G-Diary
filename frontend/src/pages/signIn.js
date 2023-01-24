import React from 'react';
import BookCover from '../components/bookshape/BookCover';
import CoverControled from './CoverControl';
import SignInForm from '../components/account/SignInForm';
import Titles from './Title';
import { LockOutlined } from '@mui/icons-material';
import styled from 'styled-components';

const Icon = styled.div`
  position: relative;
  bottom:130px;
  display: flex;
  align-items: center;
  justify-items: center;
`

function SignIn() {
  return(
    <BookCover>
      <CoverControled>
        <Titles>Sign In</Titles>
        <Icon>
          <LockOutlined style={{
            fontSize:'50px', 
            backgroundColor: '#F0DB6D',
            borderRadius: '50px'
          }}/>
        </Icon>
        <SignInForm />
      </CoverControled>
    </BookCover>
  );
}

export default SignIn;