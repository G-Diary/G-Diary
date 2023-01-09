import React,{ useState }  from 'react';
import styled from 'styled-components';
import {Button, Container, TextField} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { LockOutlined } from '@mui/icons-material';

const TypeSignIn = styled.div`
  position: relative;
  bottom: 180px;
  right: 210px;`

const SignInBtn = styled.div`
  position: relative;
  bottom: 55px;
  right: 63px;`

const SignUpBtn = styled.div`
  position: relative;
  bottom: 158px;
  left: 67px;`

function SignInForm() {
  const [id, setId] = useState('');

  function onChange(e) {
    setId(e.target.value)
  }



  return(
    <Container>
      <div className='icon'>
        <LockOutlined style={{
          fontSize:'50px', 
          backgroundColor: 'lightgray', 
          borderRadius: '50px'
        }}/>
      </div>
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
          />
        </Container>
      </TypeSignIn>
      <SignUpBtn>
        <Button style={{
          border: 'solid 2px lightgray', 
          borderRadius: '30px', 
          fontSize: '20px'
        }}>
          <Link to='signUp' style={{
            color: 'black', 
            textDecorationLine: 'none'
          }}>Sign Up→</Link>
        </Button>
      </SignUpBtn>
      <SignInBtn>
        <Button type='submit' style={{
          backgroundColor: '#535353', 
          borderRadius: '30px', 
          fontSize: '30px'
        }}>
          <Link to='/signUp' style={{
            color: 'white', 
            textDecorationLine: 'none', 
            fontWeight: 'bold'
          }}>Sign In</Link>
        </Button>
      </SignInBtn>
    </Container>
  );
}

export default SignInForm;