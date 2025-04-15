import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import Logoutbutton from "../components/Logoutbutton";
import RightSideModal from '../components/RightSideModal';
import StatementSimulation from "../components/StatementSimulation";
import axios from "axios";
import FileType from "../components/FileType";
import DateRange from "../components/DateRange";

function Statement() {
  const [transactionTypes, setTransactionTypes] = useState({
    deposits: true,
    withdrawals: true,
    transfers: true,
    payments: true,
    fees: true,
  });
  
  const [accountSelected, setAccountSelected] = useState("");
  const [Card, setCard] = useState("");
  const [statementType, setStatementType] = useState("Account-E-Statement");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: "2022-05-01",
    to: "2023-05-31",
  });
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found!");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        if (statementType === "Account-E-Statement") {
          const response = await axios.get("http://localhost:8083/Account/list_of_accounts", { headers });
          setAccounts(response.data);
          if (response.data.length > 0) {
            const account = response.data[0];
            const lastFourDigits = account.rib.slice(-4);
            setAccountSelected(`${account.accountType} Account (****${lastFourDigits})`);
          }
        } else {
          const response = await axios.get("http://localhost:8083/Card/list_of_cards", { headers });
          setCards(response.data);
          if (response.data.length > 0) {
            const card = response.data[0];
            const lastFourDigits = card.cardNumber.slice(-4);
            setAccountSelected(`${card.cardType} Card (****${lastFourDigits})`);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response && error.response.status === 403) {
          console.error("Forbidden: Token might be expired or invalid.");
        }
      } finally {
        setLoading(false);
      }
    };
    console.log(statementType)
    fetchData();
  }, [statementType, dateRange]); // Note: dateRange is in the dependency array, so you can trigger a data fetch when it updates

  return (
    <>
      <div className="flex items-center justify-between p-2 px-4 mb-4 bg-white rounded-lg">
        <h1 className="text-3xl font-bold text-gray-700">E-Statement</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-6 py-2 text-green-500 transition-colors bg-green-100 rounded-lg hover:bg-green-200"
          >
            Switch Statement Type
          </button>
          <Logoutbutton />
        </div>
      </div>

      <div className="min-h-screen">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Configuration Panel */}
          <div className="space-y-6 lg:col-span-1">
            {/* Account/Card Selection */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-medium text-gray-800">
                {statementType === "Account-E-Statement" ? "Account" : "Card"}
              </h3>
              <div className="relative">
                {loading ? (
                  <div className="w-full p-3 text-center text-gray-500 bg-gray-100 rounded-md">
                    Loading...
                  </div>
                ) : (
                  <select
                    className="w-full p-3 pr-10 border border-gray-200 rounded-md appearance-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={accountSelected}
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      setAccountSelected(selectedValue);

                      // Extract the card data based on the selected value when on Card-E-Statement
                      const selectedCard = cards.find(
                        (card) => `${card.cardType} Card (****${card.cardNumber.slice(-4)})` === selectedValue
                      );
                      if (selectedCard) {
                        setCard(selectedCard);
                      }
                    }}
                  >
                    {statementType === "Account-E-Statement"
                      ? accounts.map((account) => {
                          const lastFourDigits = account.rib.slice(-4);
                          const displayText = `${account.accountType} Account (****${lastFourDigits})`;
                          return (
                            <option key={account.id} value={displayText}>
                              {displayText}
                            </option>
                          );
                        })
                      : cards.map((card) => {
                          const lastFourDigits = card.cardNumber.slice(-4);
                          const displayText = `${card.cardType} Card (****${lastFourDigits})`;
                          return (
                            <option key={card.id} value={displayText}>
                              {displayText}
                            </option>
                          );
                        })}
                  </select>
                )}
              </div>
            </div>

            {/* Date Range Options */}
            {/* Pass setDateRange to allow the child to update dateRange in the parent */}
            <DateRange dateRange={dateRange} setDateRange={setDateRange} />
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-medium text-gray-800">Transaction Types</h3>
              <div className="space-y-3">
                {Object.entries(transactionTypes).map(([type, checked]) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      id={type}
                      checked={checked}
                      onChange={() => setTransactionTypes({ ...transactionTypes, [type]: !checked })}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor={type} className="block ml-2 text-sm text-gray-700 capitalize">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <FileType />

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                className="flex items-center justify-center w-full px-4 py-3 text-white transition-colors bg-indigo-500 rounded-md hover:bg-indigo-600"
                onClick={() => alert("Statement downloaded!")}
              >
                <Download size={18} className="mr-2" />
                Download Statement
              </button>
            </div>
          </div>

          <StatementSimulation
            accountID={accountSelected}
            cardId={Card}
            dateRange={dateRange}
            operationType={transactionTypes}
            statementType={statementType}
          
          />
        </div>
        {/* Footer */}
        <div className="mt-10 ml-5">
          <span className="text-gray-600">© 2025 Proxym IT. All rights reserved.</span>
        </div>
      </div>

      <RightSideModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select E-Statement Type"
      >
        <div className="space-y-4">
          <div
            onClick={() => {
              setStatementType("Account-E-Statement");
              setIsModalOpen(false);
            }}
            className="flex items-center p-4 transition-colors border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
          >
            <span>Account E-Statement</span>
            <i className="ml-2 text-2xl icon-statement_icon"></i>
          </div>

          <div
            onClick={() => {
              setStatementType("Card-E-Statement");
              setIsModalOpen(false);
            }}
            className="flex items-center p-4 transition-colors border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
          >
            <span>Card E-Statement</span>
            <i className="ml-2 text-2xl icon-statement_icon"></i>
          </div>
        </div>
      </RightSideModal>
    </>
  );
}

export default Statement;
