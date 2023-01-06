import React from 'react';
import { Link } from 'react-router-dom';
import BookCover from '../components/bookshape/bookCover';

export default function Main() {
  return(
    <div>
      <BookCover />
      <div className='coverControl'>
        <div className='title'>G.Diary</div>
        <div className='linkBox'>
          <Link to='signIn' className='link'>Sign In</Link>
          <Link to='signUp' className='link'>Sign Up</Link>
          <Link to='manual' className='link'>Manual</Link>
        </div>
      </div>
    </div>
    
  );
}