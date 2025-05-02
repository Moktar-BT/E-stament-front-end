import React, { useState, useEffect } from 'react';
import AccountName from '../components/AccountName';
import A_C_Transactions from '../components/A_C_Transactions';
import Logoutbutton from '../components/Logoutbutton';
import CardForAccount from '../components/CardForAccount';
import RightSideModal from '../components/RightSideModal';

function Accounts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await fetch('http://localhost:8083/Account/list_of_accounts', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('Access denied - please check your permissions');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAccounts(data);
        if (data.length > 0) {
          setSelectedAccount(data[0]);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching accounts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleAccountSwitch = (account) => {
    setSelectedAccount(account);
    setIsModalOpen(false);
  };

  const getAccountTypeName = (type) => {
    switch (type) {
      case 'CHECKING': return 'Checking';
      case 'SAVINGS': return 'Savings';
      case 'BUSINESS': return 'Business';
      default: return type;
    }
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(field);
      setTimeout(() => setCopied(''), 2000); // Reset after 2 seconds
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  if (isLoading) {
    return <div className="p-6 text-center">Loading account data...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Error: {error}
        <br />
        {error.includes('Access denied') && (
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  if (!selectedAccount) {
    return <div className="p-6 text-center">No account available</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between p-2 px-4 mb-4 bg-white rounded-lg">
        <h1 className="text-3xl font-bold text-gray-700">Account Overview</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-6 py-2 text-green-500 transition-colors bg-green-100 rounded-lg hover:bg-green-200"
            disabled={accounts.length <= 1}
          >
            Switch Account
          </button>
          <Logoutbutton />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-3 py-2 space-y-4 bg-white rounded-md md:flex-row md:space-y-0 md:space-x-24 md:items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleCopy(selectedAccount.rib, 'rib')}
            className="px-2 py-1 font-mono text-gray-600 border border-gray-500 rounded-xl hover:bg-gray-100"
          >
            {copied === 'rib' ? 'Copied!' : 'Copy'}
            <i className="ml-1 text-gray-600 icon-copy_icon"></i>
          </button>
          <span>RIB: {selectedAccount.rib}</span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleCopy(selectedAccount.iban, 'iban')}
            className="px-2 py-1 font-mono text-gray-600 border border-gray-500 rounded-xl hover:bg-gray-100"
          >
            {copied === 'iban' ? 'Copied!' : 'Copy'}
            <i className="ml-1 text-gray-600 icon-copy_icon"></i>
          </button>
          <span>IBAN: {selectedAccount.iban}</span>
        </div>

        <div className="flex items-center">
          <span>Account Type: {getAccountTypeName(selectedAccount.accountType)}</span>
        </div>
      </div>

      <div className="mt-3 mb-7">
        <AccountName account={selectedAccount} />
      </div>

      <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
        <div className="md:col-span-2">
          <A_C_Transactions accountId={selectedAccount.id} />
        </div>
        <div className="md:col-span-1">
          <CardForAccount accountId={selectedAccount.id} />
        </div>
      </div>

      <div className="mt-10 ml-5">
        <span className="text-gray-600">© 2025 Proxym IT. All rights reserved.</span>
      </div>

      <RightSideModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Switch Account"
      >
        <div className="space-y-4">
          {accounts.map(account => (
            <div
              key={account.id}
              onClick={() => handleAccountSwitch(account)}
              className={`p-4 transition-colors border rounded-lg cursor-pointer hover:bg-gray-50 ${account.id === selectedAccount.id ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {getAccountTypeName(account.accountType)}
                    {account.accountName && ` - ${account.accountName}`}
                  </h3>
                  <p className="text-sm text-gray-500">•••• {account.rib.slice(-4)}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">
                    {account.balance.toLocaleString('fr-FR')}
                  </p>
                  <p className="text-xs text-gray-400">Available balance</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </RightSideModal>
    </>
  );
}

export default Accounts;
