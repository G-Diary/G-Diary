import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import BookCover from '../bookshape/BookCoverJ';
import Modals from './Modal'
import Titles from '../../pages/Title';
import CoverControl from '../../pages/CoverControl';
import api from '../../apis/axios';

function AfterLogin() {
  
  return (
    <BookCover>
      <Modals />
    </BookCover>
  );
}

export default AfterLogin;