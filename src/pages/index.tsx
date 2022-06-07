import styles from '../styles/Home.module.scss';
import { HeatMaps } from '../components/HeatMaps';
import React from 'react';
import { InferGetStaticPropsType, NextPage } from 'next/types';
import jsonFileData from '../../public/jsonFile_all.json'
import Layout from '../components/Layout';
import Link from 'next/link';

const InitialRenderComponent: React.FC = () => (
    <div style={{ width: 440, height: 484, backgroundColor: "#66666666", display: "flex", alignItems: "center", justifyContent: "center" }}><p>Loading...</p></div>
)

const Home: NextPage = ({ jsonFile }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <Layout>
            <div className={styles.contents}>
                <section className={styles.titleContainer}>
                    <h1 className={styles.title}>Seawater Temperature <br />Data Visualization</h1>
                    <p className={styles.description}>日本全国で測定された海水温のデータを収集し<br />１ヶ月の平均水温を年と月毎にビジュアライズ</p>
                    <p className={styles.cite}>データ取得元：<cite className={styles.citeText}><a href="https://jdoss1.jodc.go.jp/vpage/coastal_j.html" rel="noopener noreferrer">海洋データセンター</a></cite></p>
                    <Link href="/wholeshow">
                        <a className={styles.link}>画面全体表示に切替</a>
                    </Link>
                </section>
                <HeatMaps jsonFile={jsonFile} isInitialRender />
            </div>
        </Layout>
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