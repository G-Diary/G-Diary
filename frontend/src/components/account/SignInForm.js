import React,{ useState }  from 'react';
import styled from 'styled-components';
import {Button, Container, TextField} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { LockOutlined } from '@mui/icons-material';

const TypeSignIn = styled.div`
  position: relative;
  bottom: 296px;
  right: 245px;`

const SignInBtn = styled.div`
  position: relative;
  top: 107px;
  right: 98px;`

const SignUpBtn = styled.div`
  position: relative;
  bottom: 95px;
  left: 32px;`

function SignInForm() {
  const [id, setId] = useState('');
  const [pw,setPw] = useState('');

  function idValid() {
    var check = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return check.test(id);
  }

  function Valid() {
    if(idValid() === true) {
      return false;
    } else return true;
  }

  return(
    <Container>
      <div className='icon'>
        <LockOutlined style={{
          fontSize:'50px', 
          backgroundColor: '#F0DB6D',
          borderRadius: '50px'
        }}/>
      </div>
      <SignInBtn>
        <Button disabled={Valid()} 
          style={ Valid() ? { backgroundColor: '#EEE6BE',borderRadius: '30px', fontSize: '30px'} : { backgroundColor: '#F0DB6D', borderRadius: '30px', fontSize: '30px'}}>
          <Link to='/signin' style={{
            color: 'white', 
            textDecorationLine: 'none', 
            fontWeight: 'bold'
          }}>Sign In</Link>
        </Button>
      </SignInBtn>
      <SignUpBtn>
        <Button style={{
          border: 'solid 2px lightgray', 
          borderRadius: '30px', 
          fontSize: '20px'
        }}>
          <Link to='/signup' style={{
            color: 'black', 
            textDecorationLine: 'none'
          }}>Sign Up→</Link>
        </Button>
      </SignUpBtn>
      <TypeSignIn>
        <Container maxWidth='sm'>
          <TextField
            margin='dense'
            fullWidth
            variant="filled"
            required
            label="ID"
            name="ID"
            autoComplete="email"
            autoFocus
            type='text'
            value={id}
            onChange={(e) => {
              setId(e.target.value)
            }}
            error={id ? !idValid() : idValid()}
            helperText={
              id ? (!idValid() ? '이메일 형식으로 입력해 주세요.' : '') : ''
            }
          />
          <TextField
            margin='dense'
            fullWidth
            variant="filled"
            required
            type="password"
            label="Password"
            name="Password"
            autoComplete="current-password"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value)
            }}
          />
        </Container>
      </TypeSignIn>
    </Container>
  );
}

export default SignInForm;