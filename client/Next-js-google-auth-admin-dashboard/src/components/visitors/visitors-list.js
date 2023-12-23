
import { deviceMapper, monthsMapper, visitorsTableHeaders } from "@/utils/config";
import Table from "../Table";
import moment from "moment";
// import { useEffect } from 'react';


import { io } from "socket.io-client";


async function extractAllVisitors() {
  const res = await fetch("http://localhost:3000/api/visitors/all-visitors", {
    method: "GET",
    cache: "no-store",
  });
  

  const data = await res.json();

  return data;
}

export default async function VisitorsList() {
  const socket = io.connect("http://localhost:3001");
  const allVisitors = await extractAllVisitors();

  // useEffect(() => {
  //   const handleNotiData = (message) => {
  //       const notiSensor = JSON.parse(message);
  //       // const allVisitors = await extractAllVisitors();

  //   };

  //   socket.on("notification", handleNotiData);

  //   return () => {
  //     socket.off("notification", handleNotiData);
  //   };
  // }, [socket]);

  
  return (
    <Table
      tableHeaderText="All Notification Overview"
      tableHeaderCells={visitorsTableHeaders}
      data={
        allVisitors && allVisitors.data && allVisitors.data.length
          ? allVisitors.data.map(item=> ({
            ...item,
            id: item.visitors,
            time: moment(item.time).format("DD/MM/YYYY - HH:mm:ss"),
          }))
          : []
      }
    />
  );
}
