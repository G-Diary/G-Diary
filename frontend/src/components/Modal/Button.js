import React from 'react';
import './Modal.css'
import { useState } from 'react';
// import Modal from './Modal'
import { useStore } from '../../store/store';

function DivBtn ({order, image, id}){
  const [img, setImg] = useState('');
  const {setChoiceImg} = useStore();
  const {selected, setSelected} = useState(false);


  const onClick = (img) => {
    setImg(img)
    setChoiceImg(img)
  }


  console.log(img)
  console.log(image)
  return(
    // < className={order} onClick={onClick}>
    // <img src={image} alt='image1' className={order} onClick={(e)=>{onClick(e.target.src)}}/>
    <>
      <input type='radio' value={id} id={id}/>
      <label htmlFor={id}>
        <img src={image} alt='image1' className={order} onClick={(e)=>{onClick(e.target.src)}}/>
      </label>
    </>
    // </div>
  )
}

export default DivBtn;  





// const image = document.querySelector('.order.background-image')
// // const image = document.getElementsByClassName(order.backgroundImage)
// // const disImage = document.querySelector('.imgDisplay.background-image');
// const disImage = document.getElementsByClassName(imgDisplay.backgroundImage
// setImg(res=>{res=image})
// console.log(img)
// console.log(image)
// console.log(disImage)





// const orderCss = document.getElementsByClassName(order);
// // const orderCss = document.querySelector(order);
// // const displayCss= document.getElementsByClassName('imgDisplay');
// const displayCss = document.querySelector('.imgDisplay');
// const [image, setImage] = useState('');
// const onClick =()=>{
//   setImage(orderCss.backgroundimage)
//   console.log(orderCss.backgroundimage)
// }
// const onChange =()=>{
//   onClick();
//   displayCss.backgroundImage = {image}
// }