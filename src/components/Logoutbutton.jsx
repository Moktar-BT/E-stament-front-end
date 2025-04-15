import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RightSideModal from './RightSideModal';

function Logoutbutton() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

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

  const confirmLogout = () => {
    // 🧼 Supprimer le token et rediriger
    localStorage.removeItem("token");
    setShowLogoutModal(false);
    navigate('/SignIn');
    window.location.reload(); // <--- forces a full reload (bypasses cached pages)
  };

  return (
    <div className='flex items-center justify-center'>
      {/* 🔔 Notification Button */}
      <button 
        onClick={handleNotificationClick}
        className='relative flex items-center justify-center px-2 py-1 mr-2 font-mono bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200'
      >
        <i className='text-2xl icon-notification_icon'></i>
        {sampleNotifications.some(n => !n.read) && (
          <span className='absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full'></span>
        )}
      </button>

      {/* 🔐 Logout Button */}
      <button 
        onClick={() => setShowLogoutModal(true)}
        className='flex items-center justify-center px-2 py-1 font-mono bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200'
      >
        <i className='mr-1 text-2xl icon-logout'></i>
        Logout
      </button>

      {/* 📨 Notification Modal */}
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

      {/* 🚪 Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
            <h2 className="mb-4 text-lg font-semibold">Confirm Logout</h2>
            <p className="mb-6 text-sm text-gray-600">
              Are you sure you want to log out of the platform?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Logoutbutton;
