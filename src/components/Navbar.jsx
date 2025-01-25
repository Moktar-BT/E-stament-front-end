import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import linkedin from '../assets/linkedin.png';
import github from '../assets/github.png';
import twitter from '../assets/twitter.png';
import menubtn from '../assets/menu.png';
import Sidebar from './Sidebar';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      {/* Navbar */}
      <nav className="bg-grey_dark text-slate-200 h-16 w-5/6 text-sm fixed flex items-center justify-between lg:px-16 ml-[8%] rounded-b-lg max-lg:px-8 z-10">
        <button className="lg:hidden" onClick={toggleMenu}>
          <img src={menubtn} alt="Menu Button" />
        </button>
        {/* Main Navigation */}
        <ul className="flex flex-wrap items-center justify-start gap-12 pl-20 font-ibm-plex-mono max-lg:hidden">
          <li><Link to="/" className="hover:text-slate-400">Home</Link></li>
          {/* <li><Link to="/Case_studies" className="hover:text-slate-400">Case Studies</Link></li> */}
          {/* <li><Link to="/Testimonals" className="hover:text-slate-400">Testimonials</Link></li> */}
          <li><Link to="/Recent_work" className="hover:text-slate-400">Recent Work</Link></li>
          <li><Link to="/Get_In_Touch" className="hover:text-slate-400">Get In Touch</Link></li>
        </ul>
        {/* Social Media Links */}
        <ul className="flex items-center gap-6 pr-5">
          <li>
            <a href="https://www.linkedin.com/in/moktarbouatay/" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="LinkedIn" className="w-6 h-6 cursor-pointer hover:opacity-80 max-sm:w-5 max-sm:h-5" />
            </a>
          </li>
          <li>
            <a href="https://github.com/Moktar-BT" target="_blank" rel="noopener noreferrer">
              <img src={github} alt="GitHub" className="w-6 h-6 cursor-pointer hover:opacity-80 max-sm:w-5 max-sm:h-5 " />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <img src={twitter} alt="Twitter" className="w-6 h-6 cursor-pointer hover:opacity-80 max-sm:w-5 max-sm:h-5" />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
