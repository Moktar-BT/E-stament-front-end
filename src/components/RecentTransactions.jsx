import React, { useState, useEffect } from 'react';

function RecentTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:8083/Dashboard/getLast4transactions', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        
        const data = await response.json();
        
        // Transform API data to match the component's expected format
        const formattedTransactions = data.map(transaction => ({
          id: transaction.idTransaction,
          description: transaction.title,
          status: transaction.status ? "Completed" : "Failed",
          amount: transaction.amount // Assuming all amounts are positive in API
        }));
        
        setTransactions(formattedTransactions);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="w-full p-3 px-5 bg-white border border-gray-100 rounded-lg shadow-sm">
        <h3 className="mb-3 text-lg font-medium text-gray-600">Recent Transactions</h3>
        <div className="text-center">Loading transactions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-3 px-5 bg-white border border-gray-100 rounded-lg shadow-sm">
        <h3 className="mb-3 text-lg font-medium text-gray-600">Recent Transactions</h3>
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="w-full p-3 px-5 bg-white border border-gray-100 rounded-lg shadow-sm">
      {/* Header */}
      <h3 className="mb-3 text-lg font-medium text-gray-600">Recent Transactions</h3>

      {/* Transactions List */}
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="p-4 bg-gray-100 rounded-md">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-blue-500">Transaction #{transaction.id}</span>
              <span className={`text-sm px-3 py-1 ${transaction.status === "Completed" ? "text-green-500 bg-green-100 rounded-lg" : "text-red-500 bg-red-100 rounded-lg"}`}>
                {transaction.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">{transaction.description}</span>
              <span className="font-medium">
                {transaction.amount > 0 ? "+" : ""}$
                {Math.abs(transaction.amount).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center">
        <a href="#" className="text-sm text-blue-500 hover:underline">
          View all
        </a>
      </div>
    </div>
  );
}

export default RecentTransactions;