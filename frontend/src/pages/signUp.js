import React from 'react';
import BookCover from '../components/bookshape/BookCover';
import CoverControled from './CoverControl';
import SignUpForm from '../components/account/SignUpForm';
import Titles from './Title';
import { Person } from '@mui/icons-material';
import styled from 'styled-components'

const Icon = styled.div`
  position: relative;
  bottom:135px;
  display: flex;
  align-items: center;
  justify-items: center;
`

function SignUp() {
  return(
    <BookCover>
      <CoverControled>
        <Titles>회원가입</Titles>
        <Icon>
          <Person style={{
            fontSize:'50px', 
            backgroundColor: '#F0DB6D', 
            borderRadius: '50px'
          }}/>
        </Icon>
        <SignUpForm/>
      </CoverControled>
    </BookCover>
    
  );
}

export default SignUp;