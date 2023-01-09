import React from 'react';
import BookCover from '../components/bookshape/bookCover';
import CoverControled from './CoverControl';
import SignInForm from './signInForm';
import Titles from './Title';

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