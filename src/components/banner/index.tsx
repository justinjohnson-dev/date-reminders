import React, { FC, useEffect, useState } from 'react';
import { fetchAllUsers } from '../../hooks/use-user';
import TealButton from '../button';

import API, { graphqlOperation } from '@aws-amplify/api';

interface BannerProps {}

type UserInformation = {
  name?: string;
  phoneNumber?: string | number;
};

const Banner: FC<BannerProps> = ({}) => {
  const [userInformation, setUserInformation] = useState<UserInformation>({});
  const [testData, setTestData] = useState<string>('');

  useEffect(() => {
    setUserInformation({
      name: localStorage.getItem('user') || '',
      phoneNumber: localStorage.getItem('phoneNumber') || undefined,
    });
  }, []);

  const handleFetch = async () => {
    // const response = await fetchAllUsers('/api/hello');
    // console.log(response);
    // setTestData(response.message[0].name);
    const result = await API.graphql(graphqlOperation(queryTesting));
    console.log(result);
  };

  return (
    <div
      style={{
        border: 'solid',
        width: '75%',
        height: 'auto',
        margin: 'auto',
        marginTop: '3%',
      }}
    >
      <h2>
        Welcome, {userInformation.name} -- your phone number is{' '}
        {userInformation.phoneNumber}
      </h2>
      <TealButton label='Continue' onClick={handleFetch} />
      <h2>{testData}</h2>
    </div>
  );
};

export default Banner;

export const queryTesting = `
query MyQuery {
  listDateReminders {
    items {
      birthdays {
        birthdayDate
        birthdayName
      }
      id
      name
      phone_number
    }
  }
}
`;
