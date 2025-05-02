import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreditCard from '../components/CreaditCards';
import CardTransactions from '../components/CardTransactions';
import CardName from '../components/CardName';
import CCSummary from '../components/CCSummary';
import Logoutbutton from '../components/Logoutbutton';
import RightSideModal from '../components/RightSideModal';

function Cards() {
  const [cards, setCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [cardInfo, setCardInfo] = useState({
    iban: '',
    cardNumber: '',
    cardType: '',
  });
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:8083/Card/list_of_cards", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCards(response.data);
        if (response.data.length > 0) {
          setSelectedCardId(response.data[0].id);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des cartes :", error);
        setCards([]);
      }
    };
    fetchCards();
  }, []);

  useEffect(() => {
    const fetchCardInfo = async () => {
      if (!selectedCardId) return;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8083/Card/${selectedCardId}/IBAN_Cnum_Ctype`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCardInfo(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des infos carte:", error);
        setCardInfo({ iban: '', cardNumber: '', cardType: '' });
      }
    };
    fetchCardInfo();
  }, [selectedCardId]);

  const handleCardSwitch = (cardId) => {
    setSelectedCardId(cardId);
    setIsModalOpen(false);
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(field);
      setTimeout(() => setCopied(''), 2000);
    }).catch(err => console.error('Failed to copy: ', err));
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-2 px-4 mb-4 bg-white rounded-lg">
        <h1 className="text-3xl font-bold text-gray-700">Card Overview</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-6 py-2 text-green-500 transition-colors bg-green-100 rounded-lg hover:bg-green-200"
          >
            Switch Card
          </button>
          <Logoutbutton />
        </div>
      </div>

      {/* Card Info Section */}
      <div className="flex flex-col justify-center px-3 py-2 space-y-4 bg-white rounded-md md:flex-row md:space-y-0 md:space-x-24 md:items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleCopy(cardInfo.iban, 'iban')}
            className="px-2 py-1 font-mono text-gray-600 border border-gray-500 rounded-xl hover:bg-gray-100"
          >
            {copied === 'iban' ? 'Copied!' : 'Copy'}
            <i className="ml-1 text-gray-600 icon-copy_icon"></i>
          </button>
          <span>IBAN: {cardInfo.iban || "N/A"}</span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleCopy(cardInfo.cardNumber, 'cardNumber')}
            className="px-2 py-1 font-mono text-gray-600 border border-gray-500 rounded-xl hover:bg-gray-100"
          >
            {copied === 'cardNumber' ? 'Copied!' : 'Copy'}
            <i className="ml-1 text-gray-600 icon-copy_icon"></i>
          </button>
          <span>Card Number: {cardInfo.cardNumber || "N/A"}</span>
        </div>

        <div className="flex items-center">
          <span>Card Type: {cardInfo.cardType || "N/A"}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="mt-3 mb-7">
        {selectedCardId && <CardName cardId={selectedCardId} />}
      </div>  

      <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
        <div className="md:col-span-2">
          {selectedCardId && <CardTransactions cardId={selectedCardId} />}
        </div>
        <div className="md:col-span-1">
          {selectedCardId && <CCSummary cardId={selectedCardId} />}
        </div>
      </div>

      <div className="mt-10 ml-5">
        <span className="text-gray-600">© 2025 Proxym IT. All rights reserved.</span>
      </div>

      {/* Right Side Modal for Switching Cards */}
      <RightSideModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Switch Card"
      >
        <div className="space-y-4">
          {Array.isArray(cards) && cards.map(card => (
            <div 
              key={card.id}
              onClick={() => handleCardSwitch(card.id)}
              className="p-4 transition-colors border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-5 rounded-md ${
                      card.cardType.toUpperCase().includes('VISA') ? 'bg-blue-500' :
                      card.cardType.toUpperCase().includes('MASTERCARD') ? 'bg-red-500' :
                      'bg-yellow-500'
                    }`} />
                    <h3 className="font-medium text-gray-900">{card.cardType}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{card.cardNumber}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </RightSideModal>
    </>
  );
}

export default Cards;
