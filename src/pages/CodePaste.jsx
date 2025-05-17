import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import SnippetForm from '../components/SnippetForm';
import SnippetList from '../components/SnippetList';
import CodeModal from '../components/CodeModal';

const CodePaste = () => {

  useEffect(() => {
    document.title = 'CodePaste';
  }, []);

  const [codeShow, setCodeShow] = useState(null);
  const [allCode, setAllCode] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [filteredCode, setFilteredCode] = useState([]);
  const [search, setSearch] = useState('');
  const [snippet, setSnippet] = useState({
    title: '',
    code: '',
  });

  const fetchCode = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/code`);
      if (response.status === 200 && Array.isArray(response.data)) {
        setAllCode(response.data);
        setFilteredCode(response.data);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Fetch error:', error.message);
      toast.error(error.response?.data?.message || 'Failed to fetch snippets', {
        position: 'top-right',
      });
    }
  };

  useEffect(() => {
    fetchCode();
  }, []);

  // Validate snippet fields
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

  // Handle form submission for adding a new snippet
  const handlerSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = validateSnippet();
    if (errorMessage) {
      toast.error(errorMessage, { position: 'top-right' });
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/snippet`, snippet);
      if (res.status === 201) {
        setSnippet({ title: '', code: '' });
        await fetchCode();
        toast.success('Snippet added successfully', { position: 'top-right' });
      } else {
        throw new Error('Failed to add snippet');
      }
    } catch (error) {
      console.error('Submit error:', error.message);
      toast.error(error.response?.data?.message || 'Failed to add snippet', {
        position: 'top-right',
      });
    }
  };

  // Handle form submission for updating a snippet
  const handlerUpdate = async () => {
    const errorMessage = validateSnippet();
    if (errorMessage) {
      toast.error(errorMessage, { position: 'top-right' });
      return;
    }

    try {
      const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/snippet/${id}`, snippet);
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
      toast.error(error.response?.data?.message || 'Failed to update snippet', {
        position: 'top-right',
      });
    }
  };

  // Delete a snippet
  const handlerDelete = async (id) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/snippet/${id}`);
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
      toast.error(error.response?.data?.message || 'Failed to delete snippet', {
        position: 'top-right',
      });
    }
  };

  // Reset form and edit state
  const resetForm = () => {
    setEdit(false);
    setSnippet({ title: '', code: '' });
    setId(null);
  };

  // Show a snippet in the modal
  const handlerShowCode = (id) => {
    const codeData = allCode.find((code) => code._id === id);
    if (codeData) {
      setCodeShow(codeData);
    } else {
      toast.error('Snippet not found', { position: 'top-right' });
    }
  };

  // Prepare form for editing
  const handlerEdit = (snippet) => {
    setEdit(true);
    setId(snippet._id);
    setSnippet({ title: snippet.title, code: snippet.code });
    setCodeShow(null);
  };

  // Copy snippet code to clipboard
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

  // Handle search input and filtering
  const handlerSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.includes('++')) {
      setSearch('');
      toast.error('Invalid search term', { position: 'top-right' });
      return;
    }

    const result = allCode.filter((code) =>
      code.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCode(result);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8">Code Snippet Manager</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-7xl">
        <SnippetForm
          snippet={snippet}
          setSnippet={setSnippet}
          edit={edit}
          onSubmit={edit ? handlerUpdate : handlerSubmit}
          onCancel={resetForm}
        />
        <SnippetList
          snippets={filteredCode}
          search={search}
          onSearch={handlerSearch}
          onShowCode={handlerShowCode}
          onEdit={handlerEdit}
          onDelete={handlerDelete}
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
        />
      )}
    </div>
  );
};

export default CodePaste;