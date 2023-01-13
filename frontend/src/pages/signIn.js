import React from 'react';
import BookCover from '../components/bookshape/BookCover';
import CoverControled from './CoverControl';
import SignInForm from './SignInForm';
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