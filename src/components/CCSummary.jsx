import React, { useEffect, useState } from "react";
import axios from "axios";

function CCSummary({ cardId }) {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token non trouvé.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8083/Card/${cardId}/informations`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCardData(response.data);
      } catch (err) {
        setError("Erreur lors de la récupération des données.");
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, [cardId]);

  if (loading) return <p>Chargement des données...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const {
    iban,
    type,
    ownerFirstName,
    ownerLastName,
    cardNumber,
    currentbalance,
    availabLimit,
    expirationDate,
    cvv_cvc
  } = cardData;

  const utilizationPercentage = ((currentbalance / availabLimit) * 100).toFixed(1);

  const colors = type === "MASTERCARD"
    ? ["from-blue-400", "to-purple-700"]
    : ["from-yellow-400", "to-green-600"];

  return (
    <div
      className="flex flex-col justify-between w-full p-4 bg-white border border-gray-100 rounded-lg shadow-sm"
      style={{ minHeight: "250px" }}
    >
      <h3 className="mb-3 text-lg font-medium text-gray-600">Credit Card Summary</h3>
      <div className="px-5">
        {/* IBAN */}
        <div className="flex justify-center mb-4">
          <p className="text-gray-600"><span className="font-bold">IBAN:</span> {iban}</p>
        </div>

        {/* Credit Card */}
        <div className="relative flex-grow mb-3">
          <div className={`relative overflow-hidden h-44 rounded-xl bg-gradient-to-br ${colors[0]} ${colors[1]}`}>
            <div className="absolute inset-0">
              <div className={`absolute inset-0 ${colors[0].replace("from-", "bg-")}`}></div>
              <div
                className={`absolute ${colors[1].replace("to-", "bg-")}`}
                style={{
                  top: "30%",
                  right: 0,
                  bottom: 0,
                  left: 0,
                  clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 100%)"
                }}
              ></div>
            </div>

            <div className="relative flex flex-col justify-between h-full p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white">Credit</span>
                <span className="text-xl italic font-bold text-white">{type}</span>
              </div>

              <div className="mt-auto">
                <p className="mb-1 text-white">{ownerFirstName} {ownerLastName}</p>
                <p className="text-sm font-medium tracking-wider text-white">{cardNumber}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Utilization Progress */}
        <div className="h-1 mb-4 bg-indigo-100 rounded-full">
          <div
            className="h-full bg-indigo-500 rounded-full"
            style={{ width: `${utilizationPercentage}%` }}
          ></div>
        </div>

        {/* Balance Info */}
        <div className="flex justify-between">
          <div>
            <p className="mb-1 text-gray-600">Current Balance</p>
            <p className="text-lg font-bold">${currentbalance.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="mb-3 text-gray-600">Available Limit</p>
            <p className="text-lg font-bold">${availabLimit.toLocaleString()}</p>
          </div>
        </div>

        {/* Extra Card Info */}
        <div className="mb-4">
          <p className="text-gray-600"><span className="font-bold">Card Number: </span> {cardNumber}</p>
          <p className="text-gray-600"><span className="font-bold">Card Type: </span> {type}</p>
          <p className="text-gray-600"><span className="font-bold">Expiration Date: </span> {expirationDate.slice(0, 10)}</p>
          <p className="text-gray-600"><span className="font-bold">CVV/CVC: </span> ***********{cvv_cvc.toString().slice(-3)}</p>
        </div>
      </div>
    </div>
  );
}

export default CCSummary;
