import React, { FC } from 'react';

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer
      style={{
        backgroundColor: 'black',
        color: '#fff',
        position: 'absolute',
        bottom: 0,
        padding: '3%',
        width: '100%',
        height: '2.5rem',
      }}
    >
      <div>
        © 2022 Copyright - Stay Connected!
        {/* <a href="https://mdbootstrap.com/bootstrap-tutorial/"> thebirthdayreminder.com</a>
         */}
      </div>
    </footer>
  );
};

export default Footer;
