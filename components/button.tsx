import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { teal } from '@mui/material/colors';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(teal[500]),
  backgroundColor: teal[500],
  '&:hover': {
    backgroundColor: teal[700],
  },
}));

interface StyledButtonProps {
  label: string;
  onClick: () => void;
}

const TealButton: FC<StyledButtonProps> = ({ label, ...props }) => {
  return (
    <ColorButton variant='contained' {...props}>
      {label}
    </ColorButton>
  );
};

export default TealButton;
