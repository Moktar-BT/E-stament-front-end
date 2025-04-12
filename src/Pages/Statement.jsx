"use client"

import { useState } from "react"
import { Download, FileText, Info, } from "lucide-react"
import Logoutbutton from "../components/Logoutbutton"
import logo from '../assets/proxym_log.png'

function Statement() {
  // State for configuration options
  const [dateRange, setDateRange] = useState({
    from: "2023-05-01",
    to: "2023-05-31",
  });
  const [fileType, setFileType] = useState("pdf");
  const [transactionTypes, setTransactionTypes] = useState({
    deposits: true,
    withdrawals: true,
    transfers: true,
    payments: true,
    fees: false,
  });
  const [accountSelected, setAccountSelected] = useState("Primary Account (****1234)");
  const [dateRangeOption, setDateRangeOption] = useState("perMonth"); // Default option
  const [isCustomRange, setIsCustomRange] = useState(false); // Toggle for custom range

  // Sample transaction data with debit and credit
  const transactions = [
    {
      id: "#456",
      date: "2023-05-28",
      time: "14:30",
      type: "Deposit",
      category: "Housing Costs",
      debit: "",
      credit: "$85.50",
      status: "Completed",
    },
    {
      id: "#457",
      date: "2023-05-25",
      time: "09:15",
      type: "Withdrawal",
      category: "ATM",
      debit: "$200.00",
      credit: "",
      status: "Completed",
    },
    {
        id: "#456",
        date: "2023-05-28",
        time: "14:30",
        type: "Deposit",
        category: "Housing Costs",
        debit: "",
        credit: "$85.50",
        status: "Completed",
      },
      {
        id: "#457",
        date: "2023-05-25",
        time: "09:15",
        type: "Withdrawal",
        category: "ATM",
        debit: "$200.00",
        credit: "",
        status: "Completed",
      },
      {
        id: "#456",
        date: "2023-05-28",
        time: "14:30",
        type: "Deposit",
        category: "Housing Costs",
        debit: "",
        credit: "$85.50",
        status: "Completed",
      },
      {
        id: "#457",
        date: "2023-05-25",
        time: "09:15",
        type: "Withdrawal",
        category: "ATM",
        debit: "$200.00",
        credit: "",
        status: "Completed",
      },
      {
        id: "#456",
        date: "2023-05-28",
        time: "14:30",
        type: "Deposit",
        category: "Housing Costs",
        debit: "",
        credit: "$85.50",
        status: "Completed",
      },
      {
        id: "#457",
        date: "2023-05-25",
        time: "09:15",
        type: "Withdrawal",
        category: "ATM",
        debit: "$200.00",
        credit: "",
        status: "Completed",
      },
      {
        id: "#456",
        date: "2023-05-28",
        time: "14:30",
        type: "Deposit",
        category: "Housing Costs",
        debit: "",
        credit: "$85.50",
        status: "Completed",
      },
      {
        id: "#457",
        date: "2023-05-25",
        time: "09:15",
        type: "Withdrawal",
        category: "ATM",
        debit: "$200.00",
        credit: "",
        status: "Completed",
      },
      {
        id: "#456",
        date: "2023-05-28",
        time: "14:30",
        type: "Deposit",
        category: "Housing Costs",
        debit: "",
        credit: "$85.50",
        status: "Completed",
      },
      {
        id: "#457",
        date: "2023-05-25",
        time: "09:15",
        type: "Withdrawal",
        category: "ATM",
        debit: "$200.00",
        credit: "",
        status: "Completed",
      },
    
  ];

  // Calculate summary
  const totalDeposits = transactions
    .filter((t) => t.type === "Deposit")
    .reduce((sum, t) => sum + parseFloat(t.credit.replace("$", "").replace(",", "") || 0), 0);
  const totalWithdrawals = transactions
    .filter((t) => t.type === "Withdrawal" || t.type === "Payment" || t.type === "Transfer")
    .reduce((sum, t) => sum + parseFloat(t.debit.replace("$", "").replace(",", "") || 0), 0);

  // Handle date range option change
  const handleDateRangeOptionChange = (option) => {
    setDateRangeOption(option);
    setIsCustomRange(false); // Disable custom range when a default option is selected

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
    setIsCustomRange(true); // Enable custom range when manually selecting dates
  };

  return (
    <>
      <div className="flex items-center justify-between p-2 px-4 mb-6 bg-white rounded-lg">
        <h1 className="text-3xl font-bold text-gray-700">E-Statement</h1>
        <Logoutbutton />
      </div>
      <div className="min-h-screen">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Configuration Panel */}
          <div className="space-y-6 lg:col-span-1">
            {/* Account Selection */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-medium text-gray-800">Account</h3>
              <div className="relative">
                <select
                  className="w-full p-3 pr-10 border border-gray-200 rounded-md appearance-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={accountSelected}
                  onChange={(e) => setAccountSelected(e.target.value)}
                >
                  <option>Primary Account (****1234)</option>
                  <option>Savings Account (****5678)</option>
                  <option>Joint Account (****9012)</option>
                </select>
              </div>
            </div>

            {/* Date Range Options */}
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

            {/* Transaction Types */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-medium text-gray-800">Transaction Types</h3>
              <div className="space-y-3">
                {Object.entries(transactionTypes).map(([type, checked]) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      id={type}
                      checked={checked}
                      onChange={() => setTransactionTypes({ ...transactionTypes, [type]: !checked })}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor={type} className="block ml-2 text-sm text-gray-700 capitalize">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* File Format */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-medium text-gray-800">File Format</h3>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-colors ${
                    fileType === "pdf" ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setFileType("pdf")}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      fileType === "pdf" ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <FileText size={20} />
                  </div>
                  <span className="text-sm font-medium">PDF</span>
                </div>
                <div
                  className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-colors ${
                    fileType === "csv" ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setFileType("csv")}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      fileType === "csv" ? "bg-indigo-100 text-indigo-500" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <FileText size={20} />
                  </div>
                  <span className="text-sm font-medium">CSV</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                className="flex items-center justify-center w-full px-4 py-3 text-white transition-colors bg-indigo-500 rounded-md hover:bg-indigo-600"
                onClick={() => alert("Statement downloaded!")}
              >
                <Download size={18} className="mr-2" />
                Download Statement
              </button>
             
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <div className="h-full p-6 bg-white rounded-lg shadow-sm">
            
           
              <div className="flex items-center justify-between mb-6">
              <h3 className="flex text-lg font-medium text-gray-800"> <img src={logo} className="flex h-12 " alt="" /><span className="mt-2">Statement Preview</span></h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Info size={16} className="mr-1" />
                  Showing {transactions.length} transactions
                </div>
              </div>

              {/* Account Statement Information */}
              <div className="pb-4 mb-4 border-b border-gray-200">
                <div className="flex justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-800">Account Statement</h4>
                    <p className="text-sm text-gray-500">{accountSelected}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Period</p>
                    <p className="text-sm font-medium">
                      {dateRange.from} to {dateRange.to}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <div>
                    <p className="text-sm text-gray-500">Opening Balance</p>
                    <p className="font-medium">$3,245.75</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Closing Balance</p>
                    <p className="font-medium">$4,839.50</p>
                  </div>
                </div>
              </div>

              {/* Summary Section */}
              <div className="pb-4 mb-4 border-b border-gray-200">
                <h4 className="mb-3 font-medium text-gray-800">Summary</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-md bg-gray-50">
                    <p className="text-sm text-gray-500">Total Deposits</p>
                    <p className="text-lg font-medium text-green-600">+${totalDeposits.toFixed(2)}</p>
                  </div>
                  <div className="p-3 rounded-md bg-gray-50">
                    <p className="text-sm text-gray-500">Total Withdrawals</p>
                    <p className="text-lg font-medium text-red-600">-${totalWithdrawals.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="overflow-x-auto">
                <div className="max-h-[675px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50">
                        <th className="px-4 py-3">Date & Time</th>
                        <th className="px-4 py-3">Transaction</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3 text-right">Debit</th>
                        <th className="px-4 py-3 text-right">Credit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {transactions.map((transaction, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {transaction.date}
                            <br />
                            <span className="text-xs">{transaction.time}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm font-medium text-blue-500">Transaction {transaction.id}</span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">{transaction.type}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{transaction.category}</td>
                          <td className="px-4 py-3 font-medium text-right text-red-600">{transaction.debit}</td>
                          <td className="px-4 py-3 font-medium text-right text-green-600">{transaction.credit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
      <div className="mt-10 ml-5">
        <span className="text-gray-600">© 2025 Proxym IT. All rights reserved.</span>
      </div>
      </div>
    </>
  );
}

export default Statement;