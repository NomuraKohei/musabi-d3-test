import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { MyD3Component } from '../components/D3';
import React, { useState } from 'react';
import ogpImage from '../../public/ogp.jpg'
import { InferGetStaticPropsType, NextPage } from 'next/types';
import jsonFileData from '../../public/jsonFile_all.json'

const Home: NextPage = ({ jsonFile }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [isScaleDown, setIsScaleDown] = useState(false);

    const onClickHandler = () => {
        setIsScaleDown(!isScaleDown)
    }

    return (
        <div className={`${styles.container} ${isScaleDown && styles.containerSmall}`}>
            <Head>
                <title>Seawater Temperature Data Visualization</title>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
                    rel="stylesheet"
                />
                <meta
                    name='description'
                    content='2002年から2020年までの月毎の海水温の平均をビジュアライズした。' />
                <link rel='icon' href='/favicon.ico' />
                <meta property="og:url" content="https://seawater-temperature-data-visualization.vercel.app/" />
                <meta property="og:title" content="Seawater TemperatureData Visualization" />
                <meta property="og:site_name" content="Seawater TemperatureData Visualization" />
                <meta property="og:description" content="月ごとの海水温の平均をビジュアライズ" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={ogpImage.src} />
                <meta property="og:image:width" content={String(1260)} />
                <meta property="og:image:height" content={String(600)} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Seawater TemperatureData Visualization" />
                <meta name="twitter:description" content="月ごとの海水温の平均をビジュアライズ" />
                <meta name="twitter:image" content={ogpImage.src} />
                <meta name="twitter:url" content="https://seawater-temperature-data-visualization.vercel.app/" />
            </Head>

            <main className={`${styles.main} ${isScaleDown && styles.mainSmall}`}>
                <section className={`${styles.titleContainer} ${isScaleDown && styles.titleContainerSmall}`}>
                    {!isScaleDown && <React.Fragment>
                        <h1 className={styles.title}>Seawater Temperature <br />Data Visualization</h1>
                        <p className={styles.description}>月ごとの海水温の平均をビジュアライズ</p>
                        <p className={styles.cite}>データ取得元：<cite className={styles.citeText}><a href="https://jdoss1.jodc.go.jp/vpage/coastal_j.html" rel="noopener noreferrer">海洋データセンター</a></cite></p>
                    </React.Fragment>}
                    <button onClick={onClickHandler} className={styles.scaleButton}>{isScaleDown ? '戻す' : '画面全体に表示を切替'}</button>
                </section>
                <MyD3Component isScaleDown={isScaleDown} jsonFile={jsonFile} />
            </main>
            <footer className={styles.footer}><small className={styles.small}>© Nomura All right reserved</small></footer>
        </div>
    );
}

export async function getStaticProps() {
    const jsonFile = jsonFileData
    return {
        props: {
            jsonFile: jsonFile,
        },
    }
}

export default Home