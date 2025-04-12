import React, { useState } from 'react';
import RightSideModal from './RightSideModal'; // Assurez-vous d'avoir ce composant

function Logoutbutton() {
  const [showNotifications, setShowNotifications] = useState(false);

  // Données de notifications exemple
  const sampleNotifications = [
    {
      id: 1,
      title: "Nouvelle transaction",
      message: "Paiement de 120€ chez Amazon",
      time: "Il y a 2 heures",
      read: false
    },
    {
      id: 2,
      title: "Carte bloquée",
      message: "Votre carte Visa se termine par 4587 a été bloquée",
      time: "Hier, 14:30",
      read: true
    },
    {
      id: 3,
      title: "Virement reçu",
      message: "Vous avez reçu 500€ de Jean Dupont",
      time: "12 avril 2025",
      read: true
    }
  ];

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleLogout = () => {
    // Ajoutez ici votre logique de déconnexion
    console.log("Déconnexion...");
  };

  return (
    <div className='flex items-center justify-center'>
      {/* Bouton Notification avec indicateur de non-lus */}
      <button 
        onClick={handleNotificationClick}
        className='relative flex items-center justify-center px-2 py-1 mr-2 font-mono bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200'
      >
        <i className='text-2xl icon-notification_icon'></i>
        {/* Badge pour les notifications non lues */}
        {sampleNotifications.some(n => !n.read) && (
          <span className='absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full'></span>
        )}
      </button>

      {/* Bouton Déconnexion */}
      <button 
        onClick={handleLogout}
        className='flex items-center justify-center px-2 py-1 font-mono bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200'
      >
    
        <i className='mr-1 text-2xl icon-logout'></i>
        Logout
      </button>

      {/* Modal des Notifications */}
      <RightSideModal 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        title="Notifications"
      >
        <div className="divide-y divide-gray-200">
          {sampleNotifications.map(notification => (
            <div 
              key={notification.id} 
              className={`p-3 ${!notification.read ? 'bg-blue-50' : ''}`}
            >
              <div className="flex justify-between">
                <h3 className="font-medium">{notification.title}</h3>
                {!notification.read && (
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
              </div>
              <p className="text-sm text-gray-600">{notification.message}</p>
              <p className="text-xs text-gray-400">{notification.time}</p>
            </div>
          ))}
        </div>
      </RightSideModal>
    </div>
  );
}

export default Logoutbutton;