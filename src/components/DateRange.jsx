import React, { useState, useEffect } from "react";

function DateRange({ dateRange, setDateRange }) {
  const [dateRangeOption, setDateRangeOption] = useState("perYear");
  const [isCustomRange, setIsCustomRange] = useState(false);

  const handleDateRangeOptionChange = (option) => {
    setDateRangeOption(option);
    setIsCustomRange(false);

    const today = new Date();
    let fromDate;

    switch (option) {
      case "perWeek":
        fromDate = new Date(today);
        fromDate.setDate(today.getDate() - 7);
        break;
      case "perMonth":
        fromDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        break;
      case "perQuarter":
        fromDate = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
        break;
      case "perYear":
        fromDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        break;
      default:
        fromDate = new Date(today);
        fromDate.setDate(today.getDate() - 7);
    }

    const newRange = {
      from: fromDate.toISOString().split("T")[0],
      to: today.toISOString().split("T")[0],
    };

    // Send the newRange back to the parent
    setDateRange(newRange);
  };

  const handleCustomDateRangeChange = (e, field) => {
    const updatedRange = { ...dateRange, [field]: e.target.value };
    setDateRange(updatedRange);
    setIsCustomRange(true);
  };

  // Initialize the date range on component mount
  useEffect(() => {
    handleDateRangeOptionChange(dateRangeOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-800">Date Range</h3>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {["perWeek", "perMonth", "perQuarter", "perYear"].map((option) => (
          <button
            key={option}
            className={`p-2 text-sm font-medium rounded-md ${
              dateRangeOption === option && !isCustomRange
                ? "bg-indigo-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleDateRangeOptionChange(option)}
          >
            {option.replace("per", "Per ")}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">From</label>
        <input
          type="date"
          value={dateRange.from}
          onChange={(e) => handleCustomDateRangeChange(e, "from")}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <label className="block text-sm font-medium text-gray-700">To</label>
        <input
          type="date"
          value={dateRange.to}
          onChange={(e) => handleCustomDateRangeChange(e, "to")}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}

export default DateRange;
