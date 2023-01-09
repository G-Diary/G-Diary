import React from 'react';
import BookCover from '../components/bookshape/bookCover';
import CoverControled from './coverControl';
import SignInForm from './signInForm';
import Titles from './title';

function SignIn() {
  return(
    <BookCover>
      <CoverControled>
        <Titles>Sign In</Titles>
        <SignInForm />
      </CoverControled>
    </BookCover>
  );
}

export default SignIn;