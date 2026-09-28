import React, {
    useEffect,
    useMemo,
    useRef,
} from "react";
import * as d3 from "d3";

// import type {
//     Todo,
// } from "../../pages/Admin/types/admin.types";
import type { ProjectRequirement, ProjectTodo } from "../union/Union";

type GanttChartProps = {
    requirements: ProjectRequirement[];
};

type GanttStatus =
    | "DONE"
    | "IN_PROGRESS"
    | "TODO";

interface GanttItem {
    id: string;
    name: string;
    start: Date;
    end: Date;
    status: GanttStatus;
    repository: string;
    todos: ProjectTodo[];
}

const calculateStatus = (
    todos: ProjectTodo[]
): GanttStatus => {
    if (todos.length === 0) {
        return "TODO";
    }

    const completed = todos.filter(
        (todo) => todo.status === "DONE"
    ).length;

    const inProgress = todos.filter(
        (todo) => todo.status === "IN_PROGRESS"
    ).length;

    if (completed === todos.length) {
        return "DONE";
    }

    if (completed > 0 || inProgress > 0) {
        return "IN_PROGRESS";
    }

    return "TODO";
};

const GanttChart: React.FC<GanttChartProps> = ({
    requirements,
}) => {
    const svgRef =
        useRef<SVGSVGElement | null>(null);

    const items = useMemo<GanttItem[]>(() => {
        const startDate = new Date(
            "2026-09-07T00:00:00"
        );

        let currentDate = new Date(
            startDate
        );

        return requirements
            .filter(
                (requirement) =>
                    Boolean(requirement.number)
            )
            .map((requirement) => {
                const todos =
                    requirement.todos ?? [];

                /*
                 * Temporary generated duration.
                 *
                 * Later this can be replaced with
                 * real start/end dates from MongoDB.
                 */
                const duration = Math.max(
                    todos.length * 2,
                    5
                );

                const start =
                    new Date(currentDate);

                const end =
                    new Date(start);

                end.setDate(
                    end.getDate() + duration
                );

                const item: GanttItem = {
                    id: String(requirement.number)!,
                    name: requirement.title,
                    start,
                    end,
                    status:
                        calculateStatus(todos),
                    repository:
                        requirement.state ??
                        "OPEN",
                    todos,
                };

                /*
                 * Gap before next requirement.
                 */
                currentDate =
                    new Date(end);

                currentDate.setDate(
                    currentDate.getDate() + 2
                );

                return item;
            });
    }, [requirements]);

    useEffect(() => {
        if (!svgRef.current) {
            return;
        }

        const svg = d3.select(
            svgRef.current
        );

        svg.selectAll("*").remove();

        if (items.length === 0) {
            return;
        }

        /*
         * Chart dimensions.
         */
        const margin = {
            top: 25,
            right: 30,
            bottom: 45,
            left: 200,
        };

        const width = 1000;
        const rowHeight = 42;

        const height =
            margin.top +
            margin.bottom +
            items.length *
            rowHeight;

        svg
            .attr(
                "viewBox",
                `0 0 ${width} ${height}`
            )
            .attr("width", "100%")
            .attr("height", height);

        /*
         * Date range.
         */
        const minDate = d3.min(
            items,
            (item) => item.start
        );

        const maxDate = d3.max(
            items,
            (item) => item.end
        );

        if (!minDate || !maxDate) {
            return;
        }

        /*
         * Small padding around timeline.
         */
        const domainStart =
            d3.timeDay.offset(
                minDate,
                -1
            );

        const domainEnd =
            d3.timeDay.offset(
                maxDate,
                1
            );

        const x = d3
            .scaleTime()
            .domain([
                domainStart,
                domainEnd,
            ])
            .range([
                margin.left,
                width -
                margin.right,
            ]);

        /*
         * Rows.
         */
        const y = d3
            .scaleBand<string>()
            .domain(
                items.map(
                    (item) => item.id
                )
            )
            .range([
                margin.top,
                margin.top +
                items.length *
                rowHeight,
            ])
            .padding(0.25);

        const chart =
            svg.append("g");

        /*
         * X axis.
         */
        const formatDate =
            d3.timeFormat("%d %b");

        const xAxis = d3
            .axisBottom(x)
            .ticks(
                d3.timeWeek.every(1)
            )
            .tickFormat(
                (value) => {
                    const date =
                        value instanceof Date
                            ? value
                            : new Date(
                                value.valueOf()
                            );

                    return formatDate(
                        date
                    );
                }
            );

        chart
            .append("g")
            .attr(
                "class",
                "gantt-axis"
            )
            .attr(
                "transform",
                `translate(0,${margin.top +
                items.length *
                rowHeight
                })`
            )
            .call(xAxis);

        /*
         * Grid.
         */
        chart
            .append("g")
            .attr(
                "class",
                "gantt-grid"
            )
            .attr(
                "transform",
                `translate(0,${margin.top +
                items.length *
                rowHeight
                })`
            )
            .call(
                d3
                    .axisBottom(x)
                    .ticks(
                        d3.timeWeek.every(
                            1
                        )
                    )
                    .tickSize(
                        -items.length *
                        rowHeight
                    )
                    .tickFormat(
                        () => ""
                    )
            );

        /*
         * Requirement names.
         */
        chart
            .append("g")
            .attr("class", "gantt-labels")
            .selectAll("text")
            .data(items)
            .join("text")
            .attr("class", "gantt-label")
            .attr("x", margin.left - 15)
            .attr("y", (item) => {
                const position = y(item.id);
                return (position ?? 0) + y.bandwidth() / 2;
            })
            .attr("text-anchor", "end")
            .attr("dominant-baseline", "middle")
            .attr("fill", "currentColor")
            .text((item) => {
                return item.name
            });

        /*
         * Bars.
         */
        const bars =
            chart
                .append("g")
                .attr(
                    "class",
                    "gantt-bars"
                );

        const bar =
            bars
                .selectAll("rect")
                .data(items)
                .join("rect")
                .attr(
                    "class",
                    (item) =>
                        `gantt-bar gantt-bar-${item.status.toLowerCase()}`
                )
                .attr(
                    "x",
                    (item) =>
                        x(item.start)
                )
                .attr(
                    "y",
                    (item) =>
                        y(item.id) ?? 0
                )
                .attr(
                    "width",
                    (item) =>
                        Math.max(
                            3,
                            x(item.end) -
                            x(
                                item.start
                            )
                        )
                )
                .attr(
                    "height",
                    y.bandwidth()
                )
                .attr(
                    "rx",
                    5
                );

        /*
         * Tooltip.
         */
        bar
            .append("title")
            .text((item) => {
                const format =
                    d3.timeFormat(
                        "%d %b %Y"
                    );

                return [
                    item.name,
                    `Repository: ${item.repository}`,
                    `${format(
                        item.start
                    )} → ${format(
                        item.end
                    )}`,
                    `Status: ${item.status}`,
                    `Todos: ${item.todos.length}`,
                ].join("\n");
            });
    }, [items]);

    return (
        <div className="gantt-chart">
            <svg ref={svgRef} />
        </div>
    );
};

export default GanttChart;