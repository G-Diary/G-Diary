import React, { useState, useEffect } from 'react';
import { WriteContainer, Book2Container } from './WriteGrim';
import BookShape2L from '../components/bookshape/BookShapeL';
import BookShape2R from '../components/bookshape/BookShapeR';
import Bookmark from '../components/diary/Bookmark';
import Calender from '../components/diary/Calender';
import DiaryList from '../components/diary/DiaryList';
import { useStore } from '../store/store';

function GrimList(){
  const [list, setList]=useState([]);
  // let fulldate=profile.date.split('-');
  useEffect(()=>{
    fetch('/data/dummy.json')
      .then(res=>res.json())
      .then(res=>{
        setList(res);
      });
  },[])
  // const selDate=new Date(list.date).toLocaleDateString();

  // const selectedDateData=list.filter(
  //   list=>list.date===
  // )
  return(
    <WriteContainer>
      <Book2Container> 
        <BookShape2L>
          <Calender list={list}/>
        </BookShape2L>
        <BookShape2R>
          {/* <DiaryList /> */}
        </BookShape2R>
        <Bookmark />
      </Book2Container>
    </WriteContainer>)
}

export default GrimList;