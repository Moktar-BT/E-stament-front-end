import React, { useState } from "react";
import v1 from '../../assets/Restaurant Demo.mp4';
import v2 from '../../assets/Visto-Demo.mp4';
import v3 from '../../assets/Projet Soa.mp4';
import frontend_logo from '../../assets/frontend_logo.png';
import backend_logo from '../../assets/backend_logo.png';
import closebtn from '../../assets/fermerbtn.png';

const RecentWork = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "Restaurant Reservation System :",
      description:
        "Developed a comprehensive web application for a restaurant, enabling users to make table reservations, view the menu, manage orders, process payments, and manage their profiles",
      technologies: "React, SpringBoot, MySQL",
      front_end_link: "https://github.com/Moktar-BT/Restaurant-Front", 
      back_end_link: "https://github.com/KINSMICKETxD/restaurantBack/tree/master/src",
      video: v1,
    },
    {
      title: "A web application for CV management :",
      description:
        "The application includes features such as creating job posts, integrating candidates from Excel files provided by data analysts, and scheduling recruitment dates for candidates in specific positions",
      technologies: "React, SpringBoot, MongoDB",
      front_end_link: "https://github.com/Moktar-BT/Visto-Back",
      back_end_link: "https://github.com/Moktar-BT/Visto-Back", 
      video: v2,
    },
    {
      title: "SOAP Service for Weather Access :",
      description:
        "Develop a SOAP service for account creation, where users get a token to access weather information, including temperature and a brief description, for a given location",
      technologies: "Spring ,SOAP",
      back_end_link: "#", 
      video: v3,
    },
  ];

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen px-8 py-12 text-white bg-black pt-28">
      <h2 className="mb-12 text-3xl text-center font-ibm-plex-mono">Recent Work:</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 font-ibm-plex-mono">
        {projects.map((project, index) => (
          <div
            key={index}
            className="overflow-hidden transition-shadow rounded-lg shadow-md bg-grey_dark hover:shadow-lg"
          >
            <video
              src={project.video}
              controls
              className="object-cover w-full h-48"
            >
              Your browser does not support the video tag.
            </video>
            <div className="p-4">
              <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
              <p className="mb-4 text-gray-300">{project.description}</p>
              <p className="mb-4 text-sm text-gray-400">
                <strong>Technologies:</strong> {project.technologies}
              </p>
              <button
                onClick={() => openModal(project)}
                className="cursor-pointer text-kyel_green hover:underline"
              >
                View Project &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative flex flex-col items-center justify-center p-16 rounded-lg bg-grey_dark w-96 h-96">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2"
            >
              <img src={closebtn} alt="Close" className="w-6 h-6 m-2" />
            </button>
            <h3 className="mb-4 text-2xl font-semibold text-center font-ibm-plex-mono">{selectedProject.title}</h3>
            <div className="flex flex-col items-center justify-center gap-4">
              {/* Conditionally render Frontend link and image */}
              {selectedProject.front_end_link && (
                <a
                  href={selectedProject.front_end_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 text-white font-ibm-plex-mono hover:underline"
                >
                  <img src={frontend_logo} alt="Frontend" className="w-16 h-16" />
                  <span>Frontend</span>
                </a>
              )}

              {/* Conditionally render Backend link and image */}
              {selectedProject.back_end_link && (
                <a
                  href={selectedProject.back_end_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 text-white font-ibm-plex-mono hover:underline"
                >
                  <img src={backend_logo} alt="Backend" className="w-16 h-16" />
                  <span>Backend</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentWork;
