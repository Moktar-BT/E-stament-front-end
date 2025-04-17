import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RightSideModal from './RightSideModal';
import Notifcations from './Notifcations';

function Logoutbutton() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

 
  const confirmLogout = () => {
    // 🧼 Supprimer le token et rediriger
    localStorage.removeItem("token");
    setShowLogoutModal(false);
    navigate('/SignIn');
    window.location.reload(); // <--- forces a full reload (bypasses cached pages)
  };

  return (<>
    <div className='flex items-center justify-center'>
    
      <Notifcations />
     
    {/* 🔐 Logout Button */}
        <button 
        onClick={() => setShowLogoutModal(true)}
        className='flex items-center justify-center px-2 py-1 font-mono bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200'
      >
        <i className='mr-1 text-2xl icon-logout'></i>
        Logout
      </button>
      
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
  </>
    
  );
}

export default Logoutbutton;
