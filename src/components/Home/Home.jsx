import React from 'react';
import './Home.css';
import photo from '../../assets/Photo.png';
import springboot_logo from '../../assets/SpringBoot.png';
import mongodb_logo from '../../assets/MongoDB.png';
import mysql_logo from '../../assets/MySQL.png';
import react_logo from '../../assets/React.png';
import docker_logo from '../../assets/Docker.png';
import CV from '../../assets/CV_ang.pdf'


function Home() {
  return (
    <>
      <div className="grid h-screen grid-cols-1 px-8 text-white bg-black sm:px-16 md:px-32 lg:px-64 lg:grid-cols-2 ">
        <div className="flex flex-col justify-center text-center sm:text-left testt">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl ">
            BOUATAY Moktar
          </h1>
          <p className="mt-6 text-xs sm:text-sm md:text-base sm:mt-9 font-ibm-plex-mono text-greyy">
            I am currently pursuing a Bachelor's degree in Computer Science at the Faculty of Sciences of Monastir. With a strong foundation in software development and a passion for innovative technologies, I am seeking a final-year internship as a developer to apply my skills and contribute to impactful projects.
          </p>
          <a
            href={CV}
            download="Bouatay_Moktar_CV.pdf"
            className="flex items-center justify-center h-16 mx-auto mt-8 text-lg rounded-md img bg-green w-72 font-ibm-plex-mono shadow-custom-green sm:mx-0"
          >
            Download CV &gt;
          </a>
        </div>   
        <div className="items-center justify-center hidden lg:flex testt">
          <img src={photo} alt="Bouatay Moktar" className="object-cover rounded-lg h-96 sm:h-80 md:h-96 lg:ml-32 " />
        </div>
      </div>
<div className="px-8 text-white bg-black worked-with-section lg:px-64 testtt max-sm:pt-8">
  <h5 className="mb-6 text-lg text-left font-ibm-plex-mono ">Worked with :</h5>
  <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
    <li className="flex items-center justify-center p-4 ">
      <img src={springboot_logo} alt="Spring Boot" className="h-12" />
    </li>
    <li className="flex items-center justify-center h-20 p-4 ">
      <img src={mongodb_logo} alt="MongoDB" className="h-12" />
    </li>
    <li className="flex items-center justify-center h-20 p-4 ">
      <img src={mysql_logo} alt="MySQL" className="h-28" />
    </li>
    <li className="flex items-center justify-center p-4 ">
      <img src={react_logo} alt="React" className="h-12" />
    </li>
    <li className="flex items-center justify-center p-4 ">
      <img src={docker_logo} alt="Docker" className="h-12" />
    </li>
  </ul>
</div>

    </>
  );
}

export default Home;
