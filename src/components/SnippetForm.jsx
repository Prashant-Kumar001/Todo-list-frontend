// src/components/SnippetForm.jsx
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { FaWindowClose } from 'react-icons/fa';

const SnippetForm = ({ snippet, setSnippet, edit, onSubmit, onCancel }) => {
  const handlerChange = (e) => {
    setSnippet((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col space-y-4 transition-all duration-300">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          {edit ? 'Edit Snippet' : 'Add New Snippet'}
        </h2>
        {edit && (
          <FaWindowClose
            className="text-2xl text-red-500 cursor-pointer hover:text-red-400 transition"
            onClick={onCancel}
          />
        )}
      </div>
      <input
        value={snippet.title}
        name="title"
        onChange={handlerChange}
        type="text"
        placeholder="Snippet Title"
        className="bg-gray-700 text-white rounded-md px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
      />
      <textarea
        name="code"
        value={snippet.code}
        onChange={handlerChange}
        className="bg-gray-700 text-white rounded-md px-4 py-3 w-full h-64 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        placeholder="Write or paste your code here..."
      ></textarea>
      <button
        onClick={onSubmit}
        className="bg-blue-600 text-white flex items-center justify-center gap-2 px-4 py-3 rounded-md hover:bg-blue-700 active:bg-blue-800 transition-all duration-300"
      >
        <FiPlus className="h-5 w-5" /> {edit ? 'Update Snippet' : 'Add Snippet'}
      </button>
    </div>
  );
};

export default SnippetForm;