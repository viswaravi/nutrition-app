import rd3 from "react-d3-library";
import { useState, useEffect } from "react";
const PieChartD3 = rd3.PieChart;

function PieChart() {
  const [chartData, setChartData] = useState(null);

  const initData = () => {
    const data = {};

    // Labels are displayed in component, quantities are calculated to define size of each slice
    data.dataSet = [
      { label: "dogs", quantity: 140 },
      { label: "cats", quantity: 91 },
      { label: "hamsters", quantity: 88 },
      { label: "parrots", quantity: 74 },
      { label: "rabbits", quantity: 63 },
      { label: "iguanas", quantity: 50 },
      { label: "dragons", quantity: 65 },
    ];

    // Colors for each slice
    data.colors = [
      "blue",
      "orange",
      "purple",
      "green",
      "red",
      "yellow",
      "lemonChiffon",
    ];

    //Define the width of the svg element on the page
    data.width = 960;

    //Define the actual height(diameter) of the pie chart, this should not be larger than the width
    data.height = 700;

    //Define a class for the svg element for styling
    data.arcClass = "arc";

    setChartData(data);
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <div className="barChart-container">
      <PieChartD3 data={chartData} />
    </div>
  );
}

export default PieChart;
