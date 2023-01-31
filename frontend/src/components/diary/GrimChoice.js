import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useStore } from '../../store/store';


// AI로부터 받아온 그림들 중 원하는 그림 선택
function GrimChoice(){
  const {setChoiceImg, getGrimList}=useStore();
  const keyword = Object.keys(getGrimList);
  const grim = Object.values(getGrimList);
  const [grimlist, setGrimList] = useState();
  const [btn, setBtn] = useState();
 
  useEffect(()=>{
    setBtn(keyword[0]);
    setGrimList(grim[0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[getGrimList])

  //선택한 키워드에 맞는 그림 보여주기
  const onSelect = (i)=>{
    setGrimList(grim[i]);
    setBtn(keyword[i]);  //선택한 키워드 색변경
  }

  const addImage = (srcImg) => {
    const newimage = new Image();
    newimage.src=srcImg.src;
    newimage.crossOrigin = 'Anonymous';
    setChoiceImg( {
      id:srcImg.alt,
      img: newimage.src,
      x:0,
      y:0,
      width: srcImg.width,
      height: srcImg.height,
    }
    )
  };
  const onChange = (e) => {
    e.preventDefault();
    addImage(e.target);
  };


  
  return(
    <ChoiceContainer>
      <Choicetitle>
        GD가 분석해본 그림이에요!
      </Choicetitle>
      <Keywords>
        {keyword && keyword.map((x,index)=>(
          <Keyword key={index} id={x} onClick={()=>onSelect(index)}>{btn===x?<div style={{color:'red'}}>{x}</div>:<div>{x}</div>}</Keyword>
        ))}
      </Keywords>
      <Choice>
        {
          grimlist && grimlist.map((data,index)=>
            (
              <ChoiceGrim key={index} id="image" src={data}
                alt="grim" onClick={onChange}/>
            ))
        }
      </Choice>
    </ChoiceContainer>)
}

export default GrimChoice;

const ChoiceContainer = styled.div`
    position: absolute;  
    width: 600px;
    height: 750px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 90;

`

const Choicetitle =styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 80px;
    font-size: 40px;
    font-family:KyoboHand;
    font-weight: bolder;
`
const Keywords = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
`
const Keyword = styled.div`
  width: auto;
  height: 2rem;
  border: 2px double black;
  background: ivory;
  text-align: center;
  font-size: 1.5rem;
  line-height: 150%;
  padding: 4px;
  border-bottom-style: none;
`

const Choice = styled.div`
    width: 500px;   
    height: 520px;
    background:white;
    border-radius: 10px;
    border: 2px dotted grey;
    overflow: auto;
`

const ChoiceGrim = styled.img`
    width: 95px;
    height: 95px;
    object-fit:cover;
    margin: 2rem;
`

export const ChoiceButtonContainer = styled.div`
    width: 500px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: end;
`

export const Choicebutton = styled.button`
    width: 90px;
    height: 35px;
    background-color: transparent;
    color: black;
    border: 2px solid black;
    border-radius: 20px;
    text-align: center;
    font-size: 17px;
    margin-left: 1.5%;
    transition: box-shadow 250ms ease-in-out, color 200ms ease-in-out;
    font-family:KyoboHand;
    font-weight: bolder;
    &:hover{
        box-shadow: 0 0 40px 40px #404040 inset;
        color: white;
        border:none;
    }
`