// src/components/NoSnippets.jsx
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const NoSnippets = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <FaExclamationTriangle className="text-yellow-500 text-6xl mb-4" />
      <h1 className="text-xl font-semibold text-white">no todo found</h1>
    </div>
  );
};

export default NoSnippets;