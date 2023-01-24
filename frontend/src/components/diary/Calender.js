import React, {useState} from 'react';
import './Calender.css';
import { BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill, BsPlusCircleFill } from 'react-icons/bs';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays} from 'date-fns';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/store';

//(date-fns 이용: 날짜 관련 함수 총 집합 라이브러리)
//header 컴포넌트(월 이동)
const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className="header row">
      <div className="headercol col-start">
        <span className="text">
          <span className="text month">
            {format(currentMonth, 'MMM')}
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

  for(let i=0; i<7; i++){
    days.push(
      <div className='dayscol' key={i}>
        {date[i]}
      </div>
    )
  }
  return <div className='days row'>{days}</div>
}

//Body(Cells) 컴포넌트(날짜(일))
const RenderCells = ({currentMonth, today, list, selectedDate, onDateClick})=>{
  const monthStart=startOfMonth(currentMonth);
  const monthEnd=endOfMonth(monthStart);
  const startDate=startOfWeek(monthStart);
  const endDate=endOfWeek(monthEnd);
  const [add, setAdd]=useState(true);  //일기 추가 상태
  const [newDiary, setNewDiary]=useState(false);
  const {exist}=useStore();
  const rows=[];
  let days=[];
  let day=startDate;
  let formattedDate = '';
  // let exist=[];

  while(day<=endDate){
    for (let i=0; i<7; i++){
      formattedDate=format(day, 'd');
      const cloneDay=day;
      days.push(
        <div className={`bodycol cell ${
          !isSameMonth(day, monthStart)
            ? 'not-valid'
            : isSameDay(day, selectedDate)
              ? 'selected'
              : isSameDay(day, today)
                ? 'today'
                : format(currentMonth, 'M') !== format(day, 'M')
                  ? 'not-valid'
                  :'valid'
        }`}
        key={day}
        onClick={()=>onDateClick(cloneDay)}
        >
          <span>
            {formattedDate}
          </span>
          {list.filter(x=>new Date(x.diary_date).toDateString()===cloneDay.toDateString())
            // eslint-disable-next-line no-loop-func
            .map(data=>{
              exist.push(cloneDay)
              console.log(exist)
              return <div key={data}><img src={data.drawing_url} alt="emoji" className='listemoji'/></div>})}
          {exist.includes(cloneDay)?'':(<div> <Link to='/write' state={{date:day}}>
            <div onMouseEnter={()=>{setAdd(false)}}
              onMouseLeave={()=>{setAdd(true)}}
              onClick={()=>setNewDiary(true)} 
            ><BsPlusCircleFill style={{color:'#c04922'}} className={`hover-close ${add?'hide':''}`} />
            </div>
          </Link></div>)}
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

function Calender({list}){
  const [currentMonth, setCurrentMonth]=useState(new Date());
  const [selectedDate, setSelectedDate]=useState(new Date());
  const {setChoicedDate, exist}=useStore();
  console.log(list)
  console.log(currentMonth.toDateString());
  const prevMonth = () =>{
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const today=new Date();
  const nextMonth = () =>{
    setCurrentMonth(addMonths(currentMonth,1));
  }
  const onDateClick = (day) =>{
    setSelectedDate(day);
    setChoicedDate(day)
  }
  console.log(selectedDate)
  return(
    <div className='listcontainer'>
      <div className='listname'>Diary List</div>
      <div className='calender'>
        <RenderHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth}></RenderHeader>
        <RenderDays></RenderDays>
        <RenderCells currentMonth={currentMonth} today={today} list={list} selectedDate={selectedDate} onDateClick={onDateClick}></RenderCells>
      </div>
    </div>
  )
}

export default Calender;