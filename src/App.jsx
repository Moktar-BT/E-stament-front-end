import './App.css';
import React, { useState ,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebare';
import Dashboard from './Pages/Dashboard';
import Accounts from './Pages/Accounts';
import Cards from './Pages/Cards';
import Transactions from './Pages/Transactions';
import Settings from './Pages/Settings';
import About from './Pages/About';
import SignIn from './Pages/SignIn';
import Statement from './Pages/Statement';
import ProtectedRoute from './components/ProtectedRoute';
import OneSignal from 'react-onesignal';

function App() {
  const location = useLocation(); // Utilisez useLocation pour obtenir l'emplacement actuel

 




  return (
    <div className="flex h-screen"> {/* Utilisez h-screen pour occuper toute la hauteur de l'écran */}
      {/* Affichez la Sidebar uniquement si l'utilisateur n'est pas sur la page SignIn */}
      {location.pathname !== '/SignIn'&& <Sidebar />}

      {/* Contenu principal */}
      <div className="flex-1 p-6 overflow-y-auto"> {/* Permet le défilement du contenu */}
      <Routes>
  <Route
    path="/"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
  <Route
    path="/Accounts"
    element={
      <ProtectedRoute>
        <Accounts />
      </ProtectedRoute>
    }
  />
  <Route
    path="/Cards"
    element={
      <ProtectedRoute>
        <Cards />
      </ProtectedRoute>
    }
  />
  <Route
    path="/Transactions"
    element={
      <ProtectedRoute>
        <Transactions />
      </ProtectedRoute>
    }
  />
  <Route
    path="/Statements"
    element={
      <ProtectedRoute>
        <Statement />
      </ProtectedRoute>
    }
  />
  <Route
    path="/Settings"
    element={
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    }
  />
  <Route
    path="/About"
    element={
      <ProtectedRoute>
        <About />
      </ProtectedRoute>
    }
  />

  {/* Route libre */}
  <Route path="/SignIn" element={<SignIn />} />
</Routes>
      </div>
    </div>
  );
}

// Enveloppez App avec Router dans un composant parent
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;