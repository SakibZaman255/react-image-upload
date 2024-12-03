import React from 'react';

const UploadingModal = ({ uploadingImage }) => (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full text-center">
      <h2 className="text-2xl font-semibold mb-6">Uploading...</h2>
      <img src={uploadingImage.url} alt={`Uploading ${uploadingImage.name}`} className="w-full h-56 object-cover rounded-lg mx-auto" />
      <p className="text-lg font-medium mt-4 truncate">{uploadingImage.name}</p>
    </div>
  </div>
);

export default UploadingModal;
