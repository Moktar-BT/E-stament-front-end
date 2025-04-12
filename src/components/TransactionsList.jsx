"use client";

function TransactionsList() {
  // Sample transaction data based on the image
  const transactions = [
    {
        id: "#456",
        type: "Deposit",
        category: "Housing Costs",
        paymentMethod: "PayPal",
        cardNumber: "**** **** ****6265",
        date: "23/08/2025",
        time: "12:08:34",
        status: "Completed",
        amount: "-$85.50",
      },
      {
        id: "#456",
        type: "Deposit",
        category: "Housing Costs",
        paymentMethod: "PayPal",
        cardNumber: "**** **** ****6265",
        date: "23/08/2025",
        time: "12:08:34",
        status: "Failed",
        amount: "-$85.50",
      },
      {
        id: "#456",
        type: "Deposit",
        category: "Housing Costs",
        paymentMethod: "PayPal",
        cardNumber: "**** **** ****6265",
        date: "23/08/2025",
        time: "12:08:34",
        status: "Completed",
        amount: "-$85.50",
      },
      {
        id: "#456",
        type: "Deposit",
        category: "Housing Costs",
        paymentMethod: "PayPal",
        cardNumber: "**** **** ****6265",
        date: "23/08/2025",
        time: "12:08:34",
        status: "Failed",
        amount: "-$85.50",
      },
      {
        id: "#456",
        type: "Deposit",
        category: "Housing Costs",
        paymentMethod: "PayPal",
        cardNumber: "**** **** ****6265",
        date: "23/08/2025",
        time: "12:08:34",
        status: "Completed",
        amount: "-$85.50",
      },
      {
        id: "#456",
        type: "Deposit",
        category: "Housing Costs",
        paymentMethod: "PayPal",
        cardNumber: "**** **** ****6265",
        date: "23/08/2025",
        time: "12:08:34",
        status: "Completed",
        amount: "-$85.50",
      },
      {
        id: "#456",
        type: "Deposit",
        category: "Housing Costs",
        paymentMethod: "PayPal",
        cardNumber: "**** **** ****6265",
        date: "23/08/2025",
        time: "12:08:34",
        status: "Completed",
        amount: "-$85.50",
      },
      {
        id: "#456",
        type: "Deposit",
        category: "Housing Costs",
        paymentMethod: "PayPal",
        cardNumber: "**** **** ****6265",
        date: "23/08/2025",
        time: "12:08:34",
        status: "Completed",
        amount: "-$85.50",
      },
      {
        id: "#456",
        type: "Deposit",
        category: "Housing Costs",
        paymentMethod: "PayPal",
        cardNumber: "**** **** ****6265",
        date: "23/08/2025",
        time: "12:08:34",
        status: "Completed",
        amount: "-$85.50",
      },
      {
          id: "#456",
          type: "Deposit",
          category: "Housing Costs",
          paymentMethod: "PayPal",
          cardNumber: "**** **** ****6265",
          date: "23/08/2025",
          time: "12:08:34",
          status: "Completed",
          amount: "-$85.50",
        },
        {
          id: "#456",
          type: "withdrawal",
          category: "Housing Costs",
          paymentMethod: "PayPal",
          cardNumber: "**** **** ****6265",
          date: "23/08/2025",
          time: "12:08:34",
          status: "Completed",
          amount: "-$85.50",
        },
        {
          id: "#456",
          type: "Deposit",
          category: "Housing Costs",
          paymentMethod: "PayPal",
          cardNumber: "**** **** ****6265",
          date: "23/08/2025",
          time: "12:08:34",
          status: "Completed",
          amount: "-$85.50",
        },
        {
          id: "#456",
          type: "Deposit",
          category: "Housing Costs",
          paymentMethod: "PayPal",
          cardNumber: "**** **** ****6265",
          date: "23/08/2025",
          time: "12:08:34",
          status: "Completed",
          amount: "-$85.50",
        },
        {
          id: "#456",
          type: "Deposit",
          category: "Housing Costs",
          paymentMethod: "PayPal",
          cardNumber: "**** **** ****6265",
          date: "23/08/2025",
          time: "12:08:34",
          status: "Completed",
          amount: "-$85.50",
        },
        {
          id: "#456",
          type: "Deposit",
          category: "Housing Costs",
          paymentMethod: "PayPal",
          cardNumber: "**** **** ****6265",
          date: "23/08/2025",
          time: "12:08:34",
          status: "Completed",
          amount: "-$85.50",
        },    {
          id: "#456",
          type: "Deposit",
          category: "Housing Costs",
          paymentMethod: "PayPal",
          cardNumber: "**** **** ****6265 ",
          date: "23/08/2025",
          time: "12:08:34",
          status: "Completed",
          amount: "-$85.50",
        },
  ];

  return (
    <div className="p-6 mx-auto bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-700">Transaction History</h2>
        <div className="flex items-center space-x-4">
         
          <div className="flex items-center space-x-4">
          <select className="block p-2 pr-8 text-sm text-gray-900 border border-gray-300 rounded-lg appearance-none bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 custom-select">
              <option selected>All</option>
              <option>Card</option>
              <option>Account</option>
            </select>
            <select className="block p-2 pr-8 text-sm text-gray-900 border border-gray-300 rounded-lg appearance-none bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 custom-select">
              <option selected>Carte PayPal ****6265 ▼
                 </option>
              <option>card 1</option>
              <option>card 1</option>
            </select>
            <select className="block p-2 pr-8 text-sm text-gray-900 border border-gray-300 rounded-lg appearance-none bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 custom-select">
              <option>This Week</option>
              <option selected>This Month</option>
              <option>Last 3 Months</option>
            </select>
            <select className="block p-2 pr-8 text-sm text-gray-900 border border-gray-300 rounded-lg appearance-none bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 custom-select">
              <option selected>All</option>
              <option>Deposit</option>
              <option>Withdrawal</option>
            </select>
            <i className="text-lg text-gray-600 icon-filter_icon hover:text-gray-800"></i>
            <span className="font-mono text-sm">Filter</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="grid items-center grid-cols-9 px-4 py-4 text-sm bg-gray-100 rounded-lg gap-x-4"
          >
            <div className="font-medium text-blue-500">Transaction {transaction.id}</div>
            <span className="flex items-center justify-center">
              {transaction.type === "Deposit" ? (
                <i className="p-1 text-xl text-green-500 bg-green-100 icon-deposit_icon"></i>
              ) : (
                <i className="p-1 text-xl text-red-500 bg-red-100 icon-withdrawal_icon"></i>
              )}
            </span>
            <div className="text-gray-600">{transaction.category}</div>
            <div className="w-40 text-gray-600">Payment Method: {transaction.paymentMethod}</div>
            <div className="w-40 text-gray-600 ml-14">{transaction.cardNumber}</div>
            <div className="w-40 ml-16 text-gray-600">{transaction.date}</div>
            <div className="w-40 text-gray-600 ml-14">{transaction.time}</div>
            <div
              className={`font-medium ml-10 ${
                transaction.status === "Completed"
                  ? "text-green-500 bg-green-50 flex py-1 justify-center w-24 rounded-lg"
                  : "text-red-500 bg-red-50 flex py-1 justify-center w-24 rounded-lg"
              }`}
            >
              {transaction.status}
            </div>
            <div className="font-medium text-right">{transaction.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionsList;