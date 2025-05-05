"use client";

import { useState, useEffect } from "react";
import axios from "axios";

function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const [cards, setCards] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("account");
  const [selectedSource, setSelectedSource] = useState("account");
  const [selectedSourceId, setSelectedSourceId] = useState("");
  const [period, setPeriod] = useState("last_year");
  const [operationType, setOperationType] = useState("all");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [cardsResponse, accountsResponse] = await Promise.all([
          axiosInstance.get("http://localhost:8083/Card/list_of_cards"),
          axiosInstance.get("http://localhost:8083/Account/list_of_accounts")
        ]);

        setCards(cardsResponse.data);
        setAccounts(accountsResponse.data);

        if (accountsResponse.data.length > 0) {
          setSelectedSourceId(accountsResponse.data[0].id);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);

        if (selectedFilter === "Cash") {
          const response = await axiosInstance.get(
            "http://localhost:8083/Transactions/findScannedTransactions", 
            { params: { period } }
          );
          setTransactions(response.data);
        } else {
          if (!selectedSourceId) return;

          const params = {
            period,
            operationType,
            source: selectedSource,
            sourceId: selectedSourceId,
          };

          const response = await axiosInstance.get(
            "http://localhost:8083/Transactions/filtredTransactions", 
            { params }
          );
          setTransactions(response.data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [period, operationType, selectedSource, selectedSourceId, selectedFilter]);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedFilter(value);

    if (value === "card") {
      setSelectedSource("card");
      setSelectedSourceId(cards[0]?.id || "");
    } else if (value === "account") {
      setSelectedSource("account");
      setSelectedSourceId(accounts[0]?.id || "");
    } else if (value === "Cash") {
      setSelectedSource("all");
      setSelectedSourceId("");
    }
  };

  return (
    <div className="p-6 mx-auto bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-700">Transaction History</h2>
        <div className="flex items-center space-x-4">
          {/* Filter: account / card / cash */}
          <select
            className="block p-2 pr-8 text-sm text-gray-900 border border-gray-300 rounded-lg appearance-none bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 custom-select"
            onChange={handleFilterChange}
            value={selectedFilter}
          >
            <option value="account">Account</option>
            <option value="card">Card</option>   
            <option value="Cash">Cash</option>        
          </select>

          {/* Source ID (account or card) */}
          {selectedFilter !== "Cash" && (
            <select
              className="block p-2 pr-8 text-sm text-gray-900 border border-gray-300 rounded-lg appearance-none bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 custom-select"
              onChange={(e) => setSelectedSourceId(e.target.value)}
              value={selectedSourceId}
            >
              {selectedSource === "card" && cards.map((card) => (
                <option key={card.id} value={card.id}>
                  Card {card.cardType} ({card.cardNumber})
                </option>
              ))}
              {selectedSource === "account" && accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  Account {account.accountType} ({account.rib})
                </option>
              ))}
            </select>
          )}

          {/* Period */}
          <select
            className="block p-2 pr-8 text-sm text-gray-900 border border-gray-300 rounded-lg appearance-none bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 custom-select"
            onChange={(e) => setPeriod(e.target.value)}
            value={period}
          >
            <option value="last_week">Last Week</option>
            <option value="last_month">Last Month</option>
            <option value="last_quarter">Last Quarter</option>
            <option value="last_year">Last Year</option>
          </select>

          {/* Operation Type */}
          {selectedFilter !== "Cash" && (
            <select
              className="block p-2 pr-8 text-sm text-gray-900 border border-gray-300 rounded-lg appearance-none bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 custom-select"
              onChange={(e) => setOperationType(e.target.value)}
              value={operationType}
            >
              <option value="all">All</option>
              <option value="incomes">Incomes</option>
              <option value="expenses">Expenses</option>
            </select>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="w-8 h-8 border-4 rounded-full border-t-indigo-500 animate-spin"></div>
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center text-gray-600">No transactions available</div>
      ) : (
        <div className="space-y-2">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="grid items-center grid-cols-9 px-4 py-4 text-sm bg-gray-100 rounded-lg gap-x-4">
              <div className="font-medium text-blue-500">Transaction #{transaction.id}</div>
              <span className="flex items-center justify-center">
                {transaction.operation === "DEPOSIT" ? (
                  <i className="p-1 text-xl text-green-500 bg-green-100 icon-deposit_icon"></i>
                ) : (
                  <i className="p-1 text-xl text-red-500 bg-red-100 icon-withdrawal_icon"></i>
                )}
              </span>
              <div className="text-gray-600">{transaction.category}</div>
              <div className="w-40 text-gray-600">
                {transaction.paymentMethod === "Unknown" ? "Scanned" : transaction.paymentMethod}
              </div>
              <div className="w-40 text-gray-600 ml-14">
                {transaction.accountRib || transaction.cardNumber || "Cash"}
              </div>
              <div className="w-40 ml-16 text-gray-600">{new Date(transaction.dateTime).toLocaleDateString()}</div>
              <div className="w-40 text-gray-600 ml-14">{new Date(transaction.dateTime).toLocaleTimeString()}</div>
              <div
                className={`font-medium ml-10 ${transaction.status ? "text-green-500 bg-green-50" : "text-red-500 bg-red-50"} flex py-1 justify-center w-24 rounded-lg`}
              >
                {transaction.status ? "Completed" : "Failed"}
              </div>
              <div className={`font-medium text-right ${transaction.operation === "DEPOSIT" ? "text-green-500" : "text-red-500"}`}>
                {`${transaction.operation === "DEPOSIT" ? "+" : "-"}$${transaction.amount.toFixed(2)}`}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TransactionsList;
