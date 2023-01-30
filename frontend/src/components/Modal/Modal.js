import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './Modal.css';
import api from '../../apis/axios'
import { Button, makeStyles, useMediaQuery } from '@material-ui/core';
import styled from 'styled-components'

Modal.setAppElement('#root');

const CustomStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgb(253, 246, 234)',
    borderRadius: '25px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  '@media screen and (min-width: 1401px), screen and (min-height: 701px)' :{
    content:{
      width: '550px',
      height: '500px'
    }
  },
  '@media screen and (max-width: 1400px), screen and (max-height: 700px)' :{
    content:{
      width: '440px',
      height: '400px',
    }
  }
};

const useStyles = makeStyles(theme => ({
  anotherBtnS:{
    width: '88px',
    height: '24px',
    borderRadius: '25px',
    fontSize: '12px',
    fontWeight: 'bolder',
    customHoverFocus: {
      '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgb(255, 215, 17)' }
    },
  },
  anotherBtnL:{
    width: '110px',
    height: '30px',
    borderRadius: '25px',
    fontSize: '17px',
    fontWeight: 'bolder',
    customHoverFocus: {
      '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgb(255, 215, 17)' }
    },
  },
  startBtnL:{
    width: '100px',
    height: '40px',
    borderRadius: '25px',
    fontSize: '25px',
    fontWeight: 'bolder',
    customHoverFocus: {
      '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgb(255, 215, 17)' }
    },
  },
  startBtnS:{
    width: '80px',
    height: '32px',
    borderRadius: '25px',
    fontSize: '20px',
    fontWeight: 'bolder',
    customHoverFocus: {
      '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgb(255, 215, 17)' }
    },
  },
  selectBtnL:{
    width: '80px',
    height: '32px',
    borderRadius: '25px',
    fontSize: '20px',
    fontWeight: 'bolder',
    customHoverFocus: {
      '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgb(255, 215, 17)' }
    },
  },
  selectBtnS:{
    width: '64px',
    height: '25.6px',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: 'bolder',
    customHoverFocus: {
      '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgb(255, 215, 17)' }
    },
  }
}));


const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    bottom: 20px;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    bottom: 16px;
  }
  `
  

const Nickname = styled.h1`
  display: flex;
  justify-content: center;
  text-align: center;
  position: relative;
  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    margin: 10px;
    bottom: 22px;
    font-size: 55px;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    margin: 8px;
    bottom: 17.6px;
    font-size: 44px;
  }
  `

const SelectBtn = styled.div`
  background-color: rgb(0, 0, 0, 0);
  border-radius: 25px;
  position: relative;

  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    left: 155px;
    bottom: 45px;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    left: 124px;
    bottom: 36px;
  }
  `

const StartBtn = styled.div`
  background-color: rgb(240, 219, 109);
  border-radius: 25px;`
  
const ChoseBtn = styled.div`
  background-color: rgb(240, 219, 109);
  border-radius: 25px;`

const InsideModal = styled.div`
  margin-top: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center;
  align-content: flex-start;
  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    width: 550px;
    height: 420px;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    width: 440px;
    height: 336px;
  }`


const ItemBox = styled.div`
  padding: 0px;
  margin-top: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    width: 550px;
    height: 400px;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    width: 440px;
    height: 320px;
  }
  `


function Modals() {
  const navigate = useNavigate();
  const classes = useStyles();
  const isSmall = useMediaQuery('(max-width: 1400px)');
  const [selected, setSelected] = useState('images/mainLogo.png');
  const [number, setNumber] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const nickname = sessionStorage.getItem('nickname');
  const Swal = require('sweetalert2');
  let subtitle;

  useEffect(() => {
    api.get(`/users/${sessionStorage.getItem('id')}`).then(function (res) {
      setSelected(res.data.cover_image_url)
    }).catch(function (err) {
      console.log(err)
    })
  }, [])
  
  function afterOpenModal() {
    subtitle.style.color = 'black';
  }

  function selectedImg(checked){
    setSelected(checked)
  }

  function Other() {
    setIsOpen(true);
  }

  function Chose() {
    setIsOpen(false);
  }

  function onClick(e) {
    e.preventDefault();
    api.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`
    console.log(sessionStorage.getItem('id'))
    api.patch(`users/${sessionStorage.getItem('id')}/`, {
      cover_image_url: `${selected}`,
      nickname: `${sessionStorage.getItem('nickname')}`
    }).then(function (res) {
      navigate('/list')
      console.log(res)
    }).catch(function (err) {
      console.log(err)
    })
  }

  function Menu({num}) {
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
            variant='outlined' className={isSmall ? classes.anotherBtnS : classes.anotherBtnL} type='button' onClick={Other}>+다른 이미지</Button>
        </SelectBtn>
        <StartBtn>
          <Button
            className={isSmall ? classes.startBtnS : classes.startBtnL} type='button' onClick={onClick}>시작</Button>
        </StartBtn>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={Chose}
          style={CustomStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>이미지</h2>
          <InsideModal>
            <ItemBox>
              <Menu num={1} />
              <Menu num={2} />
              <Menu num={3} />
              <Menu num={4} />
            </ItemBox>
          </InsideModal>
          <ChoseBtn>
            <Button
              className={isSmall ? classes.selectBtnS : classes.selectBtnL} type='button' onClick={Chose}>선택</Button>
          </ChoseBtn>
        </Modal>
      </Wrap>
    </>
  );
}

export default Modals;

















