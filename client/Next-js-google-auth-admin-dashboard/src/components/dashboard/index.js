"use client";

import Card from "../card";
import { FaGauge, FaProductHunt } from "react-icons/fa6";
import { WiThermometer } from "react-icons/wi";
import { MdCircleNotifications } from "react-icons/md";
import YearlyAnalyticsChart from "../YearlyAnalyticsChart";
import VisitorsAnalytics from "../VisitorsAnalytics";
import DeviceAnalytics from "../DeviceAnalytics";
import { useEffect, useState } from "react";

import { io } from "socket.io-client";

export default function DashboardLayout({
  allVisitors,
  allProducts,
  allHistories,
}) {
  console.log(allProducts, allVisitors, allHistories);
  const socket = io.connect("http://localhost:3001");
  const [notiCount, setNotiCount] = useState(
    allVisitors
      ? allVisitors.filter((visitor) => visitor.visitors).length
      : 0
  );

  const ProdSensorAir = allProducts
    ? allProducts.filter((p, i) => p.type.idType === "cbkk1")
    : [];
  const ProdSensorHeat = allProducts
    ? allProducts.filter((p, i) => p.type.idType == "cbnd1")
    : [];

  const productCount = allProducts
    ? Array.from(new Set(allProducts.map((p) => p.id))).length
    : 0;

  const sensorAirCount = ProdSensorAir
    ? Array.from(new Set(ProdSensorAir.map((p) => p.id))).length
    : 0;

  const sensorHeatCount = ProdSensorHeat
    ? Array.from(new Set(ProdSensorHeat.map((p) => p.id))).length
    : 0;

    useEffect(() => {
      const handleNotiData = (message) => {
        const notiSensor = JSON.parse(message);
        setNotiCount((prevCount) => prevCount + 1);
      };

      socket.on("notification", handleNotiData);

      return () => {
        socket.off("notification", handleNotiData);
      };
    }, [socket]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7">
        <Card
          data={productCount}
          icon={<FaProductHunt size={25} />}
          label={"Total Products"}
        />
        <Card
          data={notiCount}
          label={"Total Notifications"}
          icon={<MdCircleNotifications size={25} />}
        />
        <Card
          icon={<FaGauge size={25} />}
          data={sensorAirCount}
          label={"Total air sensors"}
        />
        <Card
          data={sensorHeatCount}
          label={"Total temperature sensors"}
          icon={<WiThermometer size={25} />}
        />
      </div>
      <div className="mt-44 grid-cols-12 grid gap-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7">
        <YearlyAnalyticsChart
          allProducts={
            allProducts && allProducts.length
              ? allProducts.map((productItem) => ({
                  ...productItem,
                }))
              : []
          }
          allHistories={
            allHistories && allHistories.length
              ? allHistories.map((his) => ({
                  ...his,
                }))
              : []
          }
          socket={socket}
        />
        <VisitorsAnalytics
          allProducts={
            allProducts && allProducts.length
              ? allProducts.map((productItem) => ({
                  ...productItem,
                }))
              : []
          }
          allHistories={
            allHistories && allHistories.length
              ? allHistories.map((his) => ({
                  ...his,
                }))
              : []
          }
          allVisitors={allVisitors && allVisitors.length ? allVisitors : []}
          socket={socket}
        />
      </div>
      <div className="cols-span-12">
        <DeviceAnalytics
          allVisitors={allVisitors && allVisitors.length ? allVisitors : []}
        />
      </div>
    </div>
  );
}
