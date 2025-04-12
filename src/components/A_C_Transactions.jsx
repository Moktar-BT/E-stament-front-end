"use client"
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

function A_C_Transactions({ accountId }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('this_month');
  const [operationType, setOperationType] = useState('all');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (!accountId) return; // Don't fetch if no accountId
        
        setLoading(true);
        let url = `http://localhost:8083/Account/account/${accountId}?`;
        
        // Add period filter if not 'all'
        if (period && period !== 'all') {
          url += `period=${period}&`;
        }
        
        // Add operationType filter if not 'all'
        if (operationType && operationType !== 'all') {
          url += `operationType=${operationType}`;
        }

        const token = localStorage.getItem('token');
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [accountId, period, operationType]);

  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
  };

  const formatTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString('en-GB', { hour12: false }); // 24-hour format
  };

  const getStatusText = (status) => {
    return status ? 'Completed' : 'Failed';
  };

  const getOperationIcon = (operation) => {
    switch(operation) {
      case 'DEPOSIT':
        return <i className="p-1 text-xl text-green-500 bg-green-100 icon-deposit_icon"></i>;
      case 'WITHDRAWAL':
        return <i className="p-1 text-xl text-red-500 bg-red-100 icon-withdrawal_icon"></i>;
      case 'TRANSFER':
        return <i className="p-1 text-xl text-red-500 bg-red-100 icon-withdrawal_icon"></i>;
      case 'PAYMENT':
      case 'FEE':
        return <i className="p-1 text-xl text-red-500 bg-red-100 icon-withdrawal_icon"></i>;
      default:
        return <i className="p-1 text-xl text-red-500 bg-red-100 icon-withdrawal_icon"></i>;
    }
  };

  if (loading) return <div className="p-6 text-center">Loading transactions...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 mx-auto bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-800">Transactions History</h2>
        <div className="flex items-center space-x-4">
          <select 
            className="block p-2 pr-8 text-sm text-gray-900 border border-gray-300 rounded-lg appearance-none bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 custom-select"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="this_week" >This Week</option>
            <option value="this_month">This Month</option>
            <option value="last_month">Last Month</option>
            <option value="last_3_months">Last 3 Months</option>
          </select>
          <select 
            className="block p-2 pr-8 text-sm text-gray-900 border border-gray-300 rounded-lg appearance-none bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 custom-select"
            value={operationType}
            onChange={(e) => setOperationType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="incomes">Incomes</option>
            <option value="expenses">Expenses</option> 
          </select>
          <i className="text-lg text-gray-600 icon-filter_icon hover:text-gray-800"></i>
          <span className="font-mono text-sm">Filter</span>
        </div>
      </div>

      <div className="space-y-3 overflow-y-auto max-h-[397px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-w-[2px] min-h-[397px]">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between px-5 py-3 bg-gray-100 border-b border-gray-100 rounded-md">
              <div className="flex items-center space-x-10">
                <span className="font-medium text-indigo-500">transaction #{transaction.id}</span>
                <span>
                  {getOperationIcon(transaction.opereation)}
                </span>
                <span className="text-gray-600 w-28">{transaction.category}</span>
                <span className="text-gray-600">
                  {formatDate(transaction.dateTime)} 
                </span>
                <span className="text-gray-600">
                  {formatTime(transaction.dateTime)}
                </span>
              </div>
              <div className="flex items-center">
                {transaction.status ? (
                  <span className="px-3 py-1 mr-4 text-sm text-green-500 rounded-md bg-green-50">
                    {getStatusText(transaction.status)}
                  </span>
                ) : (
                  <span className="px-3 py-1 mr-8 text-sm text-red-500 rounded-md bg-red-50">
                    {getStatusText(transaction.status)}
                  </span>
                )}
                <span className={`font-medium ${transaction.opereation === 'DEPOSIT' ? 'text-green-500' : 'text-red-500'}`}>
                  {transaction.opereation === 'DEPOSIT' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            No transactions found for the selected period
          </div>
        )}
      </div>
    </div>
  );
}

A_C_Transactions.propTypes = {
  accountId: PropTypes.number.isRequired,
};

export default A_C_Transactions;