import React, {useState} from 'react';
import BookCover from '../bookshape/BookCover';
import Modals from './Modal'
import OpenModal from './OpenModal';

function AfterLogin() {
  const [selected, setSelected] = useState<string>('images/mainLogo.png');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <OpenModal isOpen={isOpen} setIsOpen={setIsOpen} setSelected={setSelected} />
      <BookCover>
        <Modals setIsOpen={setIsOpen} selected={selected} setSelected={setSelected} />
      </BookCover>
    </>
  );
}

export default AfterLogin;