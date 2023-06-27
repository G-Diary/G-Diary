import React, {useState} from 'react';
import './Calender.css';
import { BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill, BsPlusCircleFill } from 'react-icons/bs';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays} from 'date-fns';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/store';
import api from '../../apis/axios';

//(date-fns 이용: 날짜 관련 함수 총 집합 라이브러리)
//header 컴포넌트(월 이동)

interface RenderHeaderProps{
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
}

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }:RenderHeaderProps) => {
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

interface RenderCellsProps {
  currentMonth: any;
  today: Date;
  list: any[];
  exist: any[];
  selectedDate: Date;
  onDateClick: (cloneDay:Date) => void;
}

//Body(Cells) 컴포넌트(날짜(일))
const RenderCells = ({currentMonth, today, list, exist, selectedDate, onDateClick}:RenderCellsProps)=>{
  const monthStart=startOfMonth(currentMonth);
  const monthEnd=endOfMonth(monthStart);
  const startDate=startOfWeek(monthStart);
  const endDate=endOfWeek(monthEnd);
  const [add, setAdd]=useState<boolean>(true);  //일기 추가 상태
  const {setChoicedDate}=useStore();  //페이지 이동 시 선택 날짜 초기화
  const rows:any=[];
  let days:any=[];
  let day:any=startDate;
  let formattedDate:string = '';

  const pageMove = () =>{
    setChoicedDate(new Date());
  }

  while(day<=endDate){
    for (let i=0; i<7; i++){
      formattedDate=format(day, 'd');
      const cloneDay:Date=day;
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
            {list.filter(x=>new Date(x.diary_date).toDateString()===cloneDay.toDateString())
            // eslint-disable-next-line no-loop-func
              .map((data,index)=>{
                return <span key={index} className="listemoji">{data.emoji}
                </span>})
            }
          </span>
          {exist.includes(format(cloneDay, 'yyyy-MM-dd'))?'':(<div> <Link to='/write' state={{date:day}}>
            <div onMouseEnter={()=>{setAdd(false)}}
              onMouseLeave={()=>{setAdd(true)}}
              onClick={pageMove} 
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

interface CalenderProps{
  list: any[];
  exist: any[];
  getId: any;
}

function Calender({list, exist, getId}:CalenderProps){
  const [currentMonth, setCurrentMonth]=useState<Date>(new Date());
  const {choiceDate, setChoicedDate}=useStore();
  const [selectedDate, setSelectedDate]=useState<Date>(choiceDate);
  const prevMonth = () =>{
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const today=new Date();
  const nextMonth = () =>{
    setCurrentMonth(addMonths(currentMonth,1));
  }
  const onDateClick = (day:any) =>{
    setSelectedDate(day);
    setChoicedDate(day);
    api.get('diaries/').then((res) => {
      getId(res.data.filter((date:any) => date.diary_date === format(day, 'yyyy-MM-dd'))[0].id)
    }).catch((err) => {
      console.log(err)
    })
  }
  return(
    <div className='listcontainer'>
      <div className='listname'>일기 리스트</div>
      <div className='calender'>
        <RenderHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth}></RenderHeader>
        <RenderDays/>
        <RenderCells currentMonth={currentMonth} today={today} list={list} exist={exist} selectedDate={selectedDate} onDateClick={onDateClick}></RenderCells>
      </div>
    </div>
  )
}

export default Calender;
