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
import api from '../apis/axios';

function GrimList(){
  const [list, setList]=useState([]);
  const {choiceDate}=useStore();
  const exist=[];

  //일기 리스트 가져오기(전체)
  const allList = async () =>{
    const response = await api.get('/diaries');
    console.log(response);
    return response.data;
  }
  useEffect(()=>{
    const getAllList=async () =>{
      const allGrimList = await allList();
      if(allGrimList) setList(allGrimList);
    };
    getAllList();
  },[]);

  for(let i=0;i<list.length;i++){
    exist.push(list[i].diary_date);
  }

  return(
    <WriteContainer>
      <Book2Container> 
        <BookShape2L>
          <Calender list={list} exist={exist} />
        </BookShape2L>
        <BookShape2R>
          {list.filter(x=>new Date(x.diary_date).toDateString()===choiceDate.toDateString())
            // eslint-disable-next-line no-loop-func
            .map((data,index)=>{
              return <DiaryList key={index} title={data.title} weather={data.weather} draw={data.drawing_url} contents={data.contents} date={data.diary_date} />})}
          {exist.includes(format(choiceDate, 'yyyy-MM-dd'))?'':(<DiviContainer>
            <div style={{fontSize:'2.5rem', fontFamily:'Comic Sans MS', textAlign:'center'}}>
                Shall we record the day of
              <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}><p style={{width:'17rem', margin:'0', color:'orange'}}>{format(choiceDate, 'MMM')} {choiceDate.getDate()}, {choiceDate.getFullYear()}</p>?</div>
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