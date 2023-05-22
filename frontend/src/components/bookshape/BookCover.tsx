import React from 'react';
import styled from 'styled-components';
import Bookmark from './Bookmark';
import LogoutBtn from '../access/Logout';
import isLogin from '../access/IsLogin';
import './Right.css';
import { DiviContainer } from '../diary/DiaryContent';
import DiaryList from '../diarylist/DiaryList';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { useStore } from '../../store/store';

const AllControl = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Left = styled.div`
  background-color: #f0db6d;
  float: left;
  width: 55px;
  height: 47.5rem;
  margin-left: 18px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  box-shadow: 10px 9px 10px 0 #676262;
`;

const Year = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: solid 2px black;
  font-size: 1.87rem;
  margin: 2.2rem;
`;

// {children} : React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> tsx로 변환시 사용
function BookCover({ children }: React.PropsWithChildren) {
  // const list : Array<Object> = [];
  // const exist : Array<Object> = [];
  const list: any[] = [];
  const exist: any[] = [];
  const { choiceDate } = useStore();

  let now = new Date();
  let year = now.getFullYear();
  return (
    <AllControl className='slide'>
      <Left id='left' />
      <div className='flip'>
        <Year id='year'>
          {year}
          {/* {isLogin() ? <LogoutBtn/> : ''} */}
          <LogoutBtn />
        </Year>
        {children}
      </div>
      <div className='shapeR'>
        {list
          .filter((x) => new Date(x.diary_date).toDateString() === choiceDate.toDateString())
          // eslint-disable-next-line no-loop-func
          .map((data, index) => {
            return (
              <DiaryList
                key={index}
                title={data.title}
                weather={data.weather}
                draw={data.drawing_url}
                contents={data.contents}
                date={data.diary_date}
                emoji={''}
              />
            );
          })}
        {exist.includes(format(choiceDate, 'yyyy-MM-dd')) ? (
          ''
        ) : (
          <DiviContainer className='noContent' style={{ zIndex: '0' }}>
            <div className='writing'>
              <img className='writeImg' src='images/write.PNG' alt='list' />
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '5px' }}>
                <p className='date'>
                  {choiceDate.getFullYear()}년 {format(choiceDate, 'M')}월 {choiceDate.getDate()}일
                </p>
                의
              </div>
              하루를 기록해볼까요?
              <Link to='/write' state={{ date: choiceDate }} className='listLink'>
                일기 쓰러 가기
                <BsArrowRight size='2rem' />
              </Link>
            </div>
          </DiviContainer>
        )}
      </div>
      <Bookmark />
    </AllControl>
  );
}

export default BookCover;