"use client"

import { useState, useEffect, useRef } from "react"
import { Download } from "lucide-react"
import Logoutbutton from "../components/Logoutbutton"
import RightSideModal from "../components/RightSideModal"
import StatementSimulation from "../components/StatementSimulation"
import axios from "axios"
import FileType from "../components/FileType"
import DateRange from "../components/DateRange"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import * as XLSX from "xlsx"

function Statement() {
  const [transactionTypes, setTransactionTypes] = useState({
    deposits: true,
    withdrawals: true,
    transfers: true,
    payments: true,
    fees: true,
    scanned: true,
  })
  const [transactions, setTransactions] = useState([])
  const [accountSelected, setAccountSelected] = useState("")
  const [accountId, setAccountId] = useState("")
  const [Card, setCard] = useState("")
  const [statementType, setStatementType] = useState("Account-E-Statement")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)
  const [dateRange, setDateRange] = useState({
    from: "2022-05-01",
    to: "2023-05-31",
  })
  const [fileType, setFileType] = useState("pdf")
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const statementRef = useRef()

  const generatePDF = async () => {
    try {
      setIsGeneratingPDF(true)

      await new Promise((resolve) => setTimeout(resolve, 50))

      const input = statementRef.current
      if (!input) {
        console.error("Statement element not found")
        return
      }

      const clone = input.cloneNode(true)
      clone.style.position = "absolute"
      clone.style.left = "-9999px"
      clone.style.width = input.offsetWidth + "px"
      document.body.appendChild(clone)

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
      })

      document.body.removeChild(clone)

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
      pdf.save("statement.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Failed to generate PDF. Please check console for details.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handleDownload = () => {
    if (fileType === "pdf") {
      generatePDF()
    } else if (fileType === "csv") {
      downloadCSV()
    } else if (fileType === "excel") {
      downloadExcel()
    } else {
      alert(`Statement downloaded as ${fileType.toUpperCase()}!`)
    }
  }

  const downloadCSV = () => {
    const csv = convertToCSV(transactions)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "transactions.csv"
    link.click()
  }

  const convertToCSV = (transactions) => {
    const header = Object.keys(transactions[0] || {}).join(",")
    const rows = transactions.map((transaction) => Object.values(transaction).join(","))
    return [header, ...rows].join("\n")
  }

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(transactions)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Transactions")
    XLSX.writeFile(wb, "transactions.xlsx")
  }

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value
    setAccountSelected(selectedValue)

    if (statementType === "Account-E-Statement") {
      const selectedAccount = accounts.find((account) => {
        const lastFourDigits = account.rib.slice(-4)
        const displayText = `${account.accountType} Account (****${lastFourDigits})`
        return displayText === selectedValue
      })

      if (selectedAccount) {
        setAccountId(selectedAccount.id)
      }
    } else {
      const selectedCard = cards.find((card) => {
        const lastFourDigits = card.cardNumber.slice(-4)
        const displayText = `${card.cardType} Card (****${lastFourDigits})`
        return displayText === selectedValue
      })

      if (selectedCard) {
        setCard(selectedCard)
        setAccountId(selectedCard.id)
      }
    }
  }

  // Handle statement type change
  const handleStatementTypeChange = (type) => {
    setStatementType(type)
    setIsModalOpen(false)

    // Reset transactions when changing statement type
    setTransactions([])

    // If switching to Global Transaction Statement, ensure scanned is enabled
    // If switching away from Global Transaction Statement, disable scanned option
    if (type === "Global_Transaction_Statement") {
      setTransactionTypes((prev) => ({ ...prev, scanned: true }))
    } else {
      setTransactionTypes((prev) => ({ ...prev, scanned: false }))
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem("token")

        if (!token) {
          console.error("No token found!")
          return
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        }

        if (statementType === "Account-E-Statement") {
          const response = await axios.get("http://localhost:8083/Account/list_of_accounts", { headers })
          setAccounts(response.data)
          if (response.data.length > 0) {
            const account = response.data[0]
            const lastFourDigits = account.rib.slice(-4)
            setAccountSelected(`${account.accountType} Account (****${lastFourDigits})`)
            setAccountId(account.id)
          }
        } else if (statementType === "Card-E-Statement") {
          const response = await axios.get("http://localhost:8083/Card/list_of_cards", { headers })
          setCards(response.data)
          if (response.data.length > 0) {
            const card = response.data[0]
            const lastFourDigits = card.cardNumber.slice(-4)
            setCard(card)
            setAccountSelected(`${card.cardType} Card (****${lastFourDigits})`)
            setAccountId(card.id)
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        if (error.response && error.response.status === 403) {
          console.error("Forbidden: Token might be expired or invalid.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [statementType])

  return (
    <>
      <div className="flex items-center justify-between p-2 px-4 mb-4 bg-white rounded-lg">
        <h1 className="text-3xl font-bold text-gray-700">E-Statement</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-6 py-2 text-green-500 transition-colors bg-green-100 rounded-lg hover:bg-green-200"
          >
            Switch Statement Type
          </button>
          <Logoutbutton />
        </div>
      </div>

      <div className="min-h-screen">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            {/* Only show account/card selector if not Global Transaction Statement */}
            {statementType !== "Global_Transaction_Statement" && (
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="mb-4 text-lg font-medium text-gray-800">
                  {statementType === "Account-E-Statement" ? "Account" : "Card"}
                </h3>
                <div className="relative">
                  {loading ? (
                    <div className="w-full p-3 text-center text-gray-500 bg-gray-100 rounded-md">Loading...</div>
                  ) : (
                    <select
                      className="w-full p-3 pr-10 border border-gray-200 rounded-md appearance-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={accountSelected}
                      onChange={(e) => handleSelectChange(e)}
                    >
                      {statementType === "Account-E-Statement"
                        ? accounts.map((account) => {
                            const lastFourDigits = account.rib.slice(-4)
                            const displayText = `${account.accountType} Account (****${lastFourDigits})`
                            return (
                              <option key={account.id} value={displayText}>
                                {displayText}
                              </option>
                            )
                          })
                        : cards.map((card) => {
                            const lastFourDigits = card.cardNumber.slice(-4)
                            const displayText = `${card.cardType} Card (****${lastFourDigits})`
                            return (
                              <option key={card.id} value={displayText}>
                                {displayText}
                              </option>
                            )
                          })}
                    </select>
                  )}
                </div>
              </div>
            )}

            <DateRange dateRange={dateRange} setDateRange={setDateRange} />

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-medium text-gray-800">Transaction Types</h3>
              <div className="space-y-3">
                {Object.entries(transactionTypes)
                  .filter(([type]) => {
                    // Only show "scanned" for Global Transaction Statement
                    if (type === "scanned" && statementType !== "Global_Transaction_Statement") {
                      return false
                    }
                    return true
                  })
                  .map(([type, checked]) => (
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

            <FileType transactions={transactions} fileType={fileType} setFileType={setFileType} />

            <div className="space-y-3">
              <button
                className="flex items-center justify-center w-full px-4 py-3 text-white transition-colors bg-indigo-500 rounded-md hover:bg-indigo-600"
                onClick={handleDownload}
              >
                <Download size={18} className="mr-2" />
                Download Statement
              </button>
            </div>
          </div>

          <StatementSimulation
            transactions={transactions}
            setTransactions={setTransactions}
            ref={statementRef}
            accountSelected={accountSelected}
            accountId={accountId}
            cardId={Card}
            dateRange={dateRange}
            operationType={transactionTypes}
            statementType={statementType}
            isGeneratingPDF={isGeneratingPDF}
          />
        </div>

        <div className="mt-10 ml-5">
          <span className="text-gray-600">© 2025 Proxym IT. All rights reserved.</span>
        </div>
      </div>

      <RightSideModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Select E-Statement Type">
        <div className="space-y-4">
          <div
            onClick={() => handleStatementTypeChange("Account-E-Statement")}
            className="flex items-center p-4 transition-colors border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
          >
            <span>Account Statement</span>
            <i className="ml-2 text-2xl icon-statement_icon"></i>
          </div>

          <div
            onClick={() => handleStatementTypeChange("Card-E-Statement")}
            className="flex items-center p-4 transition-colors border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
          >
            <span>Card Statement</span>
            <i className="ml-2 text-2xl icon-statement_icon"></i>
          </div>
          <div
            onClick={() => handleStatementTypeChange("Global_Transaction_Statement")}
            className="flex items-center p-4 transition-colors border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
          >
            <span>Global Transaction Statement</span>
            <i className="ml-2 text-2xl icon-statement_icon"></i>
          </div>
        </div>
      </RightSideModal>
    </>
  )
}

export default Statement
