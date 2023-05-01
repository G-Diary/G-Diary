import React, { useEffect, useState, useRef, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './Modal.css';
import api from '../../apis/axios'
import { Button, makeStyles } from '@material-ui/core';
import styled from 'styled-components'

Modal.setAppElement('#root');

const CustomStyles : ReactModal.Styles= {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '550px',
    height: '500px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgb(253, 246, 234)',
    borderRadius: '25px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
};

const useStyles = makeStyles(theme => ({
  customHoverFocus: {
    '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgb(255, 215, 17)' }
  }
}));

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 20px;`

const Nickname = styled.h1`
  display: flex;
  justify-content: center;
  text-align: center;
  position: relative;
  margin: 10px;
  bottom: 22px;
  font-size: 55px;`

const SelectBtn = styled.div`
  background-color: rgb(0, 0, 0, 0);
  border-radius: 25px;
  position: relative;
  left: 155px;
  bottom: 45px;
  `

const StartBtn = styled.div`
  background-color: rgb(240, 219, 109);
  border-radius: 25px;`
  
const ChoseBtn = styled.div`
  background-color: rgb(240, 219, 109);
  border-radius: 25px;`

const InsideModal = styled.div`
  margin-top: 0;
  width: 550px;
  height: 420px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center;
  align-content: flex-start;`

const ItemBox = styled.div`
  padding: 0px;
  margin-top: 0;
  width: 550px;
  height: 400px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;`

function Modals() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [selected, setSelected] = useState<string>('images/mainLogo.png');
  const [number, setNumber] = useState<number>();
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [imgFile, setImgFile]=useState<string>('');
  const nickname = sessionStorage.getItem('nickname');
  const Swal = require('sweetalert2');
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })
  
  useEffect(() => {
    api.get(`/users/${sessionStorage.getItem('id')}`).then(function (res) {
      setSelected(res.data.cover_image_url)
    }).catch(function (err) {
      console.log(err)
    })
  }, [])
  
  function selectedImg(checked : string){
    setSelected(checked)
  }
  
  function Other() {
    setIsOpen(true);
  }
  
  function Chose() {
    setIsOpen(false);
  }
  const imgRef = useRef<HTMLInputElement | null>(null);

  const addFile = ()=>{
    const imgFile = imgRef.current;
    const file=imgFile.files[0];
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend=()=>{
      setImgFile(reader.result as SetStateAction<string>);
      setSelected(reader.result as SetStateAction<string>);
      setNumber(5);
    }
    console.log(imgFile);
  }

  function onClick(e : React.MouseEvent ) {
    e.preventDefault();
    api.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`
    api.patch(`users/${sessionStorage.getItem('id')}/`, {
      cover_image_url: selected
    }).then(function (res) {
      let flip : Element | null= document.querySelector('.flip');
      let slide : Element | null = document.querySelector('.slide');
      slide.classList.add('move')
      setTimeout(() => {
        flip.classList.add('open');
        flip.classList.toggle('color')
        setTimeout(() => {
          navigate('/list');
        }, 400)
      }, 800);
      console.log(Toast)
      Toast.fire({
        icon: 'success',
        title: '표지 설정 완료!'
      })
    }).catch(function (err) {
      console.log(err)
    })
  }

  function Menu({num} : {num : number}) {
    return (
      <>
        <input name='c' type='radio' id={`C${num}`} checked={number === num} onChange={function () { selectedImg(`images/C${num}.png`); setNumber(num)}}/>
        <label htmlFor={`C${num}`}>
          {number === num ? (<img src={`images/C${num}.png`} alt='image1' className='item2' />):(<img src={`images/C${num}.png`} alt='image1' className='item' />)} 
        </label>
      </>
    )
  }

  return (
    <>
      <Nickname>{nickname}'s<br/>일기장</Nickname>
      <Wrap>
        <div className='Img'>
          <img style={{objectFit:'cover'}} alt='star' src={!!selected ? `${selected}` : 'images/mainLogo.png'} />
        </div>
        <SelectBtn>
          <Button
            variant='outlined' className={classes.customHoverFocus} type='button' onClick={Other} style={{
              width: '110px',
              height: '30px',
              borderRadius: '25px',
              fontSize: '17px',
              fontWeight: 'bolder'
            }}>+다른 이미지</Button>
        </SelectBtn>
        <StartBtn>
          <Button
            className={classes.customHoverFocus} type='button' onClick={(e)=>onClick(e)} style={{
              width: '100px',
              height: '40px',
              borderRadius: '25px',
              fontSize: '25px',
              fontWeight: 'bolder'
            }}>시작</Button>
        </StartBtn>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={Chose}
          style={CustomStyles}
          contentLabel="Example Modal"
        >
          <h2 style={{color: 'black'}}>이미지</h2>
          <InsideModal>
            <ItemBox>
              <Menu num={1} />
              <Menu num={2} />
              <Menu num={3} />
              <Menu num={4} />
            </ItemBox>
          </InsideModal>
          <div style={{width: '70%',display:'flex', justifyContent:'end', alignItems:'center'}}>
            <ChoseBtn>
              <Button
                className={classes.customHoverFocus} type='button' onClick={Chose} style={{
                  width: '80px',
                  height: '32px',
                  borderRadius: '25px',
                  fontSize: '20px',
                  fontWeight: 'bolder'
                }}>선택</Button>
            </ChoseBtn>
            <div style={{width: '25%',marginLeft: '4rem'}}>
              <input name='c' type='radio' id="C5" checked={number === 5} />
              <label htmlFor="C5">
                <label style={number!==5 ? {padding:'6px 25px', backgroundColor:'orange', borderRadius:'4px',color:'white',cursor:'pointer'}:{padding:'6px 25px', backgroundColor:'orange', borderRadius:'4px',color:'white',cursor:'pointer', border: '3px solid black'}} htmlFor="input-file">
                업로드
                </label>
                <input type="file" id="input-file" accept="image/png, image/jpeg" style={{display:'none'}} onChange={addFile} ref={imgRef} /> 
              </label>
            </div>
          </div>
        </Modal>
      </Wrap>
    </>
  );
}

export default Modals;