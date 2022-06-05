import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { MyD3Component } from '../components/D3';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Seawater Temperature Data Visualization</title>
                <meta
                    name='description'
                    content='2002年から2020年までの月毎の海水温の平均をビジュアライズした。' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className={styles.main}>
                <section className={styles.titleContainer}>
                    <h1 className={styles.title}>Seawater Temperature <br />Data Visualization</h1>
                    <p className={styles.description}>2002年から2020年までの月毎の海水温の平均をビジュアライズした。</p>
                    <p className={styles.cite}>データ取得元：<cite><a href="https://jdoss1.jodc.go.jp/vpage/coastal_j.html" rel="noopener noreferrer">海洋データセンター</a></cite></p>
                </section>
                <MyD3Component />
            </main>
            <footer className={styles.footer}><small className={styles.small}>© Nomura All right received</small></footer>
        </div>
    );
}
