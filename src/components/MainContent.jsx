import React from 'react';

const MainContent = ({ folders, selectedFolder, handleImageClick, handleFolderSelect }) => {
  // Show images only from the selected folder or all folders if none selected
  const displayedFolders = selectedFolder
    ? folders.filter((folder) => folder.folderName === selectedFolder)
    : folders;

  return (
    <div className="flex-1 p-4">
      {displayedFolders.length > 0 ? (
        displayedFolders.map((folder, index) => (
          <div
            key={index}
            className="bg-[#DFDFDF] rounded-lg p-5 mb-6 shadow-lg"
          >
            <h2 className="text-gray-800 text-xl font-semibold mb-4">
              <span
                onClick={() => handleFolderSelect(folder.folderName)} // Toggling functionality here
                className="cursor-pointer"
              >
                {folder.folderName}
              </span>
            </h2>
            <div className="grid grid-cols-9 gap-4">
              {folder.images.map((image, idx) => (
                <div
                  key={idx}
                  className="w-full overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
                  onClick={() => handleImageClick(image)}
                >
                  {image.uploaded && (
                    <div className="bg-white rounded-lg shadow-lg p-3">
                      <p className="text-sm text-gray-800 truncate">
                        {image.name}
                      </p>
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
        ))
      ) : (
        <p className="text-center text-gray-500">No images to display.</p>
      )}
    </div>
  );
};

export default MainContent;
