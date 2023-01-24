import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {Button, Container, TextField} from '@material-ui/core';
import api from '../../apis/axios'

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
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
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

  function passwordValid() {
    var check = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    return check.test(password);
  }

  function isSame() {
    if(confirm === password)
      return true;
    else
      return false;
  }

  function onClick(e) {
    e.preventDefault();
    api.post('/join/', {
      nickname: `${nickname}`,
      email: `${email}`,
      password: `${password}`
    }).then(function(res) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Success SignUp',
        showConfirmButton: false,
        timer: 2000
      })
      navigate('/signin')
    }).catch(function(res) {
      if(res.response.data.email) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${res.response.data.email}`,
          showConfirmButton: false,
          timer: 2000
        })
      } else if(res.response.data.nickname) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${res.response.data.nickname}`,
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }
  
  function Valid() {
    if((nickname ? true : false) & (nickname.length >= 2) & !nicknameValid() & emailValid() & passwordValid() & isSame()){
      return false;
    } else return true;
  }

  return(
    <Wrap>
      <CreateAccountBtn>
        <Button type='button' onClick={onClick} disabled={Valid()}
          style={ !Valid() ? {fontWeight:'bolder', backgroundColor: '#FFD711', borderRadius: '30px', fontSize: '30px'} : { color:'white',fontWeight:'bolder',backgroundColor: '#F8EDB7',borderRadius: '30px', fontSize: '30px'}}>
        Create Account</Button>
      </CreateAccountBtn>
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
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            error={password ? !passwordValid() : passwordValid()}
            helperText={
              password ? (!passwordValid() ? 'Enter at least 8 digits, including numbers and special characters.' : '') : ''
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
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value)
            }}
            error={confirm ? (!confirm ? isSame() : !isSame()) : false}
            helperText={
              confirm ? (!isSame() ? 'Check your password again.' : '') : ''
            }
          />
        </Container>
      </TypeSignUp>
    </Wrap>
  );
}

export default SignUpForm;