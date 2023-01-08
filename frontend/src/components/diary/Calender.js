import React, {useState} from 'react';
import './Calender.css';
import { BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill  } from 'react-icons/bs';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';

//(date-fns 이용: 날짜 관련 함수 총 집합 라이브러리)
//header 컴포넌트(월 이동)
const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className="header row">
      <div className="headercol col-start">
        <span className="text">
          <span className="text month">
            {format(currentMonth, 'M')}월
          </span>
          {format(currentMonth, 'yyyy')}
        </span>
      </div>
      <div className="headercol col-end">
        <BsFillArrowLeftCircleFill size="25" className="icons" onClick={prevMonth} />
        <BsFillArrowRightCircleFill size="25" className="icons" onClick={nextMonth} />
      </div>
    </div>
  );
};

//Days(요일) 캄포넌트
const RenderDays = () =>{
  const days=[];
  const date=['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat'];

  for(let i=-0; i<7; i++){
    days.push(
      <div className='dayscol' key={i}>
        {date[i]}
      </div>
    )
  }
  return <div className='days row'>{days}</div>
}

//Body(Cells) 컴포넌트(날짜(일))
const RenderCells = ({currentMonth, selectedDate, onDateClick})=>{
  const monthStart=startOfMonth(currentMonth);
  const monthEnd=endOfMonth(monthStart);
  const startDate=startOfWeek(monthStart);
  const endDate=endOfWeek(monthEnd);

  const rows=[];
  let days=[];
  let day=startDate;
  let formattedDate = '';

  while(day<=endDate){
    for (let i=0; i<7; i++){
      formattedDate=format(day, 'd');
      const cloneDay=day;
      days.push(
        <div className={`bodycol cell ${
          !isSameMonth(day, monthStart)
            ? 'disabled'
            : isSameDay(day, selectedDate)
              ? 'selected'
              : format(currentMonth, 'M') !== format(day, 'M')
                ? 'not-valid'
                :'valid'
        }`}
        key={day}
        onClick={()=>onDateClick(parse(cloneDay))}>
          <span className={
            format(currentMonth, 'M') !== format(day, 'M')
              ? 'text not-valid'
              : ''
          }>
            {formattedDate}
          </span>
        </div>
      );
      day=addDays(day, 1);
    }
    rows.push(
      <div className='bodyrow' key={day}>
        {days}
      </div>
    );
    days=[];
  }
  return <div className='calenderbody'>{rows}</div>
}

function Calender(){
  const [currentMonth, setCurrentMonth]=useState(new Date());
  const [selectedDate, setSelectedDate]=useState(new Date());

  const prevMonth = () =>{
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () =>{
    setCurrentMonth(addMonths(currentMonth,1));
  }
  const onDateClick = (day) =>{
    setSelectedDate(day);
  }
  return(
    <div className='listcontainer'>
      <div className='listname'>Diary List</div>
      <div className='calender'>
        <RenderHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth}></RenderHeader>
        <RenderDays></RenderDays>
        <RenderCells currentMonth={currentMonth} selectedDate={selectedDate} onDateClick={onDateClick}></RenderCells>
      </div>
    </div>
  )
}

export default Calender;