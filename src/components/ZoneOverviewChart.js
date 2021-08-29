import React from "react";
import Chart from "react-apexcharts";

class ZoneOverviewChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
            },
            series: [44, 55, 41, 17, 15],
            labels: ['A', 'B', 'C', 'D', 'E']
        }
    }

    render() {
        return (
            <Chart options={this.state.options} width="100%" height="100%"
                   series={this.state.series} type="donut" />
        );
    }
}

export default ZoneOverviewChart;