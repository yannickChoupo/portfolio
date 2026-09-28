// import * as d3 from "d3";
// import geoData from "./custom.geo";
// import type { Feature, Geometry } from "geojson";

// interface GeoProperties {
//     [key: string]: unknown;
// }

// type CountyFeature = Feature<
//     Geometry,
//     GeoProperties
// > & {
//     id?: string | number;
// };


// interface EducationDataItem {
//     fips: number;
//     area_name: string;
//     state: string;
//     bachelorsOrHigher: number;
// }


// const DrawChoroploth = (svg: d3.Selection<
//     SVGSVGElement,
//     unknown,
//     null,
//     undefined
// >, curData: EducationDataItem[]) => {
//     // Header
//     const header = d3.select("#dataviz header");
//     header
//         .style(
//             "background-color",
//             "white"
//         )
//         .style(
//             "color",
//             "black"
//         )
//         .style(
//             "text-align",
//             "center"
//         );
//     header.append("h1")
//         .style(
//             "margin-bottom",
//             "0"
//         )
//         .text(
//             "United States Educational Attainment"
//         );
//     header.append("h6")
//         .style(
//             "margin-bottom",
//             "0"
//         )
//         .style(
//             "font-size",
//             ".7em"
//         )
//         .text(
//             "Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)"
//         );

//     // Education data
//     const educationData: EducationDataItem[] = [
//         ...curData
//     ];

//     const percentageArr =
//         educationData.map(
//             (item) =>
//                 item.bachelorsOrHigher
//         );

//     const minPercentage =
//         d3.min(percentageArr) ?? 0;

//     const maxPercentage =
//         d3.max(percentageArr) ?? 0;

//     // Legend colors
//     const legendColors = [
//         "#e5f5e0",
//         "#c7e9c0",
//         "#a1d99b",
//         "#74c476",
//         "#41ab5d",
//         "#238b45",
//         "#006d2c"
//     ];


//     // SVG
//     const svgWidth = 960;
//     const svgHeight = 600;

//     svg.attr("preserveAspectRatio", "xMinYMin meet")
//         .attr("viewBox", "0 0 " + svgWidth + " " + svgHeight)
//         .style("max-width", "100%")
//         .style("height", "auto")
//         .style("height", "intrinsic")
//         .style("background-color", "white")
//         .style("color", "black")

//     var path = d3.geoPath()
//     const paths = svg.append("g").attr("id", "paths")

//     const tooltipGroup = svg.append("g").attr("id", "tooltip-group");
//     const tootlipContainer = tooltipGroup.append("rect").attr("id", "tooltip-container").attr("rx", 6).attr("ry", 6)
//     const tooltipText = tooltipGroup.append("text").attr("id", "tooltip-text").attr("x", "2ch").attr("y", "-1ch").style("display", "none");

//     // Legend
//     const legendWidth = 300;
//     const legendHeight = 70;
//     const legend =
//         svg
//             .append<SVGGElement>("g")
//             .attr("id", "legend")
//             .attr("height", legendHeight)
//             .attr("width", legendWidth);

//     const legendMargin = {
//         top: 30,
//         bottom: 30,
//         left: 40,
//         right: 40
//     };

//     let legendDomain = d3.range(minPercentage, maxPercentage, (maxPercentage - minPercentage) / 8)

//     let legendThreshold = d3
//         .scaleQuantize<string>()
//         .domain([minPercentage, maxPercentage,]
//         )
//         .range(legendColors);

//     const legendMin =
//         d3.min(
//             legendDomain
//         ) ??
//         minPercentage;

//     const legendMax = d3.max(legendDomain) ?? maxPercentage;

//     const legendXScale = d3.scaleLinear()
//         .domain([
//             legendMin,
//             legendMax
//         ])
//         .range([
//             legendMargin.left,
//             legendWidth -
//             legendMargin.right
//         ]);


//     // let legendCellWidth;
//     const legendCellWidth =
//         legendDomain.length > 0
//             ? (
//                 legendWidth -
//                 2 *
//                 legendMargin.right
//             ) /
//             legendDomain.length
//             : 0;

//     let legendXAxis = d3.axisBottom(legendXScale)
//         .tickValues(legendDomain)
//         .tickFormat(d3.format('.1f'));

//     legend.append("g")
//         .attr("transform",
//             "translate(" + svgWidth / 2 + "," + (legendHeight - legendMargin.bottom) + ")")
//         .call(legendXAxis)
//         .attr("id", "y-legend")

//     legend
//         .selectAll<
//             SVGRectElement,
//             number
//         >("rect")
//         .data(
//             legendDomain
//         )
//         .enter()
//         .append<SVGRectElement>("rect")
//         .attr("class", "legend")
//         .attr("height", 20)
//         .attr("width", legendCellWidth)
//         .attr(
//             "x",
//             (
//                 _value: number,
//                 index: number
//             ) =>
//                 svgWidth / 2 +
//                 legendMargin.left +
//                 index *
//                 legendCellWidth
//         )
//         .attr(
//             "y",
//             legendHeight -
//             legendMargin.bottom -
//             20
//         )
//         .attr(
//             "fill",
//             (
//                 value: number
//             ) =>
//                 legendThreshold(
//                     value
//                 )
//         );




//     paths.selectAll<SVGPathElement, CountyFeature>('path')
//         .data(geoData as CountyFeature[])
//         // .data(geoData)
//         .enter()
//         .append('path')
//         .attr("d", (dataItem: CountyFeature) => {
//             return path(dataItem) ?? "";
//         })
//         // .attr('d', path)
//         .style("cursor", "pointer")
//         .attr('class', 'paths')
//         .attr("fill", (dataItem: CountyFeature) => {
//             const fips = String(
//                 dataItem.id
//             ).padStart(5, "0");

//             const county =
//                 educationData.find(
//                     (item) =>
//                         String(item.fips).padStart(5, "0") ===
//                         fips
//                 );

//             if (!county) {
//                 console.log(
//                     "No county found for FIPS:",
//                     fips
//                 );

//                 return "#eee";
//             }

//             return legendThreshold(
//                 county.bachelorsOrHigher
//             );
//         })
//         .attr("data-fips", (dataItem: CountyFeature) =>
//             String(dataItem.id)
//         )
//         .attr("data-area", (dataItem: CountyFeature) => {
//             const id = dataItem.id;

//             const county = educationData.find(
//                 (item) => item.fips === id
//             );

//             return county?.area_name ?? "";
//         })
//         .attr('data-education', (dataItem: CountyFeature) => {
//             let id = dataItem['id'];
//             let county = educationData.find((item) => item['fips'] === id);
//             if (!county) {
//                 return;
//             }
//             let percentage = county['bachelorsOrHigher'];
//             return percentage;
//         })
//         .on('mouseover', function (Event, dataItem) {
//             const id = dataItem.id;

//             const county = educationData.find(
//                 (item) => item.fips === id
//             );

//             if (!county) {
//                 return;
//             }

//             const countyName =
//                 county.area_name;

//             const state =
//                 county.state;

//             const percentage =
//                 county.bachelorsOrHigher;



//             let pointer = d3.pointer(Event);




//             tooltipGroup
//                 .style("display", "block")
//                 .attr("transform", `translate(${pointer[0]} , ${pointer[1]})`)

//             // const id = String(dataItem.id);


//             // let tooltipTextLength = "";
//             // let tooltipContent = countyName + ", " + state + ": " + percentage + "%";

//             const tooltipContent =
//                 `${countyName}, ${state}: ${percentage}%`;

//             tooltipText
//                 .style(
//                     "display",
//                     "block"
//                 )
//                 .text(
//                     tooltipContent
//                 )

//             const node =
//                 tooltipText.node();

//             const tooltipTextLength =
//                 node
//                     ? node.getComputedTextLength()
//                     : 0;



//             tootlipContainer
//                 .attr("width", (tooltipTextLength + 16) + "px")
//                 .attr("height", "3ch")
//                 .attr("x", "1ch")
//                 .attr("y", "-3ch")
//                 .attr("fill", "rgba(255, 255, 204, 0.9)")

//         })
//         .on('mouseout', function () {
//             tooltipGroup.style("display", "none")
//         })

// }


// export default DrawChoroploth;