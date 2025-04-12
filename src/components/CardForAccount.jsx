import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function CardForAccount({ accountId }) {
  const location = useLocation();
  const isRootPath = location.pathname === "/";
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    const fetchCreditCards = async () => {
      try {
        if (!accountId) {
          setCardsData([]);
          setLoading(false);
          return;
        }
        
        setLoading(true);
        const response = await fetch(`http://localhost:8083/Account/${accountId}/cards/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch credit cards data');
        }
        
        const apiData = await response.json();
        
        // Transform API data to match our component structure
        const transformedData = apiData.map(card => {
          // Calculate utilization percentage
          const utilizationPercentage = card.availableLimit > 0 
            ? (card.currentBalance / card.availableLimit) * 100 
            : 0;
          
          // Get colors based on card type
          let colors;
          switch(card.cardType) {
            case 'VISA':
              colors = ["from-yellow-500", "to-purple-500"];
              break;
            case 'MASTERCARD':
              colors = ["from-blue-400", "to-purple-700"];
              break;
            case 'AMEX':
              colors = ["from-teal-500", "to-red-500"];
              break;
            default:
              colors = ["from-gray-400", "to-gray-600"];
          }
          
          // Format card number for display (last 4 digits)
          const lastFourDigits = card.cardNumber.slice(-4);
          const formattedNumber = `•••• •••• •••• ${lastFourDigits}`;
          
          // Format expiration date (MM/YY)
          const expDate = new Date(card.expirationDate);
          const formattedExpDate = `${String(expDate.getMonth() + 1).padStart(2, '0')}/${String(expDate.getFullYear()).slice(-2)}`;
          
          return {
            type: card.cardType,
            name: card.cardFounderName,
            number: formattedNumber,
            fullNumber: card.cardNumber, // Store full number for copy functionality
            currentBalance: card.currentBalance,
            availableLimit: card.availableLimit,
            expirationDate: formattedExpDate,
            cvv: `***${card.ccv_cvc.toString().slice(-3)}`, // Show only last 3 digits
            utilizationPercentage: utilizationPercentage,
            colors: colors,
            rawData: card // Keep original data if needed
          };
        });
        
        setCardsData(transformedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCreditCards();
  }, [accountId]); // Re-fetch when accountId changes

  // Rest of the component remains the same...
  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cardsData.length);
  };

  const prevCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? cardsData.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-between w-full p-4 bg-white border border-gray-100 rounded-lg shadow-sm " style={{ minHeight: "250px" }}>
        <h3 className="mb-3 text-lg font-medium text-gray-600">Credit Card Summary</h3>
        <div className="flex items-center justify-center h-full">
          <p>Loading credit cards...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-between w-full p-4 bg-white border border-gray-100 rounded-lg shadow-sm" style={{ minHeight: "250px" }}>
        <h3 className="mb-3 text-lg font-medium text-gray-600">Credit Card Summary</h3>
        <div className="flex items-center justify-center h-full text-red-500">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (cardsData.length === 0) {
    return (
      <div className="flex flex-col justify-between w-full p-4 bg-white border border-gray-100 rounded-lg shadow-sm" style={{ minHeight: "250px" }}>
        <h3 className="mb-3 text-lg font-medium text-gray-600">Credit Card Summary</h3>
        <div className="flex items-center justify-center h-full">
          <p>No credit cards found for this account</p>
        </div>
      </div>
    );
  }

  const cardData = cardsData[currentCardIndex];

  return (
    <div
      className="flex flex-col justify-between w-full p-4 bg-white border border-gray-100 rounded-lg shadow-sm h-[498px]"
      style={{ minHeight: "250px" }}
    >
      {/* Header */}
      <h3 className="mb-3 text-lg font-medium text-gray-600">Credit Card Summary</h3>
      <div className="px-5">
        {/* Credit Card */}
        <div className="relative flex-grow mb-3">
          {/* Card Container */}
          <div
            className={`relative overflow-hidden h-44 rounded-xl bg-gradient-to-br ${cardData.colors[0]} ${cardData.colors[1]}`}
          >
            {/* Diagonal Design */}
            <div className="absolute inset-0">
              <div className={`absolute inset-0 ${cardData.colors[0].replace("from-", "bg-")}`}></div>
              <div
                className={`absolute ${cardData.colors[1].replace("to-", "bg-")}`}
                style={{
                  top: "30%",
                  right: 0,
                  bottom: 0,
                  left: 0,
                  clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 100%)",
                }}
              ></div>
            </div>

            {/* Card Content */}
            <div className="relative flex flex-col justify-between h-full p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white">Credit</span>
                <span className="text-xl italic font-bold text-white">
                  {cardData.type}
                </span>
              </div>

              <div className="mt-auto">
                <p className="mb-1 text-white">{cardData.name}</p>
                <p className="text-sm font-medium tracking-wider text-white">
                  {cardData.number}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {cardsData.length > 1 && (
            <>
              <button
                onClick={prevCard}
                className="absolute left-0 flex items-center justify-center w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-md top-1/2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button
                onClick={nextCard}
                className="absolute right-0 flex items-center justify-center w-8 h-8 translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-md top-1/2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {cardsData.length > 1 && (
          <div className="flex justify-center gap-1 mb-3">
            {cardsData.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentCardIndex ? "bg-indigo-500" : "bg-gray-200"
                }`}
              ></div>
            ))}
          </div>
        )}

        {/* Card Label */}
        {cardsData.length > 1 && (
          <div className="mb-4">
            <p className="font-medium text-gray-700">
              Card {currentCardIndex + 1} of {cardsData.length}
            </p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="h-1 mb-4 bg-indigo-100 rounded-full">
          <div
            className="h-full bg-indigo-500 rounded-full"
            style={{ width: `${Math.min(cardData.utilizationPercentage, 100)}%` }}
          ></div>
        </div>

        {/* Balance Information */}
        <div className="flex justify-between">
          <div>
            <p className="mb-1 text-gray-600">Current Balance</p>
            <p className="text-lg font-bold">
              ${cardData.currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-right">
            <p className="mb-3 text-gray-600">Available Limit</p>
            <p className="text-lg font-bold">
              ${cardData.availableLimit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Card Information (hidden if root path) */}
        {!isRootPath && (
          <div className="mb-5">
            <p className="text-gray-600"><span className="font-bold">Card Number: </span>{cardData.number}</p>
            <p className="text-gray-600"><span className="font-bold">Expiration Date:</span> {cardData.expirationDate}</p>
            <p className="text-gray-600"><span className="font-bold">CVV/CVC:</span> {cardData.cvv}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardForAccount;