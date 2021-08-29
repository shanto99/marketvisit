import React from "react";
import Chart from "react-apexcharts";

class WebsiteVisitChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
                }
            },
            series: [
                {
                    name: "series-1",
                    data: [30, 40, 45, 50, 49, 60, 70, 91]
                }
            ]
        };
    }

    render() {
        return (
            <Chart
                options={this.state.options}
                series={this.state.series}
                type="area"
                width="100%"
                height="100%"
            />
        );
    }
}

export default WebsiteVisitChart;