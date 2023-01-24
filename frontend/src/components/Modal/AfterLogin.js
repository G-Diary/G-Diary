import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import BookCover from '../bookshape/BookCover';
import BookCoverJ from '../bookshape/BookCoverJ';
import Modals from './Modal'
import Titles from '../../pages/Title';
import CoverControl from '../../pages/CoverControl';


function AfterLogin(){
  return (
    <BookCoverJ>
      <Modals/>
    </BookCoverJ>
  );
}


export default AfterLogin;