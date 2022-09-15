import Head from 'next/head';
import styles from '../styles/Layout.module.scss';
import React, { ReactNode } from 'react';
import Script from 'next/script';

interface Props {
  children: ReactNode
  title: string
}

const Layout: React.FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}');
                `}
      </Script>
      <Head>
        <title>{props.title}</title>
        <meta
          name='description'
          content='2002年から2020年までの月毎の海水温の平均をビジュアライズした。' />
        <link rel='icon' href='/favicon.ico' />
        <meta property="og:title" content="Seawater Temperature Data Visualization" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="日本全国で測定された海水温のデータを収集し、１ヶ月の平均水温を年と月毎にビジュアライズ" />
        <meta property="og:url" content="https://seawater-temperature-data-visualization.vercel.app/" />
        <meta property="og:image" content="https://seawater-temperature-data-visualization.vercel.app/ogp.jpg" />
        <meta property="og:site_name" content="Seawater Temperature Data Visualization" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Seawater Temperature Data Visualization" />
        <meta name="twitter:description" content="日本全国で測定された海水温のデータを収集し、１ヶ月の平均水温を年と月毎にビジュアライズ" />
        <meta name="twitter:image" content="https://seawater-temperature-data-visualization.vercel.app/ogp.jpg" />
        <meta name="twitter:url" content="https://seawater-temperature-data-visualization.vercel.app/" />
        <meta name="google-site-verification" content="5Gftc4vNKAIuoIrcUC3dNvJZ7igr5f64K_5bGrcGDqs" />
      </Head>

      <main className={styles.main}>
        {props.children}
      </main>
      <footer className={styles.footer}><small className={styles.small}>© Nomura All right reserved</small></footer>
    </div>
  );
};

export default Layout;
