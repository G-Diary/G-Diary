import React from 'react';
import { WriteContainer, Book2Container } from './WriteGrim';
import BookShape2L from '../components/bookshape/BookShapeL';
import BookShape2R from '../components/bookshape/BookShapeR';
import Bookmark from '../components/diary/Bookmark';
import Calender from '../components/diary/Calender';
import DiaryList from '../components/diary/DiaryList';

function GrimList(){
  return(
    <WriteContainer>
      <Book2Container> 
        <BookShape2L>
          <Calender />
        </BookShape2L>
        <BookShape2R>
          <DiaryList />
        </BookShape2R>
        <Bookmark />
      </Book2Container>
    </WriteContainer>)
}

export default GrimList;