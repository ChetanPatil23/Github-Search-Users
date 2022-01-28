// STEP 1 - Include Dependencies
// Include react
import React from "react";
// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

// STEP 2 - Chart Data
// const chartData = [
//   {
//     label: "HTML",
//     value: "290",
//   },
//   {
//     label: "CSS",
//     value: "260",
//   },
//   {
//     label: "JS",
//     value: "180",
//   },
// ];

// STEP 3 - Creating the JSON object to store the chart configurations

const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: "pie3d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Stars per language",
        theme: "candy",
        doughnutRadius:"45%",
        decimals:0,
        showPercentValues:0
      },
      // Chart Data
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;

