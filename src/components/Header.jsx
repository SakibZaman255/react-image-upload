import React from 'react';
import { MdDriveFolderUpload } from "react-icons/md";

const Header = ({ handleUpload, handleStartUpload, isUploading, queue }) => (
  <header className="bg-white text-black p-2 w-full shadow-md">
    <div className="flex justify-between items-center">
      <label className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer flex items-center">
        Upload Images
        <input type="file" multiple accept="image/*" onChange={handleUpload} className="hidden" />
        <MdDriveFolderUpload className="ml-2" size={20} />
      </label>
      <button onClick={handleStartUpload} className="bg-green-500 text-white px-4 py-2 rounded-lg" disabled={isUploading || queue.length === 0}>
        {isUploading ? 'Uploading...' : 'Start Upload'}
      </button>
    </div>
  </header>
);

export default Header;
