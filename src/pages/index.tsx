import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { MyD3Component } from '../components/D3';
import React, { useState } from 'react';

export default function Home() {
    const [isScaleDown, setIsScaleDown] = useState(false);

    const onClickHandler = () => {
        setIsScaleDown(!isScaleDown)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Seawater Temperature Data Visualization</title>
                <meta
                    name='description'
                    content='2002年から2020年までの月毎の海水温の平均をビジュアライズした。' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className={`${styles.main} ${isScaleDown && styles.mainSmall}`}>
                <section className={`${styles.titleContainer} ${isScaleDown && styles.titleContainerSmall}`}>
                    {!isScaleDown && <React.Fragment>
                        <h1 className={styles.title}>Seawater Temperature <br />Data Visualization</h1>
                        <p className={styles.description}>月ごとの海水温の平均をビジュアライズ</p>
                        <p className={styles.cite}>データ取得元：<cite><a href="https://jdoss1.jodc.go.jp/vpage/coastal_j.html" rel="noopener noreferrer">海洋データセンター</a></cite></p>
                    </React.Fragment>}
                    <button onClick={onClickHandler} className={styles.scaleButton}>{isScaleDown ? '戻す' : '画面全体に表示'}</button>
                </section>
                <MyD3Component isScaleDown={isScaleDown} />
            </main>
            <footer className={styles.footer}><small className={styles.small}>© Nomura All right received</small></footer>
        </div>
    );
}
