"use client";

import Card from "../card";
import { FaGauge, FaProductHunt } from "react-icons/fa6";
import { WiThermometer } from "react-icons/wi";
import { MdCircleNotifications } from "react-icons/md";
import YearlyAnalyticsChart from "../YearlyAnalyticsChart";
import VisitorsAnalytics from "../VisitorsAnalytics";
import DeviceAnalytics from "../DeviceAnalytics";

import { io } from "socket.io-client";

export default function DashboardLayout({ allVisitors, allProducts }) {
  console.log(allProducts, allVisitors);
  const socket = io.connect("http://localhost:3001");
  const ProdSensorAir = allProducts
    ? allProducts.filter((p, i) => p.type.idType === "cbkk1")
    : [];
  const ProdSensorHeat = allProducts
    ? allProducts.filter((p, i) => p.type.idType == "cbnd1")
    : [];
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7">
        <Card
          data={allProducts && allProducts.length}
          icon={<FaProductHunt size={25} />}
          label={"Total Products"}
        />
        <Card
          data={
            allVisitors && allVisitors.length
              ? allVisitors.reduce(
                  (acc, visitorItem) => parseInt(acc + visitorItem.visitors),
                  0
                )
              : 0
          }
          label={"Total Notifications"}
          icon={<MdCircleNotifications size={25} />}
        />
        <Card
          icon={<FaGauge size={25} />}
          data={ProdSensorAir && ProdSensorAir.length}
          label={"Total air sensors"}
        />
        <Card
          data={ProdSensorHeat && ProdSensorHeat.length}
          label={"Total heat sensors"}
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
          socket={socket}
        />
        <VisitorsAnalytics
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
