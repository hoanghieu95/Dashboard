"use client";
import { useEffect, useState } from "react";
import { visitorAnalyticsChartOptions } from "@/utils/config";
import ReactApexChart from "react-apexcharts";

const SensorDisplay = ({ label, value, unit }) => (
  <div className="flex items-center">
    <div className={`mr-2 w-1/2`}>
      Current {label}:{" "}
      {typeof value === 'object' ? "N/A" : value} {unit}
    </div>
    <div className="w-1/2">
      <button className={`h-3 w-5 bg-secondary ml-auto mr-4`} />
      {label}
    </div>
  </div>
);


export default function VisitorsAnalytics({
  allVisitors,
  allProducts,
  allHistories,
  socket,
}) {
  const [gasValue, setGasValue] = useState({});
  const [gasData, setGasData] = useState([]);

  useEffect(() => {
    const handleSensorData = (message) => {
      const data = JSON.parse(message);
      const gas = data.gas;

      setGasValue(gas);

      setGasData((prevGasData) => {
        return [
          ...prevGasData,
          { x: new Date().getTime(), y: gas }, // Thêm dữ liệu mới vào mảng
        ];
      });
    };

    socket.on("sensor", handleSensorData);

    return () => {
      socket.off("sensor", handleSensorData);
    };
  }, [socket]);

  const series = [
    {
      name: "Gas",
      data: gasData.map(dataPoint => dataPoint.y),
    },
  ];  

  const updatedOptions = {
    ...visitorAnalyticsChartOptions,
    xaxis: {
      type: [],
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7 pb-7 shadow sm:px-7.5 xl:col-span-4">
      <div className="flex w-full flex-col flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <p className="font-bold text-primary">Air Chart</p>
        <div className="w-full">
          <div id="YearlyAnalyticsChart" className="-ml-5">
            <ReactApexChart
              options={updatedOptions}
              series={series}
              type="line"
              height={350}
            />
          </div>
          <div className="ms-3 font-bold text-primary">
            <div>
              <SensorDisplay label="Gas" value={gasValue} unit="%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
