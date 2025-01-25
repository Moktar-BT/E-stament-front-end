import React from 'react';
import { Link } from 'react-router-dom';
import fermerbtn from '../assets/fermerbtn.png';

function Sidebar({ isMenuOpen, toggleMenu }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-grey_dark text-slate-200 w-60 transform ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 z-50`}
    >
      <button onClick={toggleMenu} className="flex w-6 h-10 my-8 ml-48 ursor-pointer">
        <img src={fermerbtn} alt="Close Button"  />
      </button>
      <ul className="flex flex-col items-start gap-6 pl-12 font-ibm-plex-mono">
        <li><Link to="/" className="hover:text-slate-400" onClick={toggleMenu}>Home</Link></li>
        {/* <li><Link to="/Case_studies" className="hover:text-slate-400" onClick={toggleMenu}>Case Studies</Link></li> */}
        {/* <li><Link to="/Testimonals" className="hover:text-slate-400" onClick={toggleMenu}>Testimonials</Link></li> */}
        <li><Link to="/Recent_work" className="hover:text-slate-400" onClick={toggleMenu}>Recent Work</Link></li>
        <li><Link to="/Get_In_Touch" className="hover:text-slate-400" onClick={toggleMenu}>Get In Touch</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
