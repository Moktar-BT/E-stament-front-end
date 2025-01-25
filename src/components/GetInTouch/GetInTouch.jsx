import React, { useState } from 'react';

function GetInTouch() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToWrite = JSON.stringify(formData, null, 2);
    console.log('Données du formulaire:', formData); 
  };

  return (
    <div className="min-h-screen bg-black z-2">
      <div className="flex items-center justify-center px-8 pt-24 ">
        <div className="relative flex flex-col items-center w-full max-w-7xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl p-6 opacity-85 bg-grey_dark rounded-3xl h-auto lg:h-[84vh]  ">
          <span className="pb-2 mb-4 text-4xl text-white border-b-2 border-gray-500 font-ibm-plex-mono">Get In Touch</span>
          <span className="mb-12 text-5xl text-center text-white font-ibm-plex-mono">We'd Love to Hear From You</span>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                name="firstName"
                placeholder="First Name"
                type="text"
                className="w-full h-16 p-4 text-xl text-white bg-transparent border-2 border-white rounded-md font-ibm-plex-mono"
                onChange={handleInputChange}
              />
              <input
                name="lastName"
                placeholder="Last Name"
                type="text"
                className="w-full h-16 p-4 text-xl text-white bg-transparent border-2 border-white rounded-md font-ibm-plex-mono"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                name="email"
                placeholder="Email"
                type="email"
                className="w-full h-16 p-4 text-xl text-white bg-transparent border-2 border-white rounded-md font-ibm-plex-mono"
                onChange={handleInputChange}
              />
              <input
                name="phoneNumber"
                placeholder="Phone Number"
                type="text"
                className="w-full h-16 p-4 text-xl text-white bg-transparent border-2 border-white rounded-md font-ibm-plex-mono"
                onChange={handleInputChange}
              />
            </div>
            <input
              name="subject"
              placeholder="Subject"
              type="text"
              className="w-full h-16 p-4 text-xl text-white bg-transparent border-2 border-white rounded-md font-ibm-plex-mono"
              onChange={handleInputChange}
            />
            <textarea
              name="message"
              placeholder="Tell Us Something ..."
              className="w-full h-16 p-4 text-xl text-white bg-transparent border-2 border-white rounded-md resize-none font-ibm-plex-mono "
              onChange={handleInputChange}
            />
            <button type="submit" className="w-full py-3 mt-6 text-xl bg-transparent border-2 rounded-md text-kyel_green border-kyel_green hover:bg-kyel_green hover:text-white">
              SEND TO US
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GetInTouch;
