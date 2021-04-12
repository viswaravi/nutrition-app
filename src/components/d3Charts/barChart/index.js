import { useState, useEffect, useRef, Fragment } from "react";
import {
  select,
  axisBottom,
  axisRight,
  scaleLinear,
  scaleBand,
  max,
  axisLeft,
} from "d3";
import "./styles.scss";

const data = [
  { label: "Jan. '13'", value: 53 },
  { label: "Feb. '13'", value: 100 },
  { label: "Mar. '13'", value: 290 },
  { label: "Apr. '13'", value: 150 },
];

function D3BarChart() {
  const svgRef = useRef();
  const svgWidth = 600;
  const svgHeight = 400;
  const margin = { top: 20, bottom: 0, left: 50, right: 20 };
  const chartWidth = svgWidth - margin.left - margin.right;
  const chartHeight = svgHeight - margin.top - margin.bottom;

  const getBarColor = (value) => {
    if (value > 100) {
      return "#5A5386";
    } else {
      return "#fff";
    }
  };
  const getStrokeColor = (value) => {
    if (value > 100) {
      return "#fff";
    } else {
      return "#5A5386";
    }
  };

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand()
      .domain(data.map((dataPoint, index) => index))
      .range([0, chartWidth])
      .round(true)
      .padding(0.5);

    // console.log(xScale.domain(), xScale.range(), xScale.bandwidth(), xScale(1));

    const yScale = scaleLinear()
      .domain([0, max(data, (dataPoint) => dataPoint.value)])
      .range([chartHeight, 0]);

    const colorScale = scaleLinear()
      .domain([0, max(data, (dataPoint) => dataPoint.value)])
      .range(["green", "orange", "red"])
      .clamp(true);

    const xAxis = axisBottom(xScale).ticks(data.length);

    svg
      .select(".x-axis")
      .attr(
        "transform",
        `translate( ${margin.left}, ${chartHeight - margin.bottom})`
      )
      .attr("font-size", "1.1em")
      .attr("color", "#475A69")
      .call(xAxis);

    const yAxis = axisLeft(yScale).ticks(5);
    svg
      .select(".y-axis")
      .attr("transform", `translate(${margin.left}, ${-margin.bottom})`)
      .attr("font-size", "1.1em")
      .attr("color", "#475A69")
      .call(yAxis);

    // .style("transform", "scale(1, -1)")

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (dataPoint, index) => xScale(index))
      .attr("y", (dataPoint) => yScale(dataPoint.value))
      .attr("transform", `translate(${margin.left}, ${-margin.bottom})`)
      .attr("width", xScale.bandwidth())
      .transition()
      .attr("fill", (dataPoint) => getBarColor(dataPoint.value))
      .attr("stroke", (dataPoint) => getStrokeColor(dataPoint.value))
      .attr("stroke-width", 1)
      .attr("height", (dataPoint) => chartHeight - yScale(dataPoint.value));

    svg
      .selectAll(".circle")
      .data(data)
      .join("circle")
      .attr("class", "circle")
      .attr("r", 8)
      .attr("cx", (dataPoint, index) => xScale(index) + xScale.bandwidth() / 2)
      .attr("cy", (dataPoint) => yScale(dataPoint.value) - 10)
      .attr(
        "transform",
        `translate(${margin.left}, ${-margin.bottom - margin.top})`
      )
      .attr("fill", (dataPoint) => getBarColor(dataPoint.value))
      .attr("stroke", (dataPoint) => getStrokeColor(dataPoint.value))
      .attr("stroke-width", 1);

    svg
      .selectAll(".text")
      .data(data)
      .join("text")
      .attr("x", (dataPoint, index) => xScale(index) + xScale.bandwidth() / 2)
      .attr("y", (dataPoint) => yScale(dataPoint.value) - 10)
      .attr("dy", ".35em")
      .text((d) => d.label);
  }, [data]);

  return (
    <Fragment>
      <svg ref={svgRef} width={svgWidth} height={svgHeight}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </Fragment>
  );
}

export default D3BarChart;
