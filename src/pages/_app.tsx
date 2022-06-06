import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='app'>
      <Head>
        <title>Seawater Temperature Data Visualization</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
