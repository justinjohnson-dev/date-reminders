import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../components/layout';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import TealButton from '../components/button';

const Login: NextPage = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    localStorage.setItem('user', username);
    localStorage.setItem('phoneNumber', phoneNumber);
    router.push('/');
  };

  return (
    <>
      <Layout>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '0 auto',
            marginTop: '10%',
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
          />
          <TextField
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            label='Phone Number'
            style={{ margin: '1% 0' }}
          />
          <TealButton label='Continue' onClick={handleLogin} />
        </div>
      </Layout>
    </>
  );
};

export default Login;
