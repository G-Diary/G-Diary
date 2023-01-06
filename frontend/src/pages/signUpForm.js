import React from 'react';
import {Button, Container, TextField} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Person } from '@mui/icons-material';

export default function SignUpForm() {
  return(
    <Container>
      <div className='icon'>
        <Person style={{
          fontSize:'50px', 
          backgroundColor: 'lightgray', 
          borderRadius: '50px'
        }}/>
      </div>
      <div className='typeSignUp'>
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
          />
          <TextField
            margin="dense"
            fullWidth
            variant="filled"
            required
            label="ID"
            name="ID"
            autoComplete="email"
          />
          <TextField
            margin="dense"
            fullWidth
            variant="filled"
            required
            type="password"
            label="Password"
            name="Password"
            autoComplete="current-password"
          />    
          <TextField
            margin="dense"
            fullWidth
            variant="filled"
            required
            type="password"
            label="Confirm"
            name="Password"
            autoComplete="current-password"
          />
        </Container>
      </div>
      <div className='createAccountBtn'>
        <Button type='submit' style={{
          backgroundColor: '#535353', 
          borderRadius: '30px', 
          fontSize: '30px'
        }}>
          <Link to='signIn' style={{
            color: 'white', 
            textDecorationLine: 'none', 
            fontWeight: 'bold'
          }}>Create Account</Link>
        </Button>
      </div>
    </Container>
  );
}