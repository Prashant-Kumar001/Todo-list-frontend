// src/components/CodeModal.jsx
import React from 'react';
import { AiFillCloseSquare } from 'react-icons/ai';
import { FiClipboard, FiEdit, FiTrash2 } from 'react-icons/fi';

const CodeModal = ({ snippet, onClose, onCopy, onEdit, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-3xl relative animate-fade-in">
        <AiFillCloseSquare
          className="absolute top-4 right-4 text-3xl text-red-500 cursor-pointer hover:text-red-400 transition"
          onClick={onClose}
        />
        <h2 className="text-2xl font-semibold text-white mb-4">{snippet.title}</h2>
        <textarea
          disabled
          className="bg-gray-700 text-white p-4 rounded-md w-full h-96 resize-none focus:outline-none"
          defaultValue={snippet.code}
        ></textarea>
        <div className="flex gap-4 mt-4">
          <button
            onClick={onCopy}
            className="bg-gray-700 text-white flex items-center justify-center gap-2 px-4 py-2 rounded-md hover:bg-gray-600 transition-all duration-300"
          >
            <FiClipboard className="h-5 w-5" /> Copy
          </button>
          <button
            onClick={onEdit}
            className="bg-gray-700 text-white flex items-center justify-center gap-2 px-4 py-2 rounded-md hover:bg-gray-600 transition-all duration-300"
          >
            <FiEdit className="h-5 w-5" /> Edit
          </button>
          <button
            onClick={onDelete}
            className="bg-gray-700 text-white flex items-center justify-center gap-2 px-4 py-2 rounded-md hover:bg-gray-600 transition-all duration-300"
          >
            <FiTrash2 className="h-5 w-5" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeModal;