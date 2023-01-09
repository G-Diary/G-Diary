import React, {useState} from 'react';
import styled from 'styled-components'
import {Button, Container, TextField} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Person } from '@mui/icons-material';

const TypeSignUp = styled.div`
  position: relative;
  right: 330px;
  bottom: 240px;`

const CreateAccountBtn = styled.div`
  position: relative;
  bottom: 124px;
  right: 185px;`

function SignUpForm() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [cf, setCf] = useState('');

  function nameInput(e) {
    setName(e.target.value)
  }

  function idInput(e) {
    setId(e.target.value)
  }

  function pwInput(e) {
    setPw(e.target.value)
  }

  function cfInput(e) {
    setCf(e.target.value)
  }
  
  function nameValid() {
    var check = /[~!@#$%^&*()-=_+{}|,./<>?;':"]/;
    return check.test(name);
  }

  function idValid() {
    var check = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return check.test(id);
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

  return(
    <Container>
      <div className='icon'>
        <Person style={{
          fontSize:'50px', 
          backgroundColor: 'lightgray', 
          borderRadius: '50px'
        }}/>
      </div>
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
            value={name}
            onChange={nameInput}
            error={nameValid()}
            helperText={
              (nameValid() ? '특수문자나 기호는 쓸 수 없습니다.' : '')
            }
          />
          <TextField
            margin="dense"
            fullWidth
            variant="filled"
            required
            label="ID"
            name="ID"
            autoComplete="email"
            type='text'
            value={id}
            onChange={idInput}
            error={id ? !idValid() : idValid()}
            helperText={
              id ? (!idValid() ? '이메일 형식으로 입력해주세요.' : '') : ''
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
            onChange={pwInput}
            error={pw ? !pwValid() : pwValid()}
            helperText={
              pw ? (!pwValid() ? '숫자, 영문자, 특수문자 포함 8자리 이상 입력해주세요.' : '') : ''
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
            onChange={cfInput}
            error={cf ? (!cf ? Same() : !Same()) : ''}
            helperText={
              cf ? (!Same() ? '비밀번호를 확인해주세요.' : '') : ''
            }
          />
        </Container>
      </TypeSignUp>
      <CreateAccountBtn>
        <Button type='submit' style={{
          backgroundColor: '#535353', 
          borderRadius: '30px', 
          fontSize: '30px'
        }}>
          <Link to='/SignIn' style={{
            color: 'white', 
            textDecorationLine: 'none', 
            fontWeight: 'bold'
          }}>Create Account</Link>
        </Button>
      </CreateAccountBtn>
    </Container>
  );
}

export default SignUpForm;