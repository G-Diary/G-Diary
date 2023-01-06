import React from 'react';
import BookCover from '../components/bookshape/bookCover';
import SignUpForm from './signUpForm';

export default function SignUp() {
  return(
    <div>
      <BookCover />
      <div className='coverControl'>
        <div className='title'>Sign Up</div>
        <SignUpForm />
      </div>
    </div>
  );
}