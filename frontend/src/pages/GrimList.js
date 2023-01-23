import React, { useState, useEffect } from 'react';
import { WriteContainer, Book2Container } from './WriteGrim';
import BookShape2L from '../components/bookshape/BookShapeL';
import BookShape2R from '../components/bookshape/BookShapeR';
import Bookmark from '../components/diary/Bookmark';
import Calender from '../components/diary/Calender';
import DiaryList from '../components/diary/DiaryList';
import { useStore } from '../store/store';
import { format} from 'date-fns';
import { Link } from 'react-router-dom';
import { DiviContainer } from '../components/diary/DiaryContent';
import { BsArrowRight  } from 'react-icons/bs';
import '../components/diary/Calender.css';

function GrimList(){
  const [list, setList]=useState([]);
  const {choiceDate, exist}=useStore();

  useEffect(()=>{
    fetch('/data/dummy.json')
      .then(res=>res.json())
      .then(res=>{
        setList(res);
      });
  },[])
  console.log(exist)
  for (let i = 0; i < Object.keys(list).length; i++) {
    let key = Object.keys(list);
    let value = (list[i].date);
    console.log(key, value)
  }
  return(
    <WriteContainer>
      <Book2Container> 
        <BookShape2L>
          <Calender list={list}/>
        </BookShape2L>
        <BookShape2R>
          {list.filter(x=>new Date(x.date).toDateString()===choiceDate.toDateString())
            // eslint-disable-next-line no-loop-func
            .map(data=>{
              return <DiaryList key={data.id} title={data.title} weather={data.weather} draw={data.drawing_url} contents={data.contents} date={data.date} emoji={data.emoji} />})}
          {exist.includes(choiceDate)?'':(<DiviContainer>
            <div style={{fontSize:'2.5rem', fontFamily:'Comic Sans MS', textAlign:'center'}}>
                Shall we record the day of
              <p style={{display:'flex', flexDirection:'row', justifyContent:'center'}}><p style={{width:'17rem', margin:'0', color:'orange'}}>{format(choiceDate, 'MMM')} {choiceDate.getDate()}, {choiceDate.getFullYear()}</p>?</p>
              <Link to='/write' state={{date:choiceDate}} className="listLink">
                    Get started<BsArrowRight size="1.5rem" />
              </Link>
            </div>
          </DiviContainer>)}
        </BookShape2R>
        <Bookmark />
      </Book2Container>
    </WriteContainer>)
}

export default GrimList;