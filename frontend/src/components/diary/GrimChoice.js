import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useStore } from '../../store/store';


// AI로부터 받아온 그림들 중 원하는 그림 선택
function GrimChoice(){
  const {setChoiceImg, getGrimList}=useStore();
  const keyword = Object.keys(getGrimList);
  const grim = Object.values(getGrimList);
  console.log(getGrimList)
  console.log(keyword);
  console.log(grim)
  const [grimlist, setGrimList]=useState();
  const img=[];
  useEffect(()=>{
    console.log('메렁')
    setGrimList(grim[1]);
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[getGrimList])
  // console.log(grimlist)

  if(grimlist!=undefined){
    console.log('있는디')
    console.log(grimlist[0].image_url)
    grimlist.map((i,index)=>(
      img.push(grimlist[index].image_url)
    ))
  }
  console.log(getGrimList)
  console.log(img)
  // console.log(keyword)
  // console.log(grim[1][0])
  // const img = []
  // for (let i = 0; i < grim[1].length; i++) {
  //   img.push(grim[1][i].image_url)
  // }
  // console.log(img)
  // const grim = Object.values(getGrimList);
  // const [grimlist, setGrimList] = useState();
  // const [btn, setBtn] = useState();
  // console.log(Object.keys(getGrimList))
  // const img = [];
  // useEffect(() => {
  //   // console.log(keyword)
  //   console.log(typeof (Object.values(getGrimList)[1]))
    
  //   setKeyword(Object.values(getGrimList)[1])
  //   const result = Object.values(keyword)
  //   // console.log(result[0].image_url)
    
  //   result && result.map((i) => (
  //     img.push(result[i].image_url)
  //   ))
  
  //   // console.log(keyword)
  // }, [getGrimList])
  // console.log(img)
  // console.log(Object.values(keyword[0])[0])
  
  // useEffect(()=>{
  //   setBtn(keyword[0]);
  //   setGrimList(grim[0]);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[getGrimList])

  // //선택한 키워드에 맞는 그림 보여주기
  // const onSelect = (i)=>{
  //   setGrimList(grim[i]);
  //   setBtn(keyword[i]);  //선택한 키워드 색변경
  // }

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
      {/* <Keywords>
        {keyword && keyword.map((x,index)=>(
          <Keyword key={index} id={x} onClick={()=>onSelect(index)}>{btn===x?<div style={{color:'red'}}>{x}</div>:<div>{x}</div>}</Keyword>
        ))}
      </Keywords> */}
      <Choice>
        {
          img && img.map((data,index)=>
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