"use client";
import { useEffect, useState } from "react";
import { yearlyAnalyticsChartOptions } from "@/utils/config";
import ReactApexChart from "react-apexcharts";

const SensorDisplay = ({ label, value, unit, bg }) => (
  <div className="flex items-center">
    <div className={`mr-2 w-1/2`}>
      Current {label}: {typeof value === "object" ? "N/A" : value} {unit}
    </div>
    {/* <div className="w-1/2">
      <button className={`h-3 w-5 bg-${bg} ml-auto mr-4`} />
      {label}
    </div> */}
  </div>
);

Date.prototype.getWeek = function () {
  var onejan = new Date(this.getFullYear(), 0, 1);
  var millisecsInDay = 86400000;
  return Math.ceil(
    ((this - onejan) / millisecsInDay + onejan.getDay() + 1) / 7
  );
};

export default function YearlyAnalyticsChart({
  allProducts,
  allHistories,
  socket,
}) {
  const [tempValue, setTempValue] = useState(null);
  const [humiValue, setHumiValue] = useState(null);
  const [tempData, setTempData] = useState([]);
  const [humiData, setHumiData] = useState([]);

  const [tooltipData, setTooltipData] = useState({
    Temperature: null,
    Humidity: null,
  });
  

  useEffect(() => {
    const handleSensorData = (message) => {
        const dataSensor = JSON.parse(message);

        const temp = dataSensor.temp;
        const humi = dataSensor.humi;

        setTempValue(temp);
        setHumiValue(humi);

        setTempData((prevTempData) => {
          return [
            ...prevTempData,
            { x: new Date().getTime(), y: temp }, // Thêm dữ liệu mới vào mảng
          ];
        });

        setHumiData((prevHumiData) => {
          return [
            ...prevHumiData,
            { x: new Date().getTime(), y: humi }, // Thêm dữ liệu mới vào mảng
          ];
        });

        setTooltipData({
          Temperature: temp,
          Humidity: humi,
        });
       
    };

    socket.on("sensor", handleSensorData);

    return () => {
      socket.off("sensor", handleSensorData);
    };
  }, [socket]);

  const updatedOptions = {
    ...yearlyAnalyticsChartOptions,
    xaxis: {
      show: false,
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function () {
              return "Temperature";
            },
          },
          marker: {
            show: false,
          },
        },
        {
          title: {
            formatter: function () {
              return "Humidity";
            },
          },
          marker: {
            show: false,
          },
        },
      ],
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return tooltipData[series[seriesIndex].name];
      },
    },
  };
  

  const series = [
    {
      name: "Temperature",
      data: tempData.map(dataPoint => dataPoint.y).slice(-10),
    },
    {
      name: "Humidity",
      data: humiData.map(dataPoint => dataPoint.y).slice(-10),
    },
  ];

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7 pb-7 shadow sm:px-7.5 xl:col-span-8">
      <div className="flex w-full flex-col flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <p className="font-bold text-primary">Temperature Chart</p>
        <div className="w-full">
          <div id="YearlyAnalyticsChart" className="-ml-5">
            <ReactApexChart
              options={updatedOptions}
              series={series}
              type="line"
              height={380}
            />
          </div>
          <div className="ms-3 font-bold text-primary">
            <div>
              <SensorDisplay
                label="Temperature"
                value={tempValue}
                unit="độ C"
                bg="red"
              />
              <SensorDisplay label="Humidity" value={humiValue} unit="%" bg="secondary"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
