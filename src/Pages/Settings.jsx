import React from 'react';
import Logoutbutton from '../components/Logoutbutton';
import SettingsPart_1 from '../components/SettingsPart_1';
import SettingsPart_2 from '../components/SettingsPart_2';

function Settings() {
  return (
    <div className="flex flex-col">
      {/* En-tête avec le titre et le bouton de déconnexion */}
      <div className="flex items-center justify-between p-2 px-4 mb-4 bg-white rounded-lg">
        <h1 className="text-3xl font-bold text-gray-700">Settings & Security</h1>
        <div className="flex items-center space-x-4">
          <Logoutbutton />
        </div>
      </div>

      {/* Partie SettingsPart_1 prenant toute la largeur */}
      <div className="w-full mb-5">
        <SettingsPart_1 />
      </div>
      <div className="w-full">
        <SettingsPart_2 />
      </div>
      {/* Footer */}
      <div className="mt-10 ml-5">
        <span className="text-gray-600">© 2025 Proxym IT. All rights reserved.</span>
      </div>
    </div>
  );
}

export default Settings;