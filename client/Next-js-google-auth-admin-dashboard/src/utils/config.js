export const productFormControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter product name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "id",
    type: "number",
    placeholder: "Enter Product ID",
    label: "Product ID",
    componentType: "input",
  },
  {
    id: "type",
    type: "",
    placeholder: "",
    label: "type",
    componentType: "select",
    options: [
      {
        id: "cbnd1",
        label: "Cảm biến nhiệt độ",
      },
      {
        id: "cbg1",
        label: "Cảm biến không khí",
      },
    ],
  },
];

export const productTableHeaders = [
  {
    id: "id",
    label: "ID",
  },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "type",
    label: "Type",
  },
  {
    id: "time",
    label: "Time",
  },
];

export const monthsMapper = {
  jan: "January",
  feb: "February",
  mar: "March",
  apr: "April",
  may: "May",
  jun: "June",
  jul: "July",
  aug: "August",
  sep: "September",
  oct: "October",
  nov: "November",
  dec: "December",
};

export const deviceMapper = {
  desktop: "Desktop",
  laptop: "Laptop",
  mobile: "Mobile",
  tablet: "Tablet",
};

export const visiorsFormControls = [
  {
    id: "visitors",
    type: "number",
    placeholder: "Enter No of visitors",
    label: "Visitors",
    componentType: "input",
  },
  {
    id: "title",
    type: "text",
    placeholder: "Enter title",
    label: "Title",
    componentType: "input",
  },
  {
    id: "message",
    type: "text",
    placeholder: "Enter message",
    label: "Message",
    componentType: "input",
  },
  {
    id: "month",
    type: "",
    placeholder: "",
    label: "Month",
    componentType: "select",
    options: [
      {
        id: "jan",
        label: "January",
      },
      {
        id: "feb",
        label: "February",
      },
      {
        id: "mar",
        label: "March",
      },
      {
        id: "apr",
        label: "April",
      },
      {
        id: "may",
        label: "May",
      },
      {
        id: "jun",
        label: "June",
      },
      {
        id: "jul",
        label: "July",
      },
      {
        id: "aug",
        label: "August",
      },
      {
        id: "sep",
        label: "September",
      },
      {
        id: "oct",
        label: "October",
      },
      {
        id: "nov",
        label: "November",
      },
      {
        id: "dec",
        label: "December",
      },
    ],
  },
];

export const visitorsTableHeaders = [
  {
    id: "id",
    label: "ID",
  },
  {
    id: "title",
    label: "Đánh giá",
  },
  {
    id: "message",
    label: "Message",
  },
  {
    id: "time",
    label: "Time",
  },
];

export const yearlyAnalyticsChartOptions = {
  colors: ["#e2513c", "#80CAEE"],
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: [5, 7, 5],
    curve: "straight",
    dashArray: [0, 8, 5],
  },
  title: {
    text: "Page Statistics",
    align: "left",
  },
  legend: {
    tooltipHoverFormatter: function (val, opts) {
      return (
        val +
        " - " +
        opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
        ""
      );
    },
  },
  markers: {
    size: 0,
    hover: {
      sizeOffset: 6,
    },
  },
  xaxis: {
    categories: [],
  },
  tooltip: {
    y: [
      {
        title: {
          formatter: function (val) {
            return val + " (mins)";
          },
        },
      },
      {
        title: {
          formatter: function (val) {
            return val + " per session";
          },
        },
      },
    ],
  },
  grid: {
    borderColor: "#f1f1f1",
  },
};

// export const visitorAnalyticsChartOptions = {
//   colors: ["#3C50E0", "#80CAEE"],
//   chart: {
//     fontFamily: "Satoshi, sans-serif",
//     type: "bar",
//     height: 335,
//     stacked: true,
//     toolbar: {
//       show: false,
//     },
//     zoom: {
//       enabled: false,
//     },
//   },

//   responsive: [
//     {
//       breakpoint: 1536,
//       options: {
//         plotOptions: {
//           bar: {
//             borderRadius: 0,
//             columnWidth: "25%",
//           },
//         },
//       },
//     },
//   ],
//   plotOptions: {
//     bar: {
//       horizontal: false,
//       borderRadius: 0,
//       columnWidth: "25%",
//       borderRadiusApplication: "end",
//       borderRadiusWhenStacked: "last",
//     },
//   },
//   dataLabels: {
//     enabled: false,
//   },
//   legend: {
//     position: "top",
//     horizontalAlign: "left",
//     fontFamily: "Satoshi",
//     fontWeight: 500,
//     fontSize: "14px",

//     markers: {
//       radius: 99,
//     },
//   },
//   fill: {
//     opacity: 1,
//   },
// };

export const visitorAnalyticsChartOptions = {
  colors: ["#3C50E0"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "line", // Thay đổi kiểu biểu đồ thành line
    height: 335,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          line: {
            // You can adjust line-specific options here
          },
        },
      },
    },
  ],
  plotOptions: {
    line: {
      fill: "origin", // This option fills the area below the line
      opacity: 1,
      curve: "smooth", // Add smooth curve to the line
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    // position: "top",
    // horizontalAlign: "left",
    // fontFamily: "Satoshi",
    // fontWeight: 500,
    // fontSize: "14px",
    // markers: {
    //   radius: 99,
    // },
    tooltipHoverFormatter: function (val, opts) {
      return (
        val +
        " - " +
        opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
        ""
      );
    },
  },
  fill: {
    opacity: 0.7,
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 1000,
  },
  tooltip: {
    y: [
      {
        title: {
          formatter: function (val) {
            return val + " (per)";
          },
        },
      },
    ],
  },
};

export const deviceAnalyticsChartOptions = {
  chart: {
    type: "donut",
  },
  colors: ["#10B981", "#375E83", "#259AE6", "#FFA70B"],
  labels: ["Desktop", "Laptop", "Tablet", "Mobile"],
  legend: {
    show: true,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};
