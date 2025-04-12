import './App.css';
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

function App() {
  const location = useLocation(); // Utilisez useLocation pour obtenir l'emplacement actuel

  return (
    <div className="flex h-screen"> {/* Utilisez h-screen pour occuper toute la hauteur de l'écran */}
      {/* Affichez la Sidebar uniquement si l'utilisateur n'est pas sur la page SignIn */}
      {location.pathname !== '/SignIn'&& <Sidebar />}

      {/* Contenu principal */}
      <div className="flex-1 p-6 overflow-y-auto"> {/* Permet le défilement du contenu */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Accounts" element={<Accounts />} />
          <Route path="/Cards" element={<Cards />} />
          <Route path="/Transactions" element={<Transactions />} />
          <Route path="/Statements" element={<Statement />} />
          <Route path="/Notifications" element="" />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/About" element={<About />} />
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