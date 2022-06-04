import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface IProps {
  data?: number[];
}

export const MyD3Component: React.FC<IProps> = (props) => {
  const d3Container = useRef(null);

  /* The useEffect Hook is for running side effects outside of React,
     for instance inserting elements into the DOM using D3 */
  useEffect(
    () => {
      console.log(d3Container.current)
      if (props.data && d3Container.current) {
        // marginの設定
        const margin = { top: 30, right: 30, bottom: 30, left: 30 },
          width = 450 - margin.left - margin.right,
          height = 450 - margin.top - margin.bottom;

        // svgタグにgを埋め込む
        const svg = d3.select(d3Container.current).attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom).append("g").attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        // 行・列のラベルを設定
        const myGroups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
        const myVars = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"]

        // Build X scales and axis:
        const x = d3.scaleBand()
          .range([0, width])
          .domain(myGroups)
          .padding(0.01);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))

        // Build X scales and axis:
        const y = d3.scaleBand()
          .range([height, 0])
          .domain(myVars)
          .padding(0.01);
        svg.append("g")
          .call(d3.axisLeft(y));

        // Build color scale
        const myColor = d3.scaleSequential(
          function (t) { return d3.interpolate("white", "steelblue")(t); }
        )
          .domain([1, 100]);

        const readData = (data: any) => {
          svg.selectAll()
            .data(data, function (d: any) { return d.group + ':' + d.variable; })
            .enter()
            .append("rect")
            .attr("x", function (d) { return x(d.group) })
            .attr("y", function (d) { return y(d.variable) })
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("fill", function (d) { return myColor(d.value); })
        }

        //Read the data
        d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv").then((value) => {
          console.log(value)
          readData(value)
        })
        // //   .remove();
      }
    },
    [props.data, d3Container.current])

  return (
    <svg
      className="d3-component"
      ref={d3Container}
    />
  );
}