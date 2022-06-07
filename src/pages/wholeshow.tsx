import React from "react";
import Layout from "../components/Layout";
import jsonFileData from '../../public/jsonFile_all.json'
import { InferGetStaticPropsType, NextPage } from "next";
import { HeatMapProperty, HeatMaps } from "../components/HeatMaps";
import styles from '../styles/WholeShow.module.scss';
import Link from "next/link";

const WholeShow: NextPage = ({ jsonFile }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const heatMapProperty: HeatMapProperty = {
    width: 220,
    height: 220,
    paddingTop: 40,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    titlePosition: -16,
    titleFontSize: '16',
    toolTipPosition: { top: -280, left: -60 },
    isDisbleLabel: true
  }
  return (
    <Layout title="Seawater Temperature Data Visualization | 画面全体表示">
      <div className={styles.contentsWrap}>
        <Link href="/">
          <a className={styles.link}>戻る</a>
        </Link>
        <div className={styles.contents}>
          <HeatMaps jsonFile={jsonFile} heatMapProperty={heatMapProperty} />
        </div>
      </div>
    </Layout>
  );
};

export default WholeShow;

export async function getStaticProps() {
  const jsonFile = jsonFileData
  return {
    props: {
      jsonFile: jsonFile,
    },
  }
}