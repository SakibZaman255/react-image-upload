import React from 'react';

const ImagePreviewModal = ({ selectedImage, handleCloseModal }) => (
  <div
    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center"
    onClick={(e) => e.target === e.currentTarget && handleCloseModal()}
  >
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl w-full text-center relative">
      <button
        className="absolute top-4 right-4 text-2xl font-bold text-gray-800"
        onClick={handleCloseModal}
      >
        &times;
      </button>
      <h2 className="text-2xl font-semibold mb-6">Image Preview</h2>
      <div className="max-h-[70vh] overflow-auto">
        <img
          src={selectedImage.url}
          alt={`Preview ${selectedImage.name}`}
          className="max-w-full h-auto mx-auto"
        />
      </div>
      <p className="text-lg font-medium mt-4">{selectedImage.name}</p>
    </div>
  </div>
);

export default ImagePreviewModal;
