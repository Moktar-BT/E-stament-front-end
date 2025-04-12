import React, { useState, useEffect } from 'react';

function AccountName({ account }) {
  const [cpiData, setCpiData] = useState({
    currente_balance: 0,
    panding_balance: 0,
    interest_balance: 0,
    last_transaction: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCPILData = async () => {
      if (!account?.id) return;
      
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await fetch(`http://localhost:8083/Account/${account.id}/CPIL`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCpiData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching CPIL data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCPILData();
  }, [account?.id]);

  const formatBalance = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const capitalizeFirstLetter = (str) => {
    return str ? `${str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()} Account` : 'Account Overview';
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg">
        <h2 className="mb-6 text-lg font-medium text-gray-600">Loading account data...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg">
        <h2 className="mb-6 text-lg font-medium text-gray-600">Account Overview</h2>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg">
      <h2 className="mb-6 text-lg font-medium text-gray-600">
        {capitalizeFirstLetter(account?.accountType)}
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 md:gap-11 px-14">
        {/* Current Balance */}
        <div className="p-6 bg-indigo-500 border rounded-md shadow-md">
          <div className="grid items-center grid-cols-4">
            <div className="col-span-3">
              <h3 className="text-base font-thin text-white">Current Balance</h3>
              <span className="block mt-2 text-3xl font-bold text-white">
                ${formatBalance(cpiData.currente_balance)}
              </span>
            </div>
            <div className="flex items-center justify-center w-12 h-12 col-span-1 mt-4 rounded-full bg-indigo-50 md:mt-0">
              <i className="text-3xl text-indigo-500 icon-balance_icon"></i>
            </div>
          </div>
        </div>
        
        {/* Pending Balance */}
        <div className="p-6 border rounded-md shadow-md">
          <div className="grid items-center grid-cols-4">
            <div className="col-span-3">
              <h3 className="text-base font-thin text-gray-600">Pending Balance</h3>
              <span className="block mt-2 text-3xl font-bold text-gray-700">
                ${formatBalance(cpiData.panding_balance)}
              </span>
            </div>
            <div className="flex items-center justify-center w-12 h-12 col-span-1 mt-4 rounded-full bg-red-50 md:mt-0">
              <i className="text-3xl text-red-500 icon-sand-clock_icon"></i>
            </div>
          </div>
        </div>
       
        {/* Interest Rate */}
        <div className="p-6 border rounded-md shadow-md">
          <div className="grid items-center grid-cols-4">
            <div className="col-span-3">
              <h3 className="text-base font-thin text-gray-600">Interest Rate</h3>
              <span className="block mt-2 text-3xl font-bold text-gray-700">
                {cpiData.interest_balance}%
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
                ${formatBalance(cpiData.last_transaction)}
              </span>
            </div>
            <div className="flex items-center justify-center w-12 h-12 col-span-1 mt-4 rounded-full bg-emerald-50 md:mt-0">
              <i className="text-3xl text-emerald-500 icon-transaction_icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountName;
