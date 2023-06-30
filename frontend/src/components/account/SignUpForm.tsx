import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Container, TextField, makeStyles } from '@material-ui/core';
import api from '../../apis/axios';

const useStyles = makeStyles((theme) => ({
  customHoverFocus: {
    '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgb(255, 215, 17)' },
  },
}));

const BackBtn = styled.div`
  display: flex;
  flex-direction: row-reverse;
  position: relative;
  top: 6px;
`;

const TypeSignUp = styled.div`
  position: relative;
  bottom: 60px;
`;

const CreateAccountBtn = styled.div`
  background-color: rgb(240, 219, 109);
  border-radius: 30px;
  position: relative;
  top: 365px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function SignUpForm() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [nickname, setNickname] = useState <string>('');
  const [email, setEmail] = useState < string > ('');
  const [password, setPassword] = useState < string > ('');
  const [confirm, setConfirm] = useState < string > ('');
  const Swal = require('sweetalert2');

  function nameInput(e: React.ChangeEvent<HTMLInputElement>) {
    setNickname(e.target.value);
    if (nickname.length > 10) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '10글자 이하로 작성해 주세요.',
        showConfirmButton: false,
        timer: 2000,
      });
      setNickname((name) => name.substring(0, 10));
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
    if (confirm === password) return true;
    else return false;
  }

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    api
      .post('join', {
        nickname: `${nickname}`,
        email: `${email}`,
        password: `${password}`,
      })
      .then(function (res) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '회원가입 성공!',
          showConfirmButton: false,
          timer: 2000,
        });
        navigate('/signin');
      })
      .catch(function (res) {
        if (res.response.data.email) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${res.response.data.email}`,
            showConfirmButton: false,
            timer: 2000,
          });
        } else if (res.response.data.nickname) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${res.response.data.nickname}`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  }

  function Valid() {
    if ((nickname ? true : false) && nickname.length >= 2 && !nicknameValid() && emailValid() && passwordValid() && isSame()) {
      return false;
    } else return true;
  }

  const btnStyle = {
    fontWeight: 'bolder',
    borderRadius: '30px',
    fontSize: '30px',
    color: !Valid() ? '' : 'white',
    backgroundColor: !Valid() ? '' : '#F8EDB7',
  };

  return (
    <Wrap>
      <CreateAccountBtn>
        <Button className={classes.customHoverFocus} type='button' onClick={(e) => onClick(e)} disabled={Valid()} style={btnStyle}>
          계정 생성
        </Button>
      </CreateAccountBtn>
      <TypeSignUp>
        <Container maxWidth='sm'>
          <TextField
            margin='dense'
            fullWidth
            variant='filled'
            required
            label='닉네임'
            name='Nickname'
            autoComplete='freeSolo'
            autoFocus
            value={nickname}
            onChange={nameInput}
            error={nicknameValid()}
            helperText={nicknameValid() ? '특수문자 혹은 모음, 자음은 사용하실 수 없습니다.' : ''}
          />
          <TextField
            margin='dense'
            fullWidth
            variant='filled'
            required
            label='이메일'
            name='email'
            autoComplete='email'
            type='text'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            error={email ? !emailValid() : emailValid()}
            helperText={email ? (!emailValid() ? '이메일 형식으로 입력해 주세요.' : '') : ''}
          />
          <TextField
            margin='dense'
            fullWidth
            variant='filled'
            required
            type='password'
            label='비밀번호'
            name='Password'
            autoComplete='new-password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            error={password ? !passwordValid() : passwordValid()}
            helperText={password ? (!passwordValid() ? '숫자, 특수문자를 포함하여 8글자 이상 입력해 주세요.' : '') : ''}
          />
          <TextField
            margin='dense'
            fullWidth
            variant='filled'
            required
            type='password'
            label='비밀번호 확인'
            name='Confirm'
            autoComplete='new-password'
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
            }}
            error={confirm ? (!confirm ? isSame() : !isSame()) : false}
            helperText={confirm ? (!isSame() ? '비밀번호를 다시 확인해 주세요.' : '') : ''}
          />
          <BackBtn>
            <Button
              style={{
                border: 'solid 2px lightgray',
                borderRadius: '30px',
                fontWeight: 'bolder',
                fontSize: '20px',
              }}
            >
              <Link
                to='/signin'
                style={{
                  color: 'black',
                  textDecorationLine: 'none',
                }}
              >
                돌아가기
              </Link>
            </Button>
          </BackBtn>
        </Container>
      </TypeSignUp>
    </Wrap>
  );
}

export default SignUpForm;
