let mapURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
let dataURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";


let mapData, educationData, percentageArr;
let canvas = d3.select("#canvas");
let tooltip = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .attr('id', 'tooltip')
    .style('opacity', 0);

let minPercentage, maxiPercentage;
/*let legendColors = [
    '#C9F0C3',
    '#9CF09C',
    '#7AF080',
    '#5BF063',
    '#3CF048',
    '#20F02C',
    '#00F001'
  ]'*/
let legendColors = [
    '#C9F0C3',
    '#9CF09C',
    '#7AF080',
    '#5BF063',
    '#3CF048',
    '#20F02C',
    '#00F001'
]
let margin = {
    "left": 60,
    "right": 40,
    "bottom": 40,
    "top": 40
}
let legendWidth = 500, legendHeight = 100;
let legendMargin = {
    "top": 30,
    "bottom": 30,
    "left": 40,
    "right": 40
}

let drawMap = () => {
    /**
     *  d3.geoPath : concert geoJson object to string that can be attributed
     *               to the d attribute of Path
     */
    let legendThreshold = d3.scaleLinear()
        .domain(d3.range(minPercentage,
            maxiPercentage,
            (maxiPercentage - minPercentage) / 8))
        .range(legendColors);
    canvas.selectAll('path')
        .data(mapData)
        .enter()
        .append('path')
        .attr('d', d3.geoPath())
        .attr('class', 'county')
        /*.attr('fill', (dataItem) =>  {
             let id = dataItem['id'];
             let county = educationData.find((item) => item['fips'] === id);
             let percentage = county['bachelorsOrHigher'];

             if(percentage <= 15) { 
                 return 'red';
             } else if (percentage <= 50) {
                 return 'green';
             } else if (percentage <= 75){
                 return 'orange';
             } else { return 'violet'}
         }) */
        .attr('fill', (dataItem) => {
            let id = dataItem['id'];
            let county = educationData.find((item) => item['fips'] === id);
            let percentage = county['bachelorsOrHigher'];
            return legendThreshold(percentage);
        })
        .attr('data-fips', (dataItem) => dataItem['id'])
        .attr('data-education', (dataItem) => {
            let id = dataItem['id'];
            let county = educationData.find((item) => item['fips'] === id);
            let percentage = county['bachelorsOrHigher'];
            return percentage;
        })
        .on('mouseover', (Event, dataItem) => {


            //tooltip.style("opacity", 0.9);
            let id = dataItem['id'];
            let county = educationData.find((item) => item['fips'] === id);
            let countyName = county['area_name'];
            let percentage = county['bachelorsOrHigher'];
            tooltip.transition()
                .style("opacity", "0.9");
            tooltip.attr("data-education", percentage)
            tooltip.html(countyName + " : " + percentage)
                .style('left', Event.pageX + 'px')
                .style('top', Event.pageY - 40 + 'px');
        })
        .on('mouseout', function () {
            tooltip.style('opacity', 0);
        })

    let legendDomain = d3.range(minPercentage, maxiPercentage, (maxiPercentage - minPercentage) / 8)
    let legend = d3.select("body")
        .append("svg")
        .attr("id", "legend")
        .attr("height", legendHeight)
        .attr("width", legendWidth)

    let legendXScale = d3.scaleLinear()
        .domain([d3.min(legendDomain), d3.max(legendDomain)])
        .range([legendMargin.left, legendWidth - legendMargin.right])
    let legendXAxis = d3.axisBottom(legendXScale)
        .tickValues(legendDomain)
        .tickFormat(d3.format('.1f'));
    legend.append("g")
        .attr("transform",
            "translate(0," + (legendHeight - legendMargin.bottom) + ")")
        .call(legendXAxis)
        .attr("id", "y-legend")
    legendCellWidth = (legendWidth - 2 * margin.right) / legendDomain.length
    legend.selectAll("rect")
        .data(legendDomain)
        .enter()
        .append("rect")
        .attr("class", "legend")
        .attr("height", 50)
        .attr("width", legendCellWidth)
        .attr("x", (value, index) => legendMargin.left + index * legendCellWidth)
        .attr("y", legendHeight - legendMargin.bottom - 50)
        .attr("fill", (value) => legendThreshold(value))

}

d3.json(mapURL).then(
    (data, error) => {
        if (error) {
            console.log(error);
        } else {
            // Convert Topojson objects to geojson objects
            // and extract the features array containing the information about
            // the Geometrie and the id
            mapData = topojson.feature(data, data.objects.counties).features;
            console.log("mapData");
            console.log(mapData);

            d3.json(dataURL).then((data, error) => {
                if (error) {
                    console.log(error);
                } else {
                    educationData = data;
                    percentageArr = educationData.reduce((acc, curValue) => {
                        let perc = curValue['bachelorsOrHigher'];
                        acc.push(perc);
                        return acc;
                    }, [])
                    minPercentage = Math.min.apply(null, percentageArr);
                    maxiPercentage = Math.max.apply(null, percentageArr);
                    console.log("Education Data")
                    console.log(data);
                    console.log(percentageArr, minPercentage, maxiPercentage);
                    drawMap();
                }
            })
        }
    })
