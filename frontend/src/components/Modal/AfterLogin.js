import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import BookCover from '../bookshape/BookCover';
import Modals from './Modal'
import Titles from '../../pages/Title';
import CoverControl from '../../pages/CoverControl';
import axios from '../../apis/axios';

function AfterLogin() {
  function onClick(e) {
    console.log(sessionStorage.getItem('nickname'))
  }
  return (
    <BookCover>
      <Modals />
      <button type='button' onClick={onClick}>회원정보</button>
    </BookCover>
  );
}

export default AfterLogin;