import React from 'react';
import './DiaryContent.css'
import Manuscript from './Manuscript';
function DiaryContent(){
  return(
    <div className='diviContainer'>
      <div className='dateContainer'>
        <div className='dateline'>
          <p className='datetitle'>DATE</p>
          <p className='date'>23.01.07</p>
          <p className='weather'>weather</p>
        </div>
      </div>
      <div className='titleContainer'>
        <p className='title'>Title: </p>
        <p className='titlecontent'>titlecontent</p>
      </div>
      <div className='canvas'></div>
      <div className='buttonContainer'>
        <button className='modebutton'>그림모드</button>
        <button className='modebutton'>위치조정</button>
        <button className='savebutton'>Save</button>
      </div>
      <div className='content'><Manuscript /></div>
    </div>
  )
}

export default DiaryContent;