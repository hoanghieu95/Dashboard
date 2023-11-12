"use client";

import { yearlyAnalyticsChartOptions } from "@/utils/config";
import ReactApexChart from "react-apexcharts";

const daysArray = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
];

function getValues(products, getDay) {
  if (products.filter((item) => item.day === getDay).length === 0) return 0;

  return products
    .filter((item) => item.day === getDay)
    .reduce((acc, productItem) => acc + productItem.days, 0);
}



export default function YearlyAnalyticsChart({ allProducts, socket }) {
  console.log(allProducts);

  socket.on("data", (data) => {
      console.log(data);
  

    });

  const ProdSensorHeat = allProducts
    ? allProducts.filter((p, i) => p.type.idType == "cbnd1")
    : [];
  const series = [
    {
      name: "Temperature",
      data: daysArray.map((item) => getValues(allProducts, item)),
    },
  ];

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7 pb-7 shadow sm:px-7.5 xl:col-span-8">
      <div className="flex w-full flex-col flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <p className="font-bold text-primary">Temperature Chart</p>
        <div className="w-full">
          <div id="YearlyAnalyticsChart" className="-ml-5">
            <ReactApexChart
              options={yearlyAnalyticsChartOptions}
              series={series}
              type="area"
              height={350}
            />
            <div>
              <p>
              {/* {ProdSensorHeat ? ProdSensorHeat.map((p) => ({
                ...p,
              })) : ""} */}
              </p>
              {console.log(ProdSensorHeat)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
