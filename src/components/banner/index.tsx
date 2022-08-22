import React, { FC, useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';

interface BannerProps {}

type UserInformation = {
  name?: string;
  phoneNumber?: string | number;
};

const Banner: FC<BannerProps> = ({}) => {
  const [userInformation, setUserInformation] = useState<UserInformation>({});

  useEffect(() => {
    setUserInformation({
      name: localStorage.getItem('user') || '',
      phoneNumber: localStorage.getItem('phoneNumber') || undefined,
    });
  }, []);

  return (
    <Paper elevation={1} className='w-4/5 m-auto mt-10 mb-10 h-24'>
      <h2 className='font-bold'>
        Welcome, {userInformation.name} -- your phone number is{' '}
        {userInformation.phoneNumber}
      </h2>
    </Paper>
  );
};

export default Banner;
