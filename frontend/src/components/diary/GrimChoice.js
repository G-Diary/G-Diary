import React from 'react';
import styled from 'styled-components';
import { useStore } from '../../store/store';
function GrimChoice(){
  const {currentCanvas,setChoiceImg}=useStore();
  const addImage = (srcImg) => {
    const newimage = new Image();
    newimage.src=srcImg.src;
    console.log(newimage);
    newimage.crossOrigin = 'Anonymous';
<<<<<<< refs/remotes/origin/develop
    newimage.onload = function () {
      currentCanvas.drawImage(newimage, 160, 100, 200,200);
    };
=======
    // newimage.onload = function () {
    //   currentCanvas.drawImage(newimage, 0, 0, srcImg.width, srcImg.height);
    // };
    setChoiceImg(
      {
        id:srcImg.alt,
        img: newimage.src,
        x:0,
        y:0,
        width: srcImg.width,
        height: srcImg.height,
      })
>>>>>>> feat: 그림판 기능(이동및 크기조절)
  };
  // srcImg.width
  // srcImg.height

  const onChange = (e) => {
    e.preventDefault();
    addImage(e.target);
  };
  
  return(
    <ChoiceContainer>
      <Choicetitle>
        What would you draw?
      </Choicetitle>
      <Choice>
        <ChoiceGrim id="image" src="images/car.JPG"
          alt="fish" onClick={onChange}/>
      </Choice>
      <ChoiceButtonContainer>
        <Choicebutton>Photo</Choicebutton>
      </ChoiceButtonContainer>
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
    font-size: 33px;
    font-family:Comic Sans MS;
`

const Choice = styled.div`
    width: 500px;   
    height: 520px;
    background:#B5B5B5;
    border-radius: 10px;
`

const ChoiceGrim = styled.img`
    width: 100px;
    height: 100px;
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
    font-family:Comic Sans MS;
    &:hover{
        box-shadow: 0 0 40px 40px #404040 inset;
        color: white;
        border:none;
    }
`