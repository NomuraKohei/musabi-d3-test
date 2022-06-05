import * as d3 from "d3";
import React, { useCallback, useEffect, useRef, useState } from "react";
import jsonFile from '../../../public/jsonFile_all.json'

export const MyD3Component: React.FC = () => {
  const wrapRefs = useRef([]);
  const svgRefs = useRef([]);
  const temperatureInfo = jsonFile.water_temperature
  const islandNames = jsonFile.island_names
  temperatureInfo.forEach((_, i) => {
    wrapRefs.current[i] = React.createRef();
    svgRefs.current[i] = React.createRef();
  });
  // 2重のレンダリングを防止
  const isRender = useRef(false)


  const renderSvg = (wrapRef: any, svgRef: any, jsonData, title: string) => {
    // marginの設定
    const margin = { top: 40, right: 40, bottom: 40, left: 40 },
      width = 440 - margin.left - margin.right,
      height = 440 - margin.top - margin.bottom;

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

    // ラベルの位置
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll("text")
      .style("fill", "#ccc")
      .attr("transform", "translate(-7, 10) rotate(-90)")    // 文字を時計回りに-90度回転させる
      .style("text-anchor", "end"); //　文字の表示開始位置を指定にする

    // 縦幅、縦のラベル名、（ヒートマップの要素の）縦方向のパッディングの設定
    const y = d3.scaleBand()
      .range([height, 0])
      .domain(rowLabels)
      .padding(0.01);

    svg.append("g")
      .call(d3.axisLeft(y).tickSize(0))
      .selectAll("text")
      .style("fill", "#ccc")
      .attr("transform", "translate(-10, 0)")

    // ヒートマップの各要素の色とレンジを設定する
    // d3.scaleSequential creates a scale from an interpolator
    // see: https://observablehq.com/@d3/sequential-scales
    const myColor = d3.scaleSequential(
      (t) => { return d3.interpolateTurbo(t); }
    )
      .domain([0, 30]);

    const readData = (data: any) => {
      const tooltip = d3.select(wrapRef)
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "#FFFFFF")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style("position", "relative")
        .style("width", "184px")
        .style("height", "72px")

      // マウスオーバー時はtooltipを表示
      const mouseover = (d) => {
        tooltip.style("opacity", 0.85)
      }
      // マウスが離れている時はtooltipを非表示
      const mouseleave = (d) => {
        tooltip.style("opacity", 0)
      }
      // マウスが動いている時
      const mousemove = (event, data) => {
        tooltip
          .html("水温（℃）<br>" + data.value)
          .style("left", (d3.pointer(event)[0] + 70) + "px")
          .style("top", (d3.pointer(event)[1] + -380) + "px")
      }

      // add the squares
      svg.selectAll()
        .data(data, function (d: { group: string; variable: string; value: string; }) { return d.group + ':' + d.variable; })
        .enter()
        .append("rect")
        .attr("x", (d) => { return x(d.group) })
        .attr("y", (d) => { return y(d.variable) })
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", (d) => { return myColor(Number(d.value)); })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
    }

    svg.append("text")
      .attr("x", 0)
      .attr("y", -20)
      .attr("text-anchor", "left")
      .style("font-size", "24px")
      .style("fill", "#ccc")
      .text(title);

    // svg
    //   .append("text")
    //   .attr("x", 0)
    //   .attr("y", -20)
    //   .attr("text-anchor", "left")
    //   .style("font-size", "14px")
    //   .style("fill", "#999")
    //   .style("max-width", 400)
    //   .text('データ元：海洋データセンター')

    //Read the data
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
    [wrapRefs.current, svgRefs.current])

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
    </React.Fragment>
  );
}