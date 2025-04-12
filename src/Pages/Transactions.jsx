import React from 'react'
import Logoutbutton from '../components/Logoutbutton'
import TransactionsList from '../components/TransactionsList'

function Transactions() {
  return (
    <>
    <div className="flex items-center justify-between p-2 px-4 mb-6 bg-white rounded-lg">
        <h1 className="text-3xl font-bold text-gray-700">Transactions</h1>
      <Logoutbutton />
      </div>
      <TransactionsList />
       {/* Footer */}
       <div className="mt-10 ml-5">
        <span className="text-gray-600">© 2025 Proxym IT. All rights reserved.</span>
      </div>
    </>
  )
}

export default Transactions