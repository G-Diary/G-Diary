import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css';
import api from '../../apis/axios'
import { Button, makeStyles } from '@material-ui/core';
import styled from 'styled-components'

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

function Modals({setIsOpen, selected, setSelected} : any) {
  const navigate = useNavigate();
  const classes = useStyles();
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
  
  function Other() {
    setIsOpen(true);
  }

  function onClick(e : React.MouseEvent ) {
    e.preventDefault();
    // api.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`
    // api.patch(`users/${sessionStorage.getItem('id')}/`, {
    //   cover_image_url: selected
    // }).then(function (res) {
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
    //   console.log(Toast)
    //   Toast.fire({
    //     icon: 'success',
    //     title: '표지 설정 완료!'
    //   })
    // }).catch(function (err) {
    //   console.log(err)
    // })
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
      </Wrap>
    </>
  );
}

export default Modals;