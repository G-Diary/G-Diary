import React,{ useState }  from 'react';
import styled from 'styled-components';
import {Button, Container, TextField} from '@material-ui/core';
import { Link } from 'react-router-dom';

const TypeSignIn = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const SignInBtn = styled.div`
position: relative;
top:360px;`

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
  const [email, setEmail] = useState('');
  const [pw,setPw] = useState('');

  function emailValid() {
    var check = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return check.test(email);
  }

  function Valid() {
    if(emailValid() === true) {
      return false;
    } else return true;
  }

  return(
    <Wrap>
      <SignInBtn>
        <Button disabled={Valid()} 
          style={ Valid() ? {color: 'white', fontWeight: 'bolder', backgroundColor: '#F8EDB7',borderRadius: '30px', fontSize: '30px'} : { fontWeight: 'bolder', backgroundColor: '#FFD711', borderRadius: '30px', fontSize: '30px'}}>
        Sign In</Button>
      </SignInBtn>
      <TypeSignIn>
        <Container maxWidth='sm'>
          <TextField
            margin='dense'
            fullWidth
            variant="filled"
            required
            label="Email"
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
              email ? (!emailValid() ? 'Please enter it in e-mail format.' : '') : ''
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
    </Wrap>
  );
}

export default SignInForm;