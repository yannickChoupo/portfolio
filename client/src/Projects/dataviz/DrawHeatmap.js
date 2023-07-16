import * as d3 from 'd3';


const DrawHeatmap = (svg, curData) => {
    console.log("drw hwatmap");
    const data = curData;

    const margin = {
        "left": 60,
        "right": 40,
        "bottom": 40,
        "top": 40
    }
    // sort the Data per year+
    // return an arry in Format { "year":[ {"month":..., "variance":...}, {...} ], ...}
    let dataPerYearObj = data.monthlyVariance.reduce((acc, item) => {
        if (acc[item.year] == null) {
            acc[item.year] = [];
        }
        acc[item.year].push({ "month": item.month, "variance": item.variance });
        return acc
    }, {});

    // Extract the base Temperature from the the reponse Datas
    const { baseTemperature, monthlyVariance } = data;
    console.log(monthlyVariance);

    // format the data object in array of object with the year and the data as keys
    let dataPerYearArr = [];
    for (const year of Object.keys(dataPerYearObj)) {
        let newData = { year: parseInt(year), data: dataPerYearObj[year] };
        dataPerYearArr.push(newData);
    }

    // store the years values in an array
    let yearsArr = dataPerYearArr.reduce((acc, curValue) => {
        acc.push(curValue.year)
        return acc;
    }, [])

    // sort the data object in an ascending order and store it the values 
    // use to  generate the visualisation
    let values = dataPerYearArr.sort((a, b) => a.year - b.year);
    monthlyVariance.map((item, index) => {
        let temperature = (baseTemperature + item.variance);
        item.temperature = temperature.toFixed(1);
        item.index = yearsArr.indexOf(item.year);
        item.year = new Date(item.year, 0, 0, 0, 0, 0);
        return item;
    })

    // store the year-values as date object
    values.forEach((data) => {
        data.year = new Date(data.year, 0, 0, 0, 0, 0);
        return data;
    })

    values = values.reduce((result, curYear, index) => {
        let { data } = curYear;
        data.forEach((item) => {
            item.year = curYear.year;
            let temperature = (baseTemperature + item.variance);
            item.temperature = temperature.toFixed(1);

            item.index = 1
            return item;
        })
        result.push(...data)
        return result;
    }, []);

    let svgWidth = margin.left + margin.right + 5 * yearsArr.length;
    let svgHeight = 600;
    d3.select(".svg-container").style("overflow", "auto");
    svg.attr("width", svgWidth)
        .attr("height", svgHeight)
        .style("background-color", "white")
        .style("color", "black")

    svg.append("text")
        .text("Monthly Global Land-Surface Temperature")
        .attr("x", svgWidth / 2)
        .attr("y", "3ch")
        .attr("text-anchor", "middle")
        .style("font-size", "1.1em")

    svg.append("text")
        .text("1753 - 2015: base temperature 8.66℃")
        .attr("x", svgWidth / 2)
        .attr("y", "6ch")
        .attr("text-anchor", "middle")
        .style("font-size", ".9em")


    svg.append("text")
        .style("font-size", ".8em")
        .attr("transform", "rotate(-90)")
        .style("font-family", "roboto")
        .style("fill", "black")
        .attr("x", -svgHeight / 2 + "px")
        .attr("y", margin.left + "px")
        .style("text-anchor", "middle")
        .text("Months")

    svg.append("text")
        .style("font-size", ".8em")
        .style("font-family", "roboto")
        .style("fill", "black")
        .attr("x", (svgWidth / 2) + "px")
        .attr("y", (svgHeight - margin.bottom) + "px")
        .style("text-anchor", "middle")
        .text("Years")

    // Scale
    let yScale,
        xAxisScale,
        yAxisScale,
        xAxis,
        yAxis;
    yAxisScale = d3.scaleBand().domain(["January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October", "November",
        "December"])
        .range([2 * margin.top, svgHeight - 2 * margin.bottom]);
    xAxisScale = d3.scaleTime()
        .domain([d3.min(values, (item) => item.year), d3.max(values, (item) => item.year)])
        .range([2 * margin.left, svgWidth - margin.right]);

    yScale = d3.scaleLinear()
        .domain([0, 12])
        .range([2 * margin.top, svgHeight - 2 * margin.bottom]);

    xAxis = d3.axisBottom(xAxisScale)
        .tickFormat(d3.timeFormat('%Y'))
    yAxis = d3.axisLeft(yAxisScale)



    svg.append("g")
        .call(xAxis)
        .attr("id", "x-axis")
        .attr("transform", "translate(0," + (svgHeight - 2 * margin.bottom) + ")")

    svg.append("g")
        .call(yAxis)
        .attr("id", "y-axis")
        .attr("transform", "translate(" + 2 * margin.left + ",0)")
    let cellHeight, cellWidth;
    let legendWidth = 400;

    const monthArr = ["January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October", "November",
        "December"]
    let legendColors = [
        "white",
        "rgb(69, 117, 180)",
        "rgb(116, 173, 209)",
        "rgb(171, 217, 233)",
        "rgb(224, 243, 248)",
        "rgb(255, 255, 191)",
        "rgb(254, 224, 144)",
        "rgb(253, 174, 97)",
        "rgb(215, 48, 39)",
        "rgb(165, 0, 38)",
        "white"
    ]

    const rects = svg.append("g").attr("id", "rects")

    const tooltipGroup = svg.append("g")
        .style("display", "none")
        .attr("id", "tooltip-group");
    const tootlipContainer = tooltipGroup.append("rect")
        .attr("id", "tooltip-container")
    const tooltipText = tooltipGroup.append("text")
        .attr("id", "tooltip-text")
        .attr("x", "2ch")
        .attr("y", "-1ch")
        .style("display", "none");
    tooltipText.append("tspan")
        .attr("class", "lineOne")
        .style("color", "white")
    tooltipText.append("tspan").attr("class", "lineTwo")
    tooltipText.append("tspan").attr("class", "lineThree")




    cellHeight = yAxisScale.bandwidth();
    cellWidth = (svgWidth - 2 * margin.left - margin.right) / yearsArr.length;
    let tempArr = monthlyVariance.reduce((acc, curData) => {
        acc.push(curData.temperature)
        return acc;
    }, []);

    let minTemp = Math.min.apply(null, tempArr);
    let maxTemp = Math.max.apply(null, tempArr);

    let legendThreshold = d3.scaleThreshold().domain(((min, max, count) => {
        let array = [];
        let step = (max - min) / count;
        let base = min;
        for (let i = 1; i < count; i++) {
            array.push(base + i * step);
        }
        return array;
    })(minTemp, maxTemp, legendColors.length)).range(legendColors);

    let legendDomain = [...legendThreshold.domain()]

    let legend = svg.append("g")
        .attr("id", "legend")
        .attr("transform", `translate(${2 * margin.left},${svgHeight - margin.bottom / 2})`)

    let legendXScale = d3.scaleLinear()
        .domain([minTemp, maxTemp])
        .range([0, legendWidth])

    let legendXAxis = d3.axisBottom(legendXScale)
        .tickValues(legendDomain)
        .tickFormat(d3.format('.1f'));

    legend.append("g")
        .call(legendXAxis)
        .attr("id", "y-legend");

    let legendCellWidth = (legendWidth) / legendColors.length;
    const legendCells = legend.append("g")

    rects.selectAll("rect")
        .data(monthlyVariance)
        .enter()
        .append("rect")
        .attr("class", "rect")
        .attr("cursor", "pointer")
        .attr("height", cellHeight)
        .attr("width", cellWidth)
        .attr("x", (d, idx) => 2 * margin.left + d.index * cellWidth)
        .attr("y", (d, idx) => yScale(d.month) - yAxisScale.bandwidth())
        .attr("class", "cell")
        .attr("data-month", (item) => item.month - 1)
        .attr("data-year", (item) => item.year.getFullYear() + 1)
        .attr("data-temp", (item) => item.temperature)
        .attr("fill", (item) => legendThreshold(item.temperature))
        .on('mouseover', function (event, d) {
            d3.select(this).style("stroke-width", "1").style("stroke", "black")
            tooltipGroup
                .style("display", "block")
                .attr("transform", `translate(${d3.select(this).attr("x")} , ${d3.select(this).attr("y")})`)


            let tooltipTextLength;
            tooltipText.select(".lineOne")
                .attr("fill", "white")
                .text(d.year.getFullYear() + " - " + monthArr[d.month - 1])
                .attr("x", "0")
                .attr("y", "0")
                .attr("dy", "-4.8ch")
                .style("text-anchor", "middle")
                .each(function (params) {
                    var self = d3.select(this);
                    tooltipTextLength = self.node().getComputedTextLength();
                })

            tooltipText
                .style("display", "block")
            tooltipText.select(".lineTwo")
                .attr("fill", "white")

                .text(d.temperature)
                .style("text-anchor", "left")
                .attr("x", "0")
                .attr("y", "0")
                .attr("dy", "-2.8ch")

                .style("text-anchor", "middle")


            tooltipText.select(".lineThree")
                .attr("fill", "white")
                .text(d.variance)
                .attr("x", "0")
                .attr("y", "0")
                .attr("dy", "-.8ch")
                .style("text-anchor", "middle")

            tootlipContainer
                .attr("width", (tooltipTextLength + 32) + "px")
                .attr("height", "7ch")
                .attr("x", -tooltipTextLength / 2 - 16)
                .attr("y", "-7ch")
                .attr("rx", "6")
                .attr("ry", "6")
                .attr("fill", "rgba(0, 0, 0, 0.8)")

        })
        .on('mouseout', function () {
            tooltipGroup.style("display", "none")
            d3.select(this).style("stroke-width", "0").style("stroke", "none")
        })

    legendCells.selectAll("rect")
        .data(legendDomain)
        .enter()
        .append("rect")
        .attr("class", "legend")
        .attr("height", 2 * legendCellWidth / 3)
        .attr("width", legendCellWidth)
        .attr("x", (value, index) => legendCellWidth + index * legendCellWidth)
        .attr("y", -2 * legendCellWidth / 3)
        .attr("fill", (value) => legendThreshold(value))
}

export default DrawHeatmap;