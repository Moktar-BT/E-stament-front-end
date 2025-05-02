import React, { useRef, useState } from 'react';
import axios from 'axios';
import Logoutbutton from '../components/Logoutbutton';
import TransactionsList from '../components/TransactionsList';
import uploadIcon from '../assets/uploadIcon.png'
import uploadIcon1 from '../assets/cloud-computing.png'

function Transactions() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsModalOpen(true);
    }
  };

  const handleConfirmUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8083/Transactions/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Upload successful:', response.data);
      alert('Transaction uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload transaction.');
    }

    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const handleCancelUpload = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  return (
    <>
      <div className="flex items-center justify-between p-2 px-4 mb-4 bg-white rounded-lg">
        <h1 className="text-3xl font-bold text-gray-700">Transactions</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={triggerFileSelect}
            className="flex items-center px-6 py-2 text-green-500 transition-colors bg-green-100 rounded-lg hover:bg-green-200"
          >
            <img src={uploadIcon1} className='h-6 mr-3' alt="" /> Upload Transaction
          </button>
          <Logoutbutton />
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      
      />

      <TransactionsList />

      {/* Footer */}
      <div className="mt-10 ml-5">
        <span className="text-gray-600">© 2025 Proxym IT. All rights reserved.</span>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-xl font-semibold text-gray-700">Confirm Upload</h2>
            <p className="mb-4 text-gray-600">
              Are you sure you want to upload{' '}
              <span className="font-medium text-gray-800">{selectedFile?.name}</span> to the
              transactions list?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelUpload}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpload}
                className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Transactions;
