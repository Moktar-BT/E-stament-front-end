import React from 'react'
import { useState, useEffect } from "react"
function DateRange() {
     const [dateRangeOption, setDateRangeOption] = useState("perMonth");
      const [isCustomRange, setIsCustomRange] = useState(false);
        // State for configuration options
  const [dateRange, setDateRange] = useState({
    from: "2023-05-01",
    to: "2023-05-31",
  });
       // Handle date range option change
  const handleDateRangeOptionChange = (option) => {
    setDateRangeOption(option);
    setIsCustomRange(false);

    const today = new Date();
    let fromDate, toDate;

    switch (option) {
      case "perWeek":
        fromDate = new Date(today.setDate(today.getDate() - 7));
        toDate = new Date();
        break;
      case "perMonth":
        fromDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        toDate = new Date();
        break;
      case "perQuarter":
        fromDate = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
        toDate = new Date();
        break;
      case "perYear":
        fromDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        toDate = new Date();
        break;
      default:
        fromDate = new Date(today.setDate(today.getDate() - 7));
        toDate = new Date();
    }

    setDateRange({
      from: fromDate.toISOString().split("T")[0],
      to: toDate.toISOString().split("T")[0],
    });
  };

  // Handle custom date range change
  const handleCustomDateRangeChange = (e, field) => {
    setDateRange({ ...dateRange, [field]: e.target.value });
    setIsCustomRange(true);
  };
  return (
    <>
     <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h3 className="mb-4 text-lg font-medium text-gray-800">Date Range</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className={`p-2 text-sm font-medium rounded-md ${
                        dateRangeOption === "perWeek" && !isCustomRange
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => handleDateRangeOptionChange("perWeek")}
                    >
                      Per Week
                    </button>
                    <button
                      className={`p-2 text-sm font-medium rounded-md ${
                        dateRangeOption === "perMonth" && !isCustomRange
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => handleDateRangeOptionChange("perMonth")}
                    >
                      Per Month
                    </button>
                    <button
                      className={`p-2 text-sm font-medium rounded-md ${
                        dateRangeOption === "perQuarter" && !isCustomRange
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => handleDateRangeOptionChange("perQuarter")}
                    >
                      Per Quarter
                    </button>
                    <button
                      className={`p-2 text-sm font-medium rounded-md ${
                        dateRangeOption === "perYear" && !isCustomRange
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => handleDateRangeOptionChange("perYear")}
                    >
                      Per Year
                    </button>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">From</label>
                      <input
                        type="date"
                        className="w-full p-3 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={dateRange.from}
                        onChange={(e) => handleCustomDateRangeChange(e, "from")}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">To</label>
                      <input
                        type="date"
                        className="w-full p-3 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={dateRange.to}
                        onChange={(e) => handleCustomDateRangeChange(e, "to")}
                      />
                    </div>
                  </div>
                </div>
    </>
  )
}

export default DateRange