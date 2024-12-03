import React from 'react';

const Sidebar = ({ folders, handleUploadedImagesClick, handleFolderSelect, showUploadedImages }) => (
  <div className="w-48 bg-white text-black p-5 overflow-y-auto shadow-xl">
    <div className="text-sm">
      <ul className="space-y-4">
        <li className="border-b pb-3">
          <div className="font-semibold text-lg cursor-pointer mb-3 flex items-center" onClick={handleUploadedImagesClick}>
            <div className="w-2 h-2 bg-gray-500 rounded-full mr-2" />
            Folders
          </div>
          {showUploadedImages && (
            <ul className="pl-6 space-y-2 border-t border-gray-600 pt-2">
              {folders.length > 0 ? (
                folders.map((folder, index) => (
                  <li key={index} className="text-gray-600 text-sm cursor-pointer" onClick={() => handleFolderSelect(folder.folderName)}>
                    <div className="font-semibold">{folder.folderName}</div>
                    <ul className="pl-6 space-y-1 mt-2">
                      {folder.images.map((image, idx) => (
                        <li key={idx} className={`flex items-center text-sm ${image.uploaded ? 'font-normal' : 'italic'} overflow-hidden`}>
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
);

export default Sidebar;
