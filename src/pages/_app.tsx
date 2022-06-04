import { AppProps } from 'next/app';
import '../styles/globals.scss';
import { MyD3Component } from './components/D3';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='app'>
      <main className='wrapper'>
        <MyD3Component data={[1, 2, 3]} />

        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
