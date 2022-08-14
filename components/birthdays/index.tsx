import React, { FC } from 'react';

interface BirthdayProps {
  title: string;
}

const Birthdays: FC<BirthdayProps> = ({ title }) => {
  return (
    <>
      <h1>{title}</h1>
    </>
  );
};

export default Birthdays;
