import React, {useState} from 'react';
import styled from 'styled-components'
import {Button, Container, TextField} from '@material-ui/core';
import api from '../../apis/axios';

const TypeSignUp = styled.div`
position: relative;
bottom:60px;`

const CreateAccountBtn = styled.div`
position: relative;
top:360px;`

const CheckDuplicate = styled.div`
  float:right;
  margin-top:8px;`

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;`

function SignUpForm() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [cf, setCf] = useState('');
  const [isNameDup, setIsNameDup] = useState(true);
  const [isEmailDup, setIsEmailDup] = useState(true);
  const Swal = require('sweetalert2');

  function nameInput(e) {
    setNickname(e.target.value)
    if(nickname.length > 10) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Please write in less than 10 letters.',
        showConfirmButton: false,
        timer: 2000
      })
      setNickname(name => name.substring(0, 10))
    }
  }

  function nicknameValid() {
    var check = /[~!@#$%^&*()+|<>?:{}ㄱ-ㅎㅏ-ㅣ]/;
    return check.test(nickname);
  }

  function emailValid() {
    var check = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return check.test(email);
  }

  function pwValid() {
    var check = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    return check.test(pw);
  }

  function Same() {
    if(cf === pw)
      return true;
    else
      return false;
  }

  function onSubmit() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Success SignUp',
      showConfirmButton: false,
      timer: 2000
    })
  }
  
  async function onClick(e) {
    e.preventDefault();
    await api.post('/join', {
      nickname: `${nickname}`,
      email: `${email}`
    }).then(function(res) {
      console.log(res.data)
      if(!res.data.nickname) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Exist nickname',
          showConfirmButton: false,
          timer: 2000
        })  
      } else if(!res.data.email) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Exist email',
          showConfirmButton: false,
          timer: 2000
        })  
      } else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 2000
        })  
      }
    }).catch()
   
  }

  function Valid() {
    if((nickname ? true : false) & (nickname.length >= 2) & !nicknameValid() & emailValid() & pwValid() & Same()){
      return false;
    } else return true;
  }

  return(
    <Wrap>
      <CreateAccountBtn>
        <Button form='sub' type='submit' disabled={Valid()}
          style={ !Valid() ? {fontWeight:'bolder', backgroundColor: '#FFD711', borderRadius: '30px', fontSize: '30px'} : { color:'white',fontWeight:'bolder',backgroundColor: '#F8EDB7',borderRadius: '30px', fontSize: '30px'}}>
        Create Account</Button>
      </CreateAccountBtn>
      <form id="sub" action='/signin' onSubmit={onSubmit}>
        <TypeSignUp>
          <Container maxWidth='sm'>
            <TextField
              margin="dense"   
              fullWidth
              variant="filled"
              required
              label="Nickname"
              name="Nickname"
              autoComplete="freeSolo"
              autoFocus
              value={nickname}
              onChange={nameInput}
              error={nicknameValid()}
              helperText={
                nicknameValid() ? 'Special characters are not allowed.' : ''
              }
            />
            <CheckDuplicate>
            </CheckDuplicate>
            <TextField
              margin="dense"
              fullWidth
              variant="filled"
              required
              label="Email"
              name="email"
              autoComplete="email"
              type='text'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              error={email ? !emailValid() : emailValid()}
              helperText={
                email ? (!emailValid() ? 'Enter it in e-mail format.' : '') : ''
              }
            />
            <TextField
              margin="dense"
              fullWidth
              variant="filled"
              required
              type="password"
              label="Password"
              name="Password"
              autoComplete="new-password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value)
              }}
              error={pw ? !pwValid() : pwValid()}
              helperText={
                pw ? (!pwValid() ? 'Enter at least 8 digits, including numbers and special characters.' : '') : ''
              }
            />    
            <TextField
              margin="dense"
              fullWidth
              variant="filled"
              required
              type="password"
              label="Confirm"
              name="Confirm"
              autoComplete="new-password"
              value={cf}
              onChange={(e) => {
                setCf(e.target.value)
              }}
              error={cf ? (!cf ? Same() : !Same()) : false}
              helperText={
                cf ? (!Same() ? 'Check your password again.' : '') : ''
              }
            />
            <Button type='button' onClick={onClick} style={{
              float: 'right',
              backgroundColor:'#FFD711',
              fontWeight: 'bolder'
            }}>✔︎</Button>
          </Container>
        </TypeSignUp>
      </form>
    </Wrap>
  );
}

export default SignUpForm;