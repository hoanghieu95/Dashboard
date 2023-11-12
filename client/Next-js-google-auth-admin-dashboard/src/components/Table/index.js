"use client";

export default function Table({
  data = [],
  tableHeaderText,
  tableHeaderCells = [],
}) {

  return (
    <div className="rounded-sm border mt-5 border-stroke bg-white px-5 pt-6 pb-2.5 shadow sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black">
        {tableHeaderText}
      </h4>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 sm:grid-cols-4 text-bodydark2">
          {tableHeaderCells && tableHeaderCells.length
            ? tableHeaderCells.map((item) => (
                <div className="p-2.5 text-center xl:p-5" key={item.id}>
                  {item.label}
                </div>
              ))
            : null}
        </div>
        {data && data.length
          ? data.map((item) => (
              <div
                className="grid grid-cols-3 border-b border-stroke sm:grid-cols-4 "
                key={item._id}
              >
                {tableHeaderCells.map((tableCell) => (
                  <div
                    key={`${item._id}${tableCell.id}`}
                    className="flex items-center justify-center p-2.5 xl:p-5 text-black"
                  >
                    <p>{item[tableCell.id]}</p>
                  </div>
                ))}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
