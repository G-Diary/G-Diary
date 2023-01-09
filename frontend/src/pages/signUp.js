import React from 'react';
import BookCover from '../components/bookshape/bookCover';
import SignUpForm from './signUpForm';
import CoverControled from './CoverControl';
import Titles from './Title';

function SignUp() {
  return(
    <BookCover>
      <CoverControled>
        <Titles>Sign Up</Titles>
        <SignUpForm />
      </CoverControled>
    </BookCover>
    
  );
}

export default SignUp;