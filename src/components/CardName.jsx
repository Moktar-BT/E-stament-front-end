import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CardName({ cardId }) {
  const [cardData, setCardData] = useState({
    current_balance: 0,
    payement_limit: 0,
    withdrawal_limit: 0,
    last_transaction: 0
  });

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:8083/Card/${cardId}/CPWL`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCardData(response.data);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    if (cardId) {
      fetchCardData();
    }
  }, [cardId]);

  // Fonction pour formater les nombres
  const formatCurrency = (amount) => {
    // Convertir en nombre au cas où c'est une string
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    
    // Vérifier si c'est un nombre entier
    if (Number.isInteger(num)) {
      return num.toLocaleString('en-US', {
        maximumFractionDigits: 0
      });
    }
    
    // Sinon afficher avec 2 décimales
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <h2 className="mb-6 text-lg font-medium text-gray-600">Card Details</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 md:gap-11 px-14">
        {/* Current Balance */}
        <div className="p-6 bg-indigo-500 border rounded-md shadow-md">
          <div className="grid items-center grid-cols-4">
            <div className="col-span-3">
              <h3 className="text-base font-thin text-white">Current Balance</h3>
              <span className="block mt-2 text-3xl font-bold text-white">
                ${formatCurrency(cardData.current_balance)}
              </span>
            </div>
            <div className="flex items-center justify-center w-12 h-12 col-span-1 mt-4 rounded-full bg-indigo-50 md:mt-0">
              <i className="text-3xl text-indigo-500 icon-balance_icon"></i>
            </div>
          </div>
        </div>
        
        {/* Payment Limit */}
        <div className="p-6 border rounded-md shadow-md">
          <div className="grid items-center grid-cols-4">
            <div className="col-span-3">
              <h3 className="text-base font-thin text-gray-600">Payment Limit</h3>
              <span className="block mt-2 text-3xl font-bold text-gray-700">
                ${formatCurrency(cardData.payement_limit)}
              </span>
            </div>
            <div className="flex items-center justify-center w-12 h-12 col-span-1 mt-4 rounded-full bg-red-50 md:mt-0">
              <i className="pl-1 text-3xl text-red-500 icon-payement_limit"></i>
            </div>
          </div>
        </div>
       
        {/* Withdrawal Limit */}
        <div className="p-6 border rounded-md shadow-md">
          <div className="grid items-center grid-cols-4">
            <div className="col-span-3">
              <h3 className="text-base font-thin text-gray-600">Withdrawal Limit</h3>
              <span className="block mt-2 text-3xl font-bold text-gray-700">
                ${formatCurrency(cardData.withdrawal_limit)}
              </span>
            </div>
            <div className="flex items-center justify-center w-12 h-12 col-span-1 mt-4 rounded-full bg-red-50 md:mt-0">
              <i className="text-3xl text-red-500 icon-withdrawal_limit_icon"></i>
            </div>
          </div>
        </div>

        {/* Last Transaction */}
        <div className="p-6 border rounded-md shadow-md">
          <div className="grid items-center grid-cols-4">
            <div className="col-span-3">
              <h3 className="text-base font-thin text-gray-600">Last Transaction</h3>
              <span className="block mt-2 text-3xl font-bold text-gray-700">
                ${formatCurrency(cardData.last_transaction)}
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

export default CardName;