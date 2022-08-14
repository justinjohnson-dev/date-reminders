import React, { FC } from 'react';

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer
      style={{
        backgroundColor: '#eee',
        padding: '5%',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '2.5rem',
      }}
    >
      <div className='container'>
        {/* <ul className='list-unstyled list-inline text-center'>
          <li className='list-inline-item'>
            <a
              className='btn-floating btn-li mx-1'
              target='_blank'
              href='https://www.linkedin.com/in/justin-johnson-413a93169/'
            >
              <i className='fab fa-linkedin'> </i>
            </a>
          </li>
          <li className='list-inline-item'>
            <a
              className='btn-floating btn-envelope mx-1'
              href='mailto:jjustin634@gmail.com'
            >
              <i className='far fa-envelope'></i>
            </a>
          </li>
          <li className='list-inline-item'>
            <a
              className='btn-floating mx-1'
              target='_blank'
              href='https://github.com/justinjohnson-dev'
            >
              <i className='fab fa-github'> </i>
            </a>
          </li>
        </ul> */}
      </div>
      <div className='footer-copyright text-center py-3'>
        © 2022 Copyright - Stay Connected!
        {/* <a href="https://mdbootstrap.com/bootstrap-tutorial/"> thebirthdayreminder.com</a>
         */}
      </div>
    </footer>
  );
};

export default Footer;
