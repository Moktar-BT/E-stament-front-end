import React from 'react';
import AccountOverview from '../components/AccountOverview';
import IncomesVsExpenses from '../components/IncomesVsExpenses';
import Budget from '../components/Budget';
import ExpensesAnalyses from '../components/ExpensesAnalyses';
import RecentTransactions from '../components/RecentTransactions';
import CreditCard from '../components/CreaditCards';
import Logoutbutton from '../components/Logoutbutton';

function Dashboard() {
  return (
    <>
      {/* Header avec titre, sélecteur et icône de filtre */}
      <div className="flex items-center justify-between p-2 px-4 mb-6 bg-white rounded-lg">
        <h1 className="text-3xl font-bold text-gray-700">Banking Dashboard</h1>
      <Logoutbutton />
      
      </div>

      {/* Contenu du tableau de bord */}
      <div className='col-span-1 mb-7'>
        <AccountOverview />
      </div>
      <div className='col-span-1'>
        <div className='grid grid-cols-3 gap-7'>
          <div className='col-span-1'>
            <IncomesVsExpenses />
          </div>
          <div className='col-span-1'>
            <Budget />
          </div>
          <div className='col-span-1'>
            <CreditCard />
          </div>
        </div>
        <div className='col-span-1 mt-7'>
          <div className='grid grid-cols-3 gap-7'>
            <div className='col-span-2'>
              <ExpensesAnalyses />
            </div>
            <div className='col-span-1'>
              <RecentTransactions />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 ml-5">
        <span className="text-gray-600">© 2025 Proxym IT. All rights reserved.</span>
      </div>
    </>
  );
}

export default Dashboard;