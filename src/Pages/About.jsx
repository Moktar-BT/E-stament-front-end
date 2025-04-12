import React from 'react'
import Logoutbutton from '../components/Logoutbutton'
import AboutOurESS from '../components/AboutOurESS'

function About() {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* En-tête avec le titre et le bouton de déconnexion */}
      <div className="flex flex-col items-center justify-between p-2 px-4 mb-6 bg-white rounded-lg md:flex-row">
        <h1 className="text-2xl font-bold text-center text-gray-700 md:text-3xl md:text-left">
          About Our E-Statement Service
        </h1>
        <div className="flex items-center mt-4 space-x-4 md:mt-0">
          <Logoutbutton />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-grow w-full">
        <AboutOurESS />
      </div>

      {/* Footer */}
      <div className="mt-10 text-center md:text-left md:ml-5 ">
        <span className="mb-5 text-sm text-gray-600 md:text-base">
          © 2025 Proxym IT. All rights reserved.
        </span>
      </div>
    </div>
  )
}

export default About