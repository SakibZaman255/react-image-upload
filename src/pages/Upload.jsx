import React, { useState, useEffect } from 'react';
import { MdDriveFolderUpload } from "react-icons/md";

const Upload = () => {
  const [folders, setFolders] = useState([]); // State to store folders
  const [uploadingImage, setUploadingImage] = useState(null); // Current image being uploaded
  const [queue, setQueue] = useState([]); // Queue for remaining images to be uploaded
  const [isUploading, setIsUploading] = useState(false); // Track upload progress
  const [selectedFolder, setSelectedFolder] = useState(null); // State for selected folder
  const [showUploadedImages, setShowUploadedImages] = useState(false); // State to show or hide "Uploaded Images" folder
  const [selectedImage, setSelectedImage] = useState(null); // State to hold clicked image for larger view

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const folderName = `Folder ${folders.length + 1}`; // New folder name based on existing folders
      const newImages = files.map((file, index) => ({
        url: URL.createObjectURL(file),
        name: `img${index + 1}`, // Save the image as img1, img2, etc.
        folder: folderName, // Assign folder name to each image
        uploaded: false, // Mark image as not uploaded initially
      }));

      // Add the new folder and images to the folders state
      setFolders((prevFolders) => [
        ...prevFolders,
        {
          folderName,
          images: newImages, // Add images to the new folder
        },
      ]);

      // Add new images to the queue
      setQueue((prevQueue) => [...prevQueue, ...newImages]);
    }
  };

  useEffect(() => {
    if (uploadingImage) {
      // Simulate upload process with a delay for each image
      const timer = setTimeout(() => {
        // Update the folder and mark the current image as uploaded
        setFolders((prevFolders) =>
          prevFolders.map((folder) => {
            if (folder.folderName === uploadingImage.folder) {
              return {
                ...folder,
                images: folder.images.map((image) =>
                  image.name === uploadingImage.name ? { ...image, uploaded: true } : image
                ),
              };
            }
            return folder;
          })
        );

        // Remove the uploaded image from the queue
        setQueue((prevQueue) => {
          const nextQueue = prevQueue.slice(1); // Move to the next in queue
          if (nextQueue.length > 0) {
            setUploadingImage(nextQueue[0]); // Start next upload
          } else {
            setUploadingImage(null); // End uploading process
            setIsUploading(false); // End uploading progress
          }
          return nextQueue;
        });
      }, 2000); // Simulate 2-second upload for each image

      return () => clearTimeout(timer); // Clean up timeout on unmount
    }
  }, [uploadingImage]);

  const handleStartUpload = () => {
    if (queue.length > 0 && !isUploading) {
      setUploadingImage(queue[0]); // Start the first image upload
      setIsUploading(true); // Set upload status to true
    }
  };

  // Handle folder selection from the sidebar
  const handleFolderSelect = (folderName) => {
    if (selectedFolder === folderName) {
      setSelectedFolder(null); // Deselect if already selected
    } else {
      setSelectedFolder(folderName); // Select folder
    }
  };

  // Handle showing "Uploaded Images" folder
  const handleUploadedImagesClick = () => {
    setShowUploadedImages(!showUploadedImages); // Toggle visibility of "Uploaded Images"
  };

  // Filter images based on selected folder
  const filteredImages = selectedFolder
    ? folders
        .filter((folder) => folder.folderName === selectedFolder)
        .flatMap((folder) => folder.images)
    : folders.flatMap((folder) => folder.images); // Show all images if no folder selected

  // Handle image click to show larger view
  const handleImageClick = (image) => {
    setSelectedImage(image); // Set clicked image for display
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setSelectedImage(null); // Close the modal by clearing selected image
  };

  // Close modal if clicking outside
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal(); // Close modal if clicked outside of modal content
    }
  };

  return (
    <div className="min-h-screen bg-[#9D9D9D] flex flex-col">
      {/* Full-Width Header (Smaller Header) */}
      <header className="bg-white text-black p-2 w-full shadow-md">
        <div className="flex justify-between items-center">
          <label className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer flex items-center">
            Upload Images
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
            <MdDriveFolderUpload className="ml-2" size={20} /> {/* Upload Icon on the right side */}
          </label>
          {/* Start Upload Button in the Header */}
          <button
            onClick={handleStartUpload}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            disabled={isUploading || queue.length === 0}
          >
            {isUploading ? 'Uploading...' : 'Start Upload'}
          </button>
        </div>
      </header>

      <div className="flex flex-grow">
        {/* Sidebar (No Rounded Corners) with Shadow Effect */}
        <div className="w-48 bg-white text-black p-5 overflow-y-auto shadow-xl">
          <div className="text-sm">
            <ul className="space-y-4">
              {/* "Uploaded Images" Parent Folder */}
              <li className="border-b pb-3">
                <div
                  className="font-semibold text-lg cursor-pointer mb-3 flex items-center"
                  onClick={handleUploadedImagesClick}
                >
                  <div className="w-2 h-2 bg-gray-500 rounded-full mr-2" />
                  Folders
                </div>
                {showUploadedImages && (
                  <ul className="pl-6 space-y-2 border-t border-gray-600 pt-2">
                    {/* Dynamically display subfolders and their images */}
                    {folders.length > 0 ? (
                      folders.map((folder, index) => (
                        <li
                          key={index}
                          className="text-gray-600 text-sm cursor-pointer"
                          onClick={() => handleFolderSelect(folder.folderName)}
                        >
                          <div className="font-semibold">{folder.folderName}</div>
                          <ul className="pl-6 space-y-1 mt-2">
                            {folder.images.map((image, idx) => (
                              <li
                                key={idx}
                                className={`flex items-center text-sm ${image.uploaded ? 'font-normal' : 'italic'} overflow-hidden`}
                              >
                                <div className="w-2 h-2 bg-gray-500 rounded-full mr-2" />
                                <span className="truncate w-full">{image.uploaded ? image.name : `${image.name} (Uploading...)`}</span>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-600">No folders to show.</li>
                    )}
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content Area (Minimized Gap) */}
        <div className="flex-1 p-4">
          {/* Uploaded Images Grouped by Folder */}
          <div className="mt-5">
            {filteredImages.length > 0 ? (
              <div>
                {folders
                  .filter((folder) =>
                    selectedFolder ? folder.folderName === selectedFolder : true
                  )
                  .map((folder, index) => (
                    <div
                      key={index}
                      className="bg-[#DFDFDF] rounded-lg p-5 mb-6 shadow-lg"
                      style={{ border: '2px solid #ddd', borderRadius: '8px' }}
                    >
                      <h2 className="text-gray-800 text-xl font-semibold mb-4">{folder.folderName}</h2>
                      <div className="grid grid-cols-9 gap-4">
                        {folder.images.map((image, index) => (
                          <div
                            key={index}
                            className="w-full overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
                            onClick={() => handleImageClick(image)} // Image click to show larger view
                          >
                            {image.uploaded && (
                              <div className="bg-white rounded-lg shadow-lg p-3">
                                <p className="text-sm text-gray-800 truncate">{image.name}</p>
                                <img
                                  src={image.url}
                                  alt={`Uploaded ${image.name}`}
                                  className="w-full h-32 object-cover rounded-lg mb-2"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No images to display.</p>
            )}
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleOutsideClick} // Close modal if clicking outside
        >
          <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full text-center relative">
            <button
              className="absolute top-4 right-4 text-xl font-bold text-gray-800"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-6">Image Preview</h2>
            <div className="relative mb-6">
              <img
                src={selectedImage.url}
                alt={`Preview ${selectedImage.name}`}
                className="w-full h-56 object-cover rounded-lg mx-auto"
              />
            </div>
            <p className="text-lg font-medium mt-4 truncate">{selectedImage.name}</p>
          </div>
        </div>
      )}

      {/* Uploading Modal */}
      {uploadingImage && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full text-center">
            <h2 className="text-2xl font-semibold mb-6">Uploading...</h2>
            <div className="relative mb-6">
              <img
                src={uploadingImage.url}
                alt={`Uploading ${uploadingImage.name}`}
                className="w-full h-56 object-cover rounded-lg mx-auto"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white text-lg">Uploading...</span>
              </div>
            </div>
            <p className="text-lg font-medium mt-4 truncate">{uploadingImage.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
