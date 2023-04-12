import React, { useState } from 'react'
import DiaryContent from '../components/diary/DiaryContent';
import GrimChoice from '../components/diary/GrimChoice';
import BookShape2L from '../components/bookshape/BookShapeL';
import styled from 'styled-components';
import BookShape2R from '../components/bookshape/BookShapeR';
import Bookmark from '../components/bookshape/Bookmark';
import Loading from '../components/Loading';

function WriteGrim(){
  const [loading, setLoading]=useState<boolean>(false);
  const getLoading = (load:boolean) =>{
    setLoading(load);
  }
  return(
    <WriteContainer>
      {loading?<Loading />:''}
      <Book2Container> 
        <BookShape2L>
          <GrimChoice />
        </BookShape2L>
        <BookShape2R>
          <DiaryContent getLoading={getLoading}/>
        </BookShape2R>
        <Bookmark />
      </Book2Container>
    </WriteContainer>
  )
}

export default WriteGrim;

export const WriteContainer = styled.div`
  position: relative;
`
export const Book2Container = styled.div`
  height: 100vh;
  display: flex;
  position: absolute;
  top: 0;
  right: -200%;
  bottom: 0;
  left: -200%; 
  justify-content: center;
  align-items: center;
  margin-left: 70px;
`