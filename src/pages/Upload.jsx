import React, { useState, useEffect } from 'react';
import { MdDriveFolderUpload } from "react-icons/md";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import ImagePreviewModal from '../components/ImagePreviewModal';
import UploadingModal from '../components/UploadingModal';

const Upload = () => {
  const [folders, setFolders] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(null);
  const [queue, setQueue] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [showUploadedImages, setShowUploadedImages] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle file upload
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const folderName = `Folder ${folders.length + 1}`;
      const newImages = files.map((file, index) => ({
        url: URL.createObjectURL(file),
        name: `img${index + 1}`,
        folder: folderName,
        uploaded: false,
      }));

      setFolders((prev) => [...prev, { folderName, images: newImages }]);
      setQueue((prev) => [...prev, ...newImages]);
    }
  };

  // Handle image upload progress
  useEffect(() => {
    if (uploadingImage) {
      const timer = setTimeout(() => {
        setFolders((prevFolders) =>
          prevFolders.map((folder) =>
            folder.folderName === uploadingImage.folder
              ? {
                  ...folder,
                  images: folder.images.map((img) =>
                    img.name === uploadingImage.name ? { ...img, uploaded: true } : img
                  ),
                }
              : folder
          )
        );
        setQueue((prevQueue) => {
          const nextQueue = prevQueue.slice(1);
          setUploadingImage(nextQueue[0] || null);
          if (nextQueue.length === 0) setIsUploading(false);
          return nextQueue;
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [uploadingImage]);

  // Start upload for the first image in the queue
  const handleStartUpload = () => {
    if (queue.length > 0 && !isUploading) {
      setUploadingImage(queue[0]);
      setIsUploading(true);
    }
  };

  // Toggle folder view
  const handleFolderSelect = (folderName) => {
    // Toggle between showing all folders or the selected folder
    setSelectedFolder((prev) => (prev === folderName ? null : folderName));
  };

  return (
    <div className="min-h-screen bg-[#9D9D9D] flex flex-col">
      <Header handleUpload={handleUpload} handleStartUpload={handleStartUpload} isUploading={isUploading} queue={queue} />
      <div className="flex flex-grow">
        <Sidebar
          folders={folders}
          handleUploadedImagesClick={() => setShowUploadedImages(!showUploadedImages)}
          handleFolderSelect={handleFolderSelect} // Passing the toggle function
          showUploadedImages={showUploadedImages}
        />
        <MainContent
          folders={folders}
          selectedFolder={selectedFolder} // Updated to use selectedFolder state
          handleImageClick={setSelectedImage}
        />
      </div>
      {selectedImage && <ImagePreviewModal selectedImage={selectedImage} handleCloseModal={() => setSelectedImage(null)} />}
      {uploadingImage && <UploadingModal uploadingImage={uploadingImage} />}
    </div>
  );
};

export default Upload;
