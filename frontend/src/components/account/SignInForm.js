import React,{ useState }  from 'react';
import styled from 'styled-components';
import {Button, Container, TextField} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { LockOutlined } from '@mui/icons-material';

const TypeSignIn = styled.div`
  position: relative;
  bottom: 180px;
  right: 245px;`

const SignInBtn = styled.div`
  position: relative;
  bottom: 55px;
  right: 98px;`

const SignUpBtn = styled.div`
  position: relative;
  bottom: 158px;
  left: 32px;`

function SignInForm() {
  const [id, setId] = useState('');

  function onChange(e) {
    setId(e.target.value)
  }

  function Validation() {
    var check = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    console.log(check.test(id))
    return check.test(id);
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
            type='text'
            value={id}
            onChange={onChange}
            error={id ? !Validation() : Validation()}
            helperText={
              id ? (!Validation() ? '이메일 형식으로 입력해주세요.' : '') : ''
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
          />
        </Container>
      </TypeSignIn>
      <SignUpBtn>
        <Button style={{
          border: 'solid 2px lightgray', 
          borderRadius: '30px', 
          fontSize: '20px'
        }}>
          <Link to='/SignUp' style={{
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
          <Link to='/SignUp' style={{
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