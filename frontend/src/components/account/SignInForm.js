import React,{ useState }  from 'react';
import styled from 'styled-components';
import {Button, Container, TextField, makeStyles} from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../apis/axios'

const useStyles = makeStyles(theme => ({
  customHoverFocus: {
    '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgb(255, 215, 17)' }
  }
}));

const TypeSignIn = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const SignInBtn = styled.div`
background-color: rgb(240, 219, 109);
border-radius: 30px;
position: relative;
top:365px;`

const SignUpBtn = styled.div`
position: relative;
top: 8px;
right: 25px;
align-self:flex-end;`

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;`

function SignInForm() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const JWT_EXPIRY_TIME = 3600 * 1000 // 만료시간 1시간 (밀리초로 표현)
  const Swal = require('sweetalert2');
  let count = 0;

  function emailValid() {
    var check = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return check.test(email);
  }

  function Valid() {
    if(emailValid() && password) {
      return false;
    } else return true;
  }

  function onSilentRefresh() {
    api.post('auth/refresh', {
      refresh: sessionStorage.getItem('refresh')
    }).then(onLogin).catch(function (err) {
      console.log(err)
    })
  }

  function onLoginSuccess(res) {
    if (count === 0) {  
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '로그인 성공!',
        showConfirmButton: false,
        timer: 2000
      })
      count++;
    }
    const access = res.data.token.access;
    const refresh = res.data.token.refresh;
    api.defaults.headers.common['Authorization'] = `Bearer ${access}`
    sessionStorage.setItem('token', access);
    sessionStorage.setItem('refresh', refresh);
    sessionStorage.setItem('nickname', `${res.data.user.nickname}`)
    sessionStorage.setItem('id', `${res.data.user.id}`)
    setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
    navigate('/main')
    console.log(api.defaults.headers.common)
    console.log(access)
    console.log(refresh)
  }

  function onLogin(e) {
    api.post('auth', {
      email: `${email}`,
      password: `${password}`
    }).then(onLoginSuccess).catch(function (res) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '아이디 혹은 비밀번호를 다시 확인해주세요.',
        showConfirmButton: false,
        timer: 2000
      })
      console.log(res)
    })
  }
  return(
    <Wrap>
      <SignInBtn>
        <Button className={classes.customHoverFocus} type='button' onClick={onLogin} disabled={Valid()} 
          style={Valid() ? {color: 'white', fontWeight: 'bolder', backgroundColor: '#F8EDB7',borderRadius: '30px', fontSize: '30px', width: '120px' } : { fontWeight: 'bolder', borderRadius: '30px', fontSize: '30px', width: '120px'}}>
        로그인</Button>
      </SignInBtn>
      <TypeSignIn>
        <Container maxWidth='sm'>
          <TextField
            margin='dense'
            fullWidth
            variant="filled"
            required
            label="이메일"
            name="email"
            autoComplete="email"
            autoFocus
            type='text'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            error={email ? !emailValid() : emailValid()}
            helperText={
              email ? (!emailValid() ? '이메일 형식으로 입력해 주세요.' : '') : ''
            }
          />
          <TextField
            margin='dense'
            fullWidth
            variant="filled"
            required
            type="password"
            label="비밀번호"
            name="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </Container>
      </TypeSignIn>
      <SignUpBtn>
        <Button style={{
          border: 'solid 2px lightgray', 
          borderRadius: '30px', 
          fontWeight: 'bolder',
          fontSize: '20px'
        }}>
          <Link to='/signup' style={{
            color: 'black', 
            textDecorationLine: 'none'
          }}>회원가입→</Link>
        </Button>
      </SignUpBtn>
    </Wrap>
  );
}

export default SignInForm;