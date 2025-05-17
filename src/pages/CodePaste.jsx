// src/pages/CodePaste.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import SnippetForm from '../components/SnippetForm';
import SnippetList from '../components/SnippetList';
import CodeModal from '../components/CodeModal';

const CodePaste = () => {
  // Set document title
  useEffect(() => {
    document.title = 'CodePaste';
  }, []);

  // State management
  const [codeShow, setCodeShow] = useState(null);
  const [allCode, setAllCode] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [filteredCode, setFilteredCode] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snippet, setSnippet] = useState({
    title: '',
    code: '',
  });

  const baseUrl = import.meta.env.VITE_BASE_URL;
  if (!baseUrl) {
    console.error('VITE_BASE_URL is not defined in .env');
    toast.error('Application configuration error. Please contact support.', {
      position: 'top-right',
    });
  }

  const fetchCode = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseUrl}/api/code`);
      if (response.status === 200 && Array.isArray(response.data)) {
        setAllCode(response.data);
        setFilteredCode(response.data);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Fetch error:', error.message);
      setError(error.response?.data?.message || 'Failed to fetch snippets');
      toast.error(error.response?.data?.message || 'Failed to fetch snippets', {
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCode();
  }, []);

  const validateSnippet = () => {
    if (!snippet.title.trim() && !snippet.code.trim()) {
      return 'Please fill in all fields';
    } else if (!snippet.title.trim()) {
      return 'Please fill in the title field';
    } else if (!snippet.code.trim()) {
      return 'Please fill in the code field';
    }
    return null;
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = validateSnippet();
    if (errorMessage) {
      toast.error(errorMessage, { position: 'top-right' });
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${baseUrl}/api/snippet`, snippet);
      if (res.status === 201) {
        setSnippet({ title: '', code: '' });
        await fetchCode();
        toast.success('Snippet added successfully', { position: 'top-right' });
      } else {
        throw new Error('Failed to add snippet');
      }
    } catch (error) {
      console.error('Submit error:', error.message);
      setError(error.response?.data?.message || 'Failed to add snippet');
      toast.error(error.response?.data?.message || 'Failed to add snippet', {
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlerUpdate = async () => {
    const errorMessage = validateSnippet();
    if (errorMessage) {
      toast.error(errorMessage, { position: 'top-right' });
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await axios.put(`${baseUrl}/api/snippet/${id}`, snippet);
      if (res.status === 200) {
        setEdit(false);
        setSnippet({ title: '', code: '' });
        setId(null);
        await fetchCode();
        toast.success('Snippet updated successfully', { position: 'top-right' });
      } else {
        throw new Error('Failed to update snippet');
      }
    } catch (error) {
      console.error('Update error:', error.message);
      setError(error.response?.data?.message || 'Failed to update snippet');
      toast.error(error.response?.data?.message || 'Failed to update snippet', {
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlerDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.delete(`${baseUrl}/api/snippet/${id}`);
      if (res.status === 200) {
        setAllCode((prev) => prev.filter((code) => code._id !== id));
        setFilteredCode((prev) => prev.filter((code) => code._id !== id));
        setCodeShow(null);
        toast.success('Snippet deleted successfully', { position: 'top-right' });
      } else {
        throw new Error('Failed to delete snippet');
      }
    } catch (error) {
      console.error('Delete error:', error.message);
      setError(error.response?.data?.message || 'Failed to delete snippet');
      toast.error(error.response?.data?.message || 'Failed to delete snippet', {
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEdit(false);
    setSnippet({ title: '', code: '' });
    setId(null);
  };

  const handlerShowCode = (id) => {
    const codeData = allCode.find((code) => code._id === id);
    if (codeData) {
      setCodeShow(codeData);
    } else {
      toast.error('Snippet not found', { position: 'top-right' });
    }
  };

  const handlerEdit = (snippet) => {
    setEdit(true);
    setId(snippet._id);
    setSnippet({ title: snippet.title, code: snippet.code });
    setCodeShow(null);
  };

  const handlerCopy = async () => {
    if (codeShow?.code) {
      try {
        await navigator.clipboard.writeText(codeShow.code);
        toast.success('Snippet copied successfully', { position: 'top-right' });
      } catch (error) {
        console.error('Copy error:', error.message);
        toast.error('Failed to copy snippet', { position: 'top-right' });
      }
    } else {
      toast.error('No code to copy', { position: 'top-right' });
    }
  };

  const handlerSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredSnippets = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (value.includes('++')) {
      setSearch('');
      toast.error('Invalid search term', { position: 'top-right' });
      return allCode;
    }
    return allCode.filter((code) => code.title.toLowerCase().includes(value));
  }, [search, allCode]);

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center justify-center">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-lg font-semibold" aria-live="polite">
              Loading...
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg z-40">
          {error}
        </div>
      )}

      <h1 className="text-4xl font-bold text-white mb-8">Code Snippet Manager</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-7xl">
        <SnippetForm
          snippet={snippet}
          setSnippet={setSnippet}
          edit={edit}
          onSubmit={edit ? handlerUpdate : handlerSubmit}
          onCancel={resetForm}
          disabled={loading}
        />
        <SnippetList
          snippets={filteredSnippets}
          search={search}
          onSearch={handlerSearch}
          onShowCode={handlerShowCode}
          onEdit={handlerEdit}
          onDelete={handlerDelete}
          disabled={loading}
        />
      </div>
      {codeShow && (
        <CodeModal
          snippet={codeShow}
          onClose={() => {
            setCodeShow(null);
            resetForm();
          }}
          onCopy={handlerCopy}
          onEdit={() => handlerEdit(codeShow)}
          onDelete={() => handlerDelete(codeShow._id)}
          disabled={loading}
        />
      )}
    </div>
  );
};

export default CodePaste;