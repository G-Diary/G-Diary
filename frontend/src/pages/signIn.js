import React from 'react';
import BookCover from '../components/bookshape/bookCover';
import SignInForm from './signInForm';

export default function SignIn() {
  return(
    <div>
      <BookCover />
      <div className='coverControl'>
        <div className='title'>Sign In</div>
        <SignInForm />
      </div>
    </div>
  );
}