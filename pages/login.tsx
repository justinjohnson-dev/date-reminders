import React, { FC, useState } from 'react';
import Layout from '../components/layout';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  const handleLoginIn = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    localStorage.setItem('user', username);
    localStorage.setItem('phoneNumber', phoneNumber);
    router.push('/home');
  };

  return (
    <>
      <Layout>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '0 auto',
            marginTop: '20%',
            width: '30%',
            height: '30%',
          }}
        >
          <TextField
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label='Username'
            style={{ padding: '1%' }}
          />
          <TextField
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            label='Phone Number'
            style={{ padding: '1%' }}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            style={{ marginTop: '1%' }}
            onClick={handleLoginIn}
          >
            Continue
          </Button>
        </div>
      </Layout>
    </>
  );
};

export default Login;
