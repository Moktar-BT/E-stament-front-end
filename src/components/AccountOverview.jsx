import React, { useState, useEffect } from 'react';

function AccountOverview() {
  const [accountData, setAccountData] = useState({
    interestRate: 0,
    toTalBalance: 0,
    lastTransaction: 0,
    creditCards: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await fetch('http://localhost:8083/Dashboard/accountsOverview', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch account data');
        }
        
        const data = await response.json();
        setAccountData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAccountData();
  }, []);

  // Fonction de formatage personnalisée
  const formatCurrency = (value) => {
    const formatted = value.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
    return formatted.replace(/\.00$/, '');
  };

  if (loading) {
    return <div className="p-6 text-center">Loading account data...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg">
      <h2 className="mb-6 text-lg font-medium text-gray-600">Accounts Overview</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 md:gap-11 px-14">
        {/* Total Balance */}
        <div className="p-6 bg-indigo-500 border rounded-md shadow-md">
          <div className="grid items-center grid-cols-4">
            <div className="col-span-3">
              <h3 className="text-base font-thin text-white">Total Balance</h3>
              <span className="block mt-2 text-3xl font-bold text-white">
                ${formatCurrency(accountData.toTalBalance)}
              </span>
            </div>
            <div className="flex items-center justify-center w-12 h-12 col-span-1 mt-4 rounded-full bg-indigo-50 md:mt-0">
              <i className="text-3xl text-indigo-500 icon-balance_icon"></i>
            </div>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="p-6 border rounded-md shadow-md">
          <div className="grid items-center grid-cols-4">
            <div className="col-span-3">
              <h3 className="text-base font-thin text-gray-600">Interest Rate</h3>
              <span className="block mt-2 text-3xl font-bold text-gray-700">
                {accountData.interestRate}%
              </span>
            </div>
            <div className="flex items-center justify-center w-12 h-12 col-span-1 mt-4 rounded-full bg-red-50 md:mt-0">
              <i className="text-3xl text-red-500 icon-trend_icon"></i>
            </div>
          </div>
        </div>

        {/* Last Transaction */}
        <div className="p-6 border rounded-md shadow-md">
          <div className="grid items-center grid-cols-4">
            <div className="col-span-3">
              <h3 className="text-base font-thin text-gray-600">Last Transaction</h3>
              <span className="block mt-2 text-3xl font-bold text-gray-700">
                ${formatCurrency(accountData.lastTransaction)}
              </span>
            </div>
            <div className="flex items-center justify-center w-12 h-12 col-span-1 mt-4 rounded-full bg-emerald-50 md:mt-0">
              <i className="text-3xl text-emerald-500 icon-transaction_icon"></i>
            </div>
          </div>
        </div>

        {/* Credit Card */}
        <div className="p-6 border rounded-md shadow-md">
          <div className="grid items-center grid-cols-4">
            <div className="col-span-3">
              <h3 className="text-base font-thin text-gray-600">Credit Cards</h3>
              <span className="block mt-2 text-3xl font-bold text-gray-700">
                ${formatCurrency(accountData.creditCards)}
              </span>
            </div>
            <div className="flex items-center justify-center w-12 h-12 col-span-1 mt-4 rounded-full bg-purple-50 md:mt-0">
              <i className="text-3xl text-purple-500 icon-card_icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountOverview;