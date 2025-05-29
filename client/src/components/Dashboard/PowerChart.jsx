import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const PowerChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://grid-dashboard-2-0-1.onrender.com/api/power-data");
        setChartData(response.data);
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-80 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!chartData) {
    return (
      <div className="h-80 flex items-center justify-center">
        <p className="text-gray-500">Failed to load chart data</p>
      </div>
    )
  }

  const options = {
    chart: {
      type: "line",
      height: 320,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#3B82F6", "#10B981", "#F59E0B"],
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => value.toFixed(2),
      },
    },
    legend: {
      position: "bottom",
    },
    grid: {
      borderColor: "#E5E7EB",
    },
    tooltip: {
      y: {
        formatter: (value) => value.toFixed(2),
      },
    },
  };

  return (
    <div className="w-full">
      <Chart
        options={options}
        series={chartData.series}
        type="line" height={320}
      />
    </div>
  )
}

export default PowerChart;