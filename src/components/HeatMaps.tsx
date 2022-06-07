import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";

interface IProps {
  isScaleDown?: boolean
  jsonFile: JsonFile;
  heatMapProperty?: HeatMapProperty;
}

export interface JsonFile {
  island_names: string[];
  water_temperature: WaterTemperature[][]
}

export interface HeatMapProperty {
  width?: number;
  height?: number;
  paddingTop?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingBottom?: number;
  titlePosition?: number;
  titleFontSize?: string;
  isDisbleLabel?: boolean;
  toolTipPosition?: { top: number; left: number; }
}

interface WaterTemperature {
  group: string;
  variable: string;
  value: number;
}
export const HeatMaps: React.FC<IProps> = (props) => {
  const wrapRefs = useRef([]);
  const svgRefs = useRef([]);
  const temperatureInfo = props.jsonFile.water_temperature
  const islandNames = props.jsonFile.island_names
  temperatureInfo.forEach((_, i) => {
    wrapRefs.current[i] = React.createRef();
    svgRefs.current[i] = React.createRef();
  });
  // 2重のレンダリングを防止
  const isRender = useRef(false)

  const renderSvg = (wrapRef: HTMLDivElement, svgRef: SVGSVGElement, jsonData: WaterTemperature[], title: string) => {
    // marginの設定
    const margin = props.heatMapProperty ? { top: props.heatMapProperty.paddingTop, right: props.heatMapProperty.paddingRight, bottom: props.heatMapProperty.paddingBottom, left: props.heatMapProperty.paddingLeft } : { top: 40, right: 40, bottom: 40, left: 30 }
    const width = props.heatMapProperty?.width ? props.heatMapProperty.width : 440 - margin.left - margin.right
    const height = props.heatMapProperty?.height ? props.heatMapProperty.height : 440 - margin.top - margin.bottom

    // svgタグにgを埋め込む
    const svg = d3.select(svgRef).attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom).append("g").attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // 行・列のラベルを設定
    const columnLabels = ["2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2014", "2015", "2016", "2017", "2018", "2019", "2020"]
    const rowLabels = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]

    // 横幅、横のラベル名、（ヒートマップの要素の）横方向のパッディングの設定
    const x = d3.scaleBand()
      .range([0, width])
      .domain(columnLabels)
      .padding(0.01);

    // 縦幅、縦のラベル名、（ヒートマップの要素の）縦方向のパッディングの設定
    const y = d3.scaleBand()
      .range([height, 0])
      .domain(rowLabels)
      .padding(0.01);

    if (!props.heatMapProperty?.isDisbleLabel) {
      // ラベルの位置
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .selectAll("text")
        .style("fill", "#ccc")
        .attr("transform", "translate(-7, 10) rotate(-90)")    // 文字を時計回りに-90度回転させる
        .style("text-anchor", "end"); //　文字の表示開始位置を指定にする

      svg.append("g")
        .call(d3.axisLeft(y).tickSize(0))
        .selectAll("text")
        .style("fill", "#ccc")
        .attr("transform", "translate(-4, 0)")
    }

    // ヒートマップの各要素の色とレンジを設定する
    // d3.scaleSequential creates a scale from an interpolator
    // @see: https://observablehq.com/@d3/sequential-scales
    const myColor = d3.scaleSequential(
      (t) => { return d3.interpolateTurbo(t); }
    )
      .domain([0, 30]);

    const readData = (data: WaterTemperature[]) => {
      const tooltip = d3.select(wrapRef)
        .style("position", "relative")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "#FFFFFFEE")
        .style("border-radius", "8px")
        .style("position", "relative")
        .style("width", "128px")
        .style("height", "40px")
        .style("text-align", "center")
        .style("box-shadow", "0 2px 10px 0 rgb(0 0 0 / 20%)")
        .style("display", "flex")
        .style("align-items", "center")
        .style("justify-content", "center")

      // マウスオーバー時はtooltipを表示
      const mouseover = () => {
        tooltip.style("opacity", 0.85);
      }
      // マウスが離れている時はtooltipを非表示
      const mouseleave = () => {
        tooltip.style("opacity", 0)
      }
      // マウスが動いている時
      const mousemove = (event, data: WaterTemperature) => {
        const TOOLTIP_LEFT_OFFSET = props.heatMapProperty?.toolTipPosition ? props.heatMapProperty?.toolTipPosition.left : -24
        const TOOLTIP_TOP_OFFSET = props.heatMapProperty?.toolTipPosition ? props.heatMapProperty?.toolTipPosition.top : -464
        const waterTemperature = data.value === -99 ? undefined : (Math.round(data.value * 10) / 10);
        tooltip
          .html(waterTemperature ? `<span style="font-variant-numeric:tabular-nums;"> 水温：${waterTemperature.toFixed(1)}℃</span> ` : 'データなし')
          .style("left", (d3.pointer(event)[0] + TOOLTIP_LEFT_OFFSET) + "px")
          .style("top", (d3.pointer(event)[1] + TOOLTIP_TOP_OFFSET) + "px")
      }

      // add the squares
      svg.selectAll()
        .data(data, (data: WaterTemperature) => data.group + ':' + data.variable)
        .enter()
        .append("rect")
        .attr("x", (data) => { return x(data.group) })
        .attr("y", (data) => { return y(data.variable) })
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", (data) => { return data.value === -99 ? "#333" : myColor(Number(data.value)); })
        .style("cursor", "crosshair")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
    }

    svg.append("text")
      .attr("x", 0)
      .attr("y", props.heatMapProperty?.titlePosition ? props.heatMapProperty.titlePosition : -20)
      .attr("text-anchor", "left")
      .style("font-size", props.heatMapProperty?.titleFontSize ? `${props.heatMapProperty?.titleFontSize}px` : "24px")
      .style("fill", "#ccc")
      .text(title);

    readData(jsonData)
  }

  useEffect(
    () => {
      if (isRender.current || !wrapRefs.current.length || !svgRefs.current.length) return
      temperatureInfo.map((item, index) => {
        renderSvg(wrapRefs.current[index].current, svgRefs.current[index].current, item, islandNames[index])
      })
      isRender.current = true;
    },
    [wrapRefs.current, svgRefs.current,])

  return (
    <React.Fragment>
      {
        temperatureInfo.map((_, index) => {
          return (
            <div ref={wrapRefs.current[index]} key={index}>
              <svg
                className={`d3-component-${index}`}
                ref={svgRefs.current[index]}
              />
            </div>
          )
        })
      }
      <style jsx global>
        {`
          @media screen and (max-width: 480px) {
            svg {
              max-width: 100% !important;
              transform: scale(0.9);
            }
            .tooltip {
              position: absolute !important;
              top: 3px !important;
              left: initial !important;
              right: 16px;
            }
          }
        `}
      </style>
    </React.Fragment>
  );
}