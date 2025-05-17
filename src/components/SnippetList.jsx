// src/components/SnippetList.jsx
import React from 'react';
import { IoSearch } from 'react-icons/io5';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import NoSnippets from './NoSnippets';

const SnippetList = ({ snippets, search, onSearch, onShowCode, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 bg-red-500 rounded-full"></span>
          <span className="h-3 w-3 bg-yellow-500 rounded-full"></span>
          <span className="h-3 w-3 bg-green-500 rounded-full"></span>
        </div>
        <div className="relative w-1/2">
          <IoSearch className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            value={search}
            onChange={onSearch}
            placeholder="Search snippets..."
            type="search"
            className="bg-gray-700 text-white rounded-md pl-10 pr-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
      </div>
      <ul className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {snippets.length > 0 ? (
          snippets.map((snippet) => (
            <li
              key={snippet._id}
              className="bg-gray-700 hover:bg-gray-600 text-white rounded-md px-4 py-3 cursor-pointer transition-all duration-200"
              onClick={() => onShowCode(snippet._id)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{snippet.title}</span>
                <div className="flex gap-2">
                  <FiEdit
                    className="text-gray-400 hover:text-blue-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(snippet);
                    }}
                  />
                  <FiTrash2
                    className="text-gray-400 hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(snippet._id);
                    }}
                  />
                </div>
              </div>
            </li>
          ))
        ) : (
          <NoSnippets />
        )}
      </ul>
    </div>
  );
};

export default SnippetList;