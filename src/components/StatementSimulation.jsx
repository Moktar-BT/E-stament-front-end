"use client"

import { useState, useEffect, forwardRef } from "react"
import axios from "axios"
import logo from "../assets/proxym_log.png"
import { Info } from "lucide-react"

const StatementSimulation = forwardRef(
  (
    {
      transactions,
      setTransactions,
      accountSelected,
      accountId,
      cardId,
      dateRange,
      operationType,
      statementType,
      isGeneratingPDF,
    },
    ref,
  ) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getSelectedOperationTypes = () => {
      const types = []
      if (operationType.deposits) types.push("DEPOSIT")
      if (operationType.withdrawals) types.push("WITHDRAWAL")
      if (operationType.transfers) types.push("TRANSFER")
      if (operationType.payments) types.push("PAYMENT")
      if (operationType.fees) types.push("FEE")
      if (operationType.scanned) types.push("SCANNED")
      return types.length > 0 ? types : ["DEPOSIT", "WITHDRAWAL", "TRANSFER", "PAYMENT", "FEE", "ADJUSTMENT", "SCANNED"]
    }

    const fetchData = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem("authToken") || localStorage.getItem("token")

        if (!token) {
          setError("Authentication token not found. Please log in again.")
          setLoading(false)
          return
        }

        const params = new URLSearchParams()
        const formattedStartDate = `${dateRange.from}T00:00:00`
        const formattedEndDate = `${dateRange.to}T23:59:59`
        const operationTypes = getSelectedOperationTypes()

        let endpoint = "http://localhost:8083/Transactions/StatementTransactions"

        // Use different endpoint for Global Transaction Statement
        if (statementType === "Global_Transaction_Statement") {
          endpoint = "http://localhost:8083/Transactions/AllUserStatementTransactions"
          params.append("startDate", formattedStartDate)
          params.append("endDate", formattedEndDate)
          params.append("operationTypes", operationTypes.join(","))
        } else {
          if (statementType === "Account-E-Statement") {
            const accountIdToUse = accountId || 2
            params.append("accountId", accountIdToUse)
          } else {
            const cardIdToUse = cardId?.id
            params.append("cardId", cardIdToUse)
          }

          params.append("startDate", formattedStartDate)
          params.append("endDate", formattedEndDate)
          params.append("operationTypes", operationTypes.join(","))
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: params,
        }

        const response = await axios.get(endpoint, config)

        if (!response.data || (Array.isArray(response.data) && response.data.length === 0)) {
          setTransactions([])
          setError("No transactions found for the selected criteria.")
        } else if (Array.isArray(response.data)) {
          const formatted = response.data.map((t) => {
            // For Scanned transactions, treat them as debits (like purchases)
            const isCredit = t.operation === "DEPOSIT"
            const isScanned = t.operation === "SCANNED"
            return {
              id: t.id || Math.random().toString(36).substr(2, 9),
              date: t.dateTime ? t.dateTime.split("T")[0] : new Date().toISOString().split("T")[0],
              time: t.dateTime
                ? t.dateTime.split("T")[1].substring(0, 8)
                : new Date().toISOString().split("T")[1].substring(0, 8),
              type: t.operation || "UNKNOWN",
              category: t.category || "N/A",
              debit: isCredit ? "" : `$${Number.parseFloat(t.amount || 0).toFixed(2)}`,
              credit: isCredit ? `$${Number.parseFloat(t.amount || 0).toFixed(2)}` : "",
            }
          })
          setTransactions(formatted)
          setError(null)
        } else {
          setError("Unexpected response format from server.")
        }
      } catch (err) {
        console.error("Error fetching data:", err)
        if (err.response) {
          if (err.response.status === 401 || err.response.status === 403) {
            setError("Authentication error. Please log in again.")
          } else if (err.response.status === 404) {
            setError("API endpoint not found. Please check server configuration.")
          } else {
            setError(`Server error: ${err.response.status}`)
          }
        } else if (err.request) {
          setError("No response from server. Please check your connection.")
        } else {
          setError(`Error: ${err.message}`)
        }
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      fetchData()
    }, [accountSelected, cardId, dateRange, operationType])

    const totalDeposits = transactions
      .filter((t) => t.credit)
      .reduce((sum, t) => sum + Number.parseFloat(t.credit.replace("$", "").replace(",", "") || 0), 0)

    const totalWithdrawals = transactions
      .filter((t) => t.debit)
      .reduce((sum, t) => sum + Number.parseFloat(t.debit.replace("$", "").replace(",", "") || 0), 0)

    return (
      <div className="lg:col-span-2" ref={ref}>
        <div className="h-full p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="flex text-lg font-medium text-gray-800">
              <img src={logo || "/placeholder.svg"} className="h-12 mr-2" alt="logo" />
              <span className="mt-2">Statement Preview</span>
            </h3>
            <div className="flex items-center text-sm text-gray-500">
              <Info size={16} className="mr-1" />
              Showing {transactions.length} transactions
            </div>
          </div>

          <div className="pb-4 mb-4 border-b border-gray-200">
            <div className="flex justify-between mb-2">
              <div>
                <h4 className="font-medium text-gray-500">
                  {statementType === "Account-E-Statement"
                    ? "Account E-Statement"
                    : statementType === "Card-E-Statement"
                      ? "Card E-Statement"
                      : "Global Transaction Statement"}
                </h4>
                <p className="text-sm text-gray-900">
                  {statementType === "Global_Transaction_Statement"
                    ? "All Accounts and Cards"
                    : statementType === "Account-E-Statement"
                      ? accountSelected
                      : cardId?.cardNumber
                        ? `${cardId.cardType} Card (****${cardId.cardNumber.slice(-4)})`
                        : "No card selected"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Period</p>
                <p className="text-sm font-medium">
                  {dateRange.from} to {dateRange.to}
                </p>
              </div>
            </div>
          </div>

          <div className="pb-4 mb-4 border-b border-gray-200">
            <h4 className="mb-3 font-medium text-gray-800">Summary</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-green-100 rounded-md">
                <p className="text-sm text-green-600">Total Deposits</p>
                <p className="text-lg font-medium text-green-600">+${totalDeposits.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-md">
                <p className="text-sm text-red-600">Total Withdrawals</p>
                <p className="text-lg font-medium text-red-600">-${totalWithdrawals.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="w-8 h-8 border-4 rounded-full border-t-indigo-500 animate-spin"></div>
                <span className="ml-2 text-gray-600">Loading transactions...</span>
              </div>
            ) : error ? (
              <div className="p-4 text-center text-red-600 rounded-md bg-red-50">{error}</div>
            ) : (
              <div
                className={`${isGeneratingPDF ? "" : "max-h-[675px] overflow-y-auto"} scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100`}
              >
                <table className="min-w-full">
                  <thead className="sticky top-0 bg-white">
                    <tr className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50">
                      <th className="px-4 py-3">Date & Time</th>
                      <th className="px-4 py-3">Transaction</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Debit</th>
                      <th className="px-4 py-3">Credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length > 0 ? (
                      transactions.map((transaction, index) => (
                        <tr key={transaction.id || index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {transaction.date} <br />
                            <span className="text-xs">{transaction.time}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm font-medium text-indigo-500">Transaction #{transaction.id}</span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">{transaction.type}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{transaction.category}</td>
                          <td className="px-4 py-3 text-sm font-medium text-red-500">{transaction.debit}</td>
                          <td className="px-4 py-3 text-sm font-medium text-green-500">{transaction.credit}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-4 py-3 text-center text-gray-500">
                          No transactions available for the selected criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  },
)

export default StatementSimulation
