import { AppProps } from 'next/app';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='app'>
      <main className='wrapper'>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
