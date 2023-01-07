import React from 'react'
import DiaryContent from '../components/diary/DiaryContent';
import GrimChoice from '../components/diary/GrimChoice';
import BookShape2L from '../components/bookshape/BookShapeL';
import './WriteGrim.css';
import BookShape2R from '../components/bookshape/BookShapeR';

function WriteGrim({props}){
  return(
    <div className='writeContainer'>
      <div className='book2Container'> 
        <BookShape2L>
          <GrimChoice />
          {/* <DiaryContent /> */}
        </BookShape2L>
        <BookShape2R>
          <DiaryContent />
        </BookShape2R>
      </div>
    </div>)
}

export default WriteGrim;