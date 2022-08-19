import React, { FC, useEffect, useState } from 'react';

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
    <div
      style={{
        border: 'solid',
        width: '75%',
        height: '100px',
        margin: 'auto',
        marginTop: '3%',
      }}
    >
      <h2>
        Welcome, {userInformation.name} -- your phone number is{' '}
        {userInformation.phoneNumber}
      </h2>
    </div>
  );
};

export default Banner;
