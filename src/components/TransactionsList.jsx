"use client";

import { useState, useEffect } from "react";
import axios from "axios";

function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const [cards, setCards] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedSourceId, setSelectedSourceId] = useState("");
  const [period, setPeriod] = useState("last_month");
  const [operationType, setOperationType] = useState("all");

  // Get the token from localStorage
  const token = localStorage.getItem("authToken");

  // Create an Axios instance with Authorization header
  const axiosInstance = axios.create({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  // Fetch cards and accounts when the page loads
  useEffect(() => {
    // Fetch cards
    axiosInstance.get("http://localhost:8083/Card/list_of_cards")
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
      });

    // Fetch accounts
    axiosInstance.get("http://localhost:8083/Account/list_of_accounts")
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching accounts:", error);
      });
  }, []);

  // Fetch transactions based on the selected filters
  useEffect(() => {
    // Check if both selectedSource and selectedSourceId have values
    if (selectedSource && selectedSourceId) {
      const params = {
        period,
        operationType,
        source: selectedSource,
        sourceId: selectedSourceId,
      };
      axiosInstance.get("http://localhost:8083/Transactions/filtredTransactions", { params })
        .then((response) => {
          setTransactions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching transactions:", error);
        });
    }
  }, [period, operationType, selectedSource, selectedSourceId]);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedFilter(value);
    if (value === "card") {
      setSelectedSource("card");
      setSelectedSourceId(cards[0]?.id || "");  // Default to first card
    } else if (value === "account") {
      setSelectedSource("account");
      setSelectedSourceId(accounts[0]?.id || "");  // Default to first account
    } else {
      setSelectedSource("all");
      setSelectedSourceId("");
    }
  };

  return (
    <div className="p-6 mx-auto bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-700">Transaction History</h2>
        <div className="flex items-center space-x-4">
          <select
            className="block p-2 pr-8 text-sm text-gray-900 border border-gray-300 rounded-lg appearance-none bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 custom-select"
            onChange={handleFilterChange}
            value={selectedFilter}
          >
            <option value="all">All</option>
            <option value="card">Card</option>
            <option value="account">Account</option>
          </select>

          <select
            className="block p-2 pr-8 text-sm text-gray-900 border border-gray-300 rounded-lg appearance-none bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 custom-select"
            onChange={(e) => setSelectedSourceId(e.target.value)}
            value={selectedSourceId}
            disabled={selectedSource === "all"}
          >
            {selectedSource === "card" && cards.map((card) => (
              <option key={card.id} value={card.id}>
                Card {card.Type} {card.cardNumber.slice(-4)}
              </option>
            ))}
            {selectedSource === "account" && accounts.map((account) => (
              <option key={account.id} value={account.id}>
                Account {account.Type} {account.accountRib}
              </option>
            ))}
          </select>

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

          <select
            className="block p-2 pr-8 text-sm text-gray-900 border border-gray-300 rounded-lg appearance-none bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 custom-select"
            onChange={(e) => setOperationType(e.target.value)}
            value={operationType}
          >
            <option value="all">All</option>
            <option value="incomes">Incomes</option>
            <option value="expenses">Expenses</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        {transactions.length === 0 ? (
          <div className="text-center text-gray-600">No transactions available</div>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction.id} className="grid items-center grid-cols-9 px-4 py-4 text-sm bg-gray-100 rounded-lg gap-x-4">
              <div className="font-medium text-blue-500">Transaction {transaction.id}</div>
              <span className="flex items-center justify-center">
                {transaction.operation === "WITHDRAWAL" ? (
                  <i className="p-1 text-xl text-red-500 bg-red-100 icon-withdrawal_icon"></i>
                ) : (
                  <i className="p-1 text-xl text-green-500 bg-green-100 icon-deposit_icon"></i>
                )}
              </span>
              <div className="text-gray-600">{transaction.category}</div>
              <div className="w-40 text-gray-600">Payment Method: {transaction.paymentMethod}</div>
              <div className="w-40 text-gray-600 ml-14">{transaction.accountRib || transaction.cardNumber}</div>
              <div className="w-40 ml-16 text-gray-600">{new Date(transaction.dateTime).toLocaleDateString()}</div>
              <div className="w-40 text-gray-600 ml-14">{new Date(transaction.dateTime).toLocaleTimeString()}</div>
              <div
                className={`font-medium ml-10 ${transaction.status ? "text-green-500 bg-green-50" : "text-red-500 bg-red-50"} flex py-1 justify-center w-24 rounded-lg`}
              >
                {transaction.status ? "Completed" : "Failed"}
              </div>
              <div className="font-medium text-right">{`$${transaction.amount.toFixed(2)}`}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TransactionsList;
