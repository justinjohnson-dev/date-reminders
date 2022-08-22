import React, { FC } from 'react';

interface StyledButtonProps {
  label: string;
  onClick: () => void;
}

const TealButton: FC<StyledButtonProps> = ({ label, ...props }) => {
  return (
    <button
      className='bg-teal-700 hover:bg-teal-600 text-white py-2 px-4 rounded'
      {...props}
    >
      {label}
    </button>
  );
};

export default TealButton;
