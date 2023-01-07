import React from 'react';
import './GrimChoice.css'

function GrimChoice(){
  return(
    <div className='choiceContainer'>
      <div className='choicetitle'>
        그림 혹은 사진 선택
      </div>
      <div className='choice'></div>
      <div className='choiceButtonContainer'>
        <button className='choicebutton'>그림</button>
        <button className='choicebutton'>사진</button>
      </div>
    </div>)
}

export default GrimChoice;