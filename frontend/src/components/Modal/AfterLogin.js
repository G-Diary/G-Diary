import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import BookCover from '../bookshape/BookCover';
import Modals from './Modal'
import Titles from '../../pages/Title';
import CoverControl from '../../pages/CoverControl';

function AfterLogin() {

  console.log(localStorage)
  return (
    <BookCover>
      <Modals />
    </BookCover>
  );
}


export default AfterLogin;