import React from 'react';
import BookCover from '../components/bookshape/BookCover';
import CoverControled from './CoverControl';
import SignUpForm from '../components/account/SignUpForm';
import Titles from './Title';

function SignUp() {
  return(
    <BookCover>
      <CoverControled>
        <Titles>Sign Up</Titles>
        <SignUpForm/>
      </CoverControled>
    </BookCover>
    
  );
}

export default SignUp;