import * as d3 from "d3";

type GDPDataItem = [
    string,
    number
];

interface GDPData {
    data: GDPDataItem[];
    source_name?: string;
    source_url?: string;
}

const DrawChart = (
    svg: d3.Selection<
        SVGSVGElement,
        unknown,
        null,
        undefined
    >,
    curData: GDPData
): void => {
    // Get data
    const data: GDPDataItem[] = [
        ...curData.data
    ];

    const padding = 40;

    let svgWidth: number;
    const svgHeight = 600;

    /*
     * Get #dataviz width
     */
    const dataviz = document.querySelector(
        "#dataviz"
    );

    if (!dataviz) {
        console.error(
            "#dataviz element not found"
        );
        return;
    }

    const windowWidth = parseFloat(
        window
            .getComputedStyle(dataviz)
            .getPropertyValue("width")
    );

    /*
     * Set SVG width
     */
    if (windowWidth < 600) {
        d3.select(".svg-container")
            .style("overflow", "auto");

        svgWidth = 960;
    } else {
        svgWidth = windowWidth;
    }

    /*
     * Scales
     */
    const maxGDP =
        d3.max(data, (item) => item[1]) ?? 0;

    const xScale = d3
        .scaleLinear()
        .domain([0, data.length - 1])
        .range([
            padding,
            svgWidth - 10
        ]);

    const heightScale = d3
        .scaleLinear()
        .domain([0, maxGDP])
        .range([
            0,
            svgHeight - 2 * padding
        ]);

    /*
     * SVG
     */
    svg
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .style(
            "background-color",
            "white"
        )
        .style("color", "black");

    /*
     * Header
     */
    svg
        .append("text")
        .style("font-size", "1.3em")
        .style("fill", "black")
        .attr(
            "x",
            svgWidth / 2 - 50
        )
        .attr("y", 30)
        .text("United States GDP")
        .attr("id", "header");

    /*
     * More information
     */
    svg
        .append("text")
        .style("font-size", ".5em")
        .style("fill", "black")
        .attr(
            "x",
            svgWidth - 6 * padding
        )
        .attr(
            "y",
            svgHeight - padding / 4
        )
        .text(
            "More Information: http://www.bea.gov/national/pdf/nipaguid.pdf"
        );

    /*
     * Y-axis label
     */
    svg
        .append("text")
        .style("font-size", ".7em")
        .attr(
            "transform",
            "rotate(-90)"
        )
        .style(
            "font-family",
            "roboto"
        )
        .style("fill", "black")
        .attr(
            "x",
            -svgHeight / 2
        )
        .attr(
            "y",
            padding + 16
        )
        .style(
            "text-anchor",
            "middle"
        )
        .text(
            "Gross Domestic Product"
        );

    /*
     * Dates
     */
    const datesArray = data.map(
        (item) => new Date(item[0])
    );

    const minDate =
        d3.min(datesArray);

    const maxDate =
        d3.max(datesArray);

    if (!minDate || !maxDate) {
        console.error(
            "Invalid GDP date data"
        );
        return;
    }

    /*
     * X axis scale
     */
    const xAxisScale = d3
        .scaleTime()
        .domain([
            minDate,
            maxDate
        ])
        .range([
            padding,
            svgWidth - 10
        ]);

    /*
     * Y axis scale
     */
    const yAxisScale = d3
        .scaleLinear()
        .domain([0, maxGDP])
        .range([
            svgHeight - padding,
            padding
        ]);

    /*
     * Axes
     */
    const xAxis =
        d3.axisBottom(xAxisScale);

    const yAxis =
        d3.axisLeft(yAxisScale);

    svg
        .append("g")
        .call(xAxis)
        .attr("id", "x-axis")
        .attr(
            "transform",
            `translate(0, ${
                svgHeight - padding
            })`
        );

    svg
        .append("g")
        .call(yAxis)
        .attr("id", "y-axis")
        .attr(
            "transform",
            `translate(${padding},0)`
        );

    /*
     * SVG container
     */
    const body =
        d3.select(".svg-container");

    body.style(
        "overflow",
        "auto"
    );

    /*
     * Tooltip
     */
    const tooltip =
        body
            .append("div")
            .attr("id", "tooltip")
            .style(
                "position",
                "relative"
            )
            .style("color", "black")
            .style(
                "background-color",
                "lightsteelblue"
            )
            .style(
                "width",
                "fit-content"
            )
            .style(
                "padding",
                ".5em"
            )
            .style(
                "border-radius",
                "6px"
            )
            .style(
                "box-shadow",
                "1px 1px 10px"
            )
            .style(
                "display",
                "none"
            );

    /*
     * Rectangle group
     */
    const rect = svg
        .append("g")
        .attr("id", "rects")
        .attr(
            "fill",
            "rgb(51, 173, 255)"
        );

    /*
     * Get quarter
     */
    const getQuarter = (
        month: number
    ): string => {
        if (month <= 3) {
            return "Q1";
        }

        if (month <= 6) {
            return "Q2";
        }

        if (month <= 9) {
            return "Q3";
        }

        return "Q4";
    };

    /*
     * Bars
     */
    rect
        .selectAll<SVGRectElement, GDPDataItem>(
            "rect"
        )
        .data(data)
        .enter()
        .append("rect")
        .attr(
            "x",
            (_item, index) =>
                xScale(index)
        )
        .attr(
            "y",
            (item) =>
                svgHeight -
                padding -
                heightScale(item[1])
        )
        .attr(
            "width",
            (svgWidth -
                2 * padding) /
                data.length
        )
        .attr(
            "height",
            (item) =>
                heightScale(item[1])
        )
        .style(
            "cursor",
            "pointer"
        )
        .on(
            "mouseover",
            function (
                event: MouseEvent,
                d: GDPDataItem
            ) {
                d3.select(this)
                    .attr("fill", "white");

                const pointer =
                    d3.pointer(event);

                const [dateString, gdpValue] =
                    d;

                const dateParts =
                    dateString.split("-");

                const year =
                    dateParts[0];

                const month =
                    Number(dateParts[1]);

                const quarter =
                    getQuarter(month);

                const yearString =
                    gdpValue.toString();

                const gdp =
                    yearString.length > 5
                        ? yearString.slice(
                              0,
                              yearString.length - 5
                          ) +
                          "," +
                          yearString.slice(
                              yearString.length - 5
                          )
                        : yearString;

                tooltip
                    .style(
                        "display",
                        "block"
                    )
                    .style(
                        "top",
                        `${-svgHeight / 2}px`
                    )
                    .style(
                        "left",
                        pointer[0] >
                            svgWidth - 150
                            ? `${
                                  pointer[0] -
                                  150
                              }px`
                            : `${pointer[0]}px`
                    )
                    .html(`
                        <div class="tooltip">
                            <div>
                                ${year} ${quarter}
                            </div>
                            <div>
                                $${gdp} Billion
                            </div>
                        </div>
                    `)
                    .selectAll("div")
                    .style(
                        "text-align",
                        "center"
                    );
            }
        )
        .on(
            "mouseout",
            function () {
                tooltip.style(
                    "display",
                    "none"
                );

                d3.select(this).attr(
                    "fill",
                    "rgb(51, 173, 255)"
                );
            }
        );
};

export default DrawChart;