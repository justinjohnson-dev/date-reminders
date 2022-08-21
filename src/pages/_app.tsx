import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Amplify, Auth } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);
Auth.configure(awsExports);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
