import React, { useRef, useEffect } from "react";
//import React, { useEffect } from "react";
import * as d3 from "d3";
import mapa from "./srbijalv1.geojson";
import DB from "./DB.json";

function Map({ choro, w, h, DB }) {
  /*data setup for choropleth*/

  /****drawing****/
  useEffect(() => {
    /*load data*/
    d3.json(mapa).then(d => {
      /*data loaded*/

      /*cleanup before redraw*/
      d3.select("g").remove();
      d3.select("svg")
        .selectAll("foreignObject")
        .remove();
      d3.selectAll("text").remove();

      /*draw map*/
      let path = d3.geoPath(d3.geoEquirectangular().fitSize([w, h], d));
      d3.select("svg")
        .append("g")
        .selectAll("path")
        .data(d.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("name", d => {
          return d.properties.name;
        })
        .attr("fill", function(d) {
          let color = d3
            .scaleLinear()
            .domain(
              //context. kill me
              [d3.min(choro.map(e => e.sat)), d3.max(choro.map(e => e.sat))]
            )
            .range(["#e5f5e0", "#a1d99b"]);

          if (d.properties.name === "Kosovo") {
            return "#666666";
          }
          console.log(d3.min(choro.map(e => e.sat)));
          console.log(choro.find(e => e.name === d.properties.name).sat);
          console.log(color(choro.find(e => e.name === d.properties.name).sat));
          return color(choro.find(e => e.name === d.properties.name).sat);
        });

      /*get centroids*/
      let centroids = [];
      d3.select("svg")
        .selectAll("path")
        .filter(d => {
          centroids.push({
            name: d.properties.name,
            coords: path.centroid(d)
          });
          return false;
        });

      /*map text*/
      centroids.forEach(e => {
        let label = d3
          .select("svg")
          .append("text")
          .attr("transform", d => {
            return "translate(" + [e.coords[0], e.coords[1]] + ")";
          })
          .attr("text-anchor", "middle");
        if (e.name === "Kosovo") {
          label.text("no data");
        } else {
          label.text(choro.find(x => x.name === e.name).value);
        }
      });

      /*eventhandlers*/
      d3.select("g")
        .selectAll("path")
        .on("click", d => drawPopup(d, centroids));

      /*popup draw*/
      function drawPopup(d, centroids) {
        //let xy = centroids.filter(e => {
        //  return e.name === d.properties.name;
        //})[0].coords;

        d3.select("svg")
          .append("foreignObject")
          .attr("width", 300)
          .attr("height", 400)
          .attr("x", w - 300)
          .attr("y", 0)
          //.attr("x", xy[0])
          //.attr("y", xy[1])
          .append("xhtml:body")
          .append("div")
          .attr("class", "tool w-100")
          .html(
            "<h5>" +
              DB[d.properties.name].name +
              "</h5> <table style='width:100%'<tr><th></th><th>Javno</th><th>Privatno</th></tr><tr><td>Mamogram</td><td>" +
              DB[d.properties.name].MMG[0] +
              "</td><td>" +
              DB[d.properties.name].MMG[1] +
              "</td></tr><tr><td>CT</td><td>" +
              DB[d.properties.name].CT[0] +
              "</td><td>" +
              DB[d.properties.name].CT[1] +
              "</td></tr><tr><td>MRI</td><td>" +
              DB[d.properties.name].MRI[0] +
              "</td><td>" +
              DB[d.properties.name].MRI[1] +
              "</td></tr></table>"
          );
      }
    });
  });

  const d3div = useRef(null);
  return <svg className="d3div" width={w} height={h} ref={d3div} />;
}

export default Map;
