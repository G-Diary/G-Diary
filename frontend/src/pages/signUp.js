import React from 'react';
import BookCover from '../components/bookshape/bookCover';
import SignUpForm from './signUpForm';
import CoverControled from './coverControl';
import Titles from './title';

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