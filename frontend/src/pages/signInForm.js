import React from 'react';
import {Button, Container, TextField} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { LockOutlined } from '@mui/icons-material';

export default function SignInForm() {
  return(
    <Container>
      <div className='icon'>
        <LockOutlined style={{
          fontSize:'50px', 
          backgroundColor: 'lightgray', 
          borderRadius: '50px'
        }}/>
      </div>
      <div className='typeSignIn'>
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
      </div>
      <div className='signUpBtn'>
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
      </div>
      <div className='signInBtn'>
        <Button type='submit' style={{
          backgroundColor: '#535353', 
          borderRadius: '30px', 
          fontSize: '30px'
        }}>
          <Link style={{
            color: 'white', 
            textDecorationLine: 'none', 
            fontWeight: 'bold'
          }}>Sign In</Link>
        </Button>
      </div>
    </Container>
  );
}