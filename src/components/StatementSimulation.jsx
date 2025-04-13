import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/proxym_log.png';
import { Info } from 'lucide-react';

function StatementSimulation({ accountSelected,card, dateRange, operationType }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      // Get the token from localStorage
      const token = localStorage.getItem('authToken');
  
      if (!token) {
        setError('Authorization token not found.');
        setLoading(false);
        return;
      }
  
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8083/Transactions/StatementTransactions', {
          params: {
            cardId: 101,
            startDate: "2025-01-01T00:00:00",
            endDate: "2025-04-16T00:00:00",
            operationTypes: "DEPOSIT,WITHDRAWAL,TRANSFER,PAYMENT,FEE,ADJUSTMENT"
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data);
      } catch (error) {
        setError('Error fetching transactions');
      } finally {
        setLoading(false);
      }
    };
  
    fetchTransactions();
  }, []);
  
  

  // Calculate summary
  const totalDeposits = transactions
    .filter((t) => t.type === 'Deposit')
    .reduce((sum, t) => sum + parseFloat(t.credit.replace('$', '').replace(',', '') || 0), 0);
  const totalWithdrawals = transactions
    .filter((t) => t.type === 'Withdrawal' || t.type === 'Payment' || t.type === 'Transfer')
    .reduce((sum, t) => sum + parseFloat(t.debit.replace('$', '').replace(',', '') || 0), 0);

  return (
    <>
      {/* Preview Panel */}
      <div className="lg:col-span-2">
        <div className="h-full p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="flex text-lg font-medium text-gray-800">
              <img src={logo} className="flex h-12 " alt="" />
              <span className="mt-2">Statement Preview</span>
            </h3>
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
    </>
  );
}

export default StatementSimulation;
