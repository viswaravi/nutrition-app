import { useEffect, useMemo, useState } from "react";
import * as Data from "../../assets/data.json";
import { geoEqualEarth, geoPath, geoMercator } from "d3-geo";
import * as topojson from "topojson-client";
import * as d3 from "d3";
// import { } from "d3";

const IndiaMap = () => {
  const width = 700;
  const height = 900;

  //   const projection = d3.geoEqualEarth();
  //   const path = d3.geoPath(projection);
  const projection = geoMercator()
    .scale(1200)
    .translate([-width * 2, height]);

  const [geographies, setGeographies] = useState([]);
  const Map = useMemo(() => {
    return d3.select(".districts");
  }, []);
  const Path = geoPath();
  const Districts = useMemo(() => {
    return d3.selectAll(".district");
  }, []);
  const zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed);

  useEffect(() => {
    setGeographies(Data.default.features);
    // console.log(Data.default.features);
    Map.call(zoom);
    Districts.on("click", clicked);
  }, []);

  function zoomed(event) {
    // console.log("zoom", event);
    const { transform } = event;
    Map.attr("transform", transform);
    Map.attr("stroke-width", 1 / transform.k);
  }

  function reset() {
    // states.transition().style("fill", null);
    // console.log("reset");
    // Map.transition()
    //   .duration(750)
    //   .call(
    //     zoom.transform,
    //     d3.zoomIdentity,
    //     d3.zoomTransform(Map.node()).invert([width / 2, height / 2])
    //   );
  }

  function clicked(event) {
    console.log("Click", event);

    // const [[x0, y0], [x1, y1]] = Path.bounds(event.path);
    // console.log(x0, y0, x1, y1);

    // event.stopPropagation();
    // Districts.transition().style("fill", null);
    // d3.select(this).transition().style("fill", "red");
    // Map.transition()
    //   .duration(750)
    //   .call(
    //     zoom.transform,
    //     d3.zoomIdentity
    //       .translate(width / 2, height / 2)
    //       .scale(
    //         Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height))
    //       )
    //       .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
    //     d3.pointer(event, Map.node())
    //   );
  }

  //   useEffect(() => {
  //     if (geographies.length > 0) {
  //       var svg = d3
  //         .select("#india-map")
  //         .append("svg")
  //         .attr("width", width)
  //         .attr("height", height);
  //       var path = d3.geo.path().projection(projection);
  //       var g = svg.append("g");

  //       g.selectAll("path")
  //         .data(topojson.object(topology, topology.objects.countries).geometries)
  //         .enter()
  //         .append("path")
  //         .attr("d", path);
  //     }
  //   }, [geographies]);

  return (
    <svg width={width} height={height} viewBox="0 0 600 900" onClick={reset}>
      <g className="districts">
        {geographies.map((d, i) => (
          <path
            key={`path-${i}`}
            d={Path.projection(projection)(d)}
            className="district"
            fill={`rgba(38,50,56,${(1 / geographies.length) * i})`}
            stroke="#FFFFFF"
            strokeWidth={0.5}
          />
        ))}
      </g>
      {/* <g className="markers">
        <circle
          cx={this.projection()([8, 48])[0]}
          cy={this.projection()([8, 48])[1]}
          r={10}
          fill="#E91E63"
          className="marker"
        />
      </g> */}
    </svg>
  );
};

export default IndiaMap;
