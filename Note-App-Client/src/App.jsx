import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Footer from '../src/component/Footer';
import Header from '../src/component/Header';
import './App.css';
import axios from 'axios';

function App () {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);

  const api = 'http://localhost:8081';

  // Fetch notes
  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${api}/api/notes`);
      const notesArray = Array.isArray(response.data.Note)
        ? response.data
        : response.data.Note;

      const sortedNotes = notesArray.Note.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setNotes(sortedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // Add a note
  const addNote = async () => {
    if (title.trim() && content.trim()) {
      try {
        await axios.post(`${api}/api/notes`, {
          title,
          content,
        });
        setShowModal(false);
        setTitle('');
        setContent('');
        fetchNotes(); // Refetch notes after adding a new one
      } catch (error) {
        console.error('Error adding note:', error);
      }
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${api}/api/notes/${id}`);
      fetchNotes(); // Refetch notes after deleting a note
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      <main className="flex-grow p-4 my-10">
        {/* Add Note Section */}
        <div className="flex items-center justify-center my-14">
          <div className="w-full max-w-md">
            {/* Textarea-like Button */}
            <div
              onClick={() => setShowModal(true)}
              className="p-4 bg-amber-100 text-black font-semibold rounded-md cursor-text shadow-md hover:shadow-lg transition duration-300">
              Take a Note...
            </div>
          </div>
        </div>

        {/* Notes Display Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.isArray(notes) && notes.length > 0 && !showModal ? (
            notes.map((note) => (
              <div
                key={note.id}
                className="bg-amber-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between h-full relative">
                <div>
                  <h2 className="text-black text-lg font-semibold mb-2">
                    {note.title}
                  </h2>
                  <p className="text-black mb-4">{note.content}</p>
                </div>
                <div className="flex items-center justify-end mt-auto">
                  <small className="text-black mr-auto">{note.createdAt}</small>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-red-500 hover:text-red-700 transition duration-200 absolute right-0 mt-2 mr-2 z-10">
                    <FaTrash className="text-lg" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            !showModal && (
              <p className="text-gray-500 col-span-full text-center">
                No notes available. Add a note to get started!
              </p>
            )
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal Section */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="popUp p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Add Note</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 border rounded-md w-full mb-4 bg-amber-100 text-black"
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="p-2 border rounded-md w-full mb-4 h-24 bg-amber-100 text-black z-10"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300">
                Cancel
              </button>
              <button
                onClick={addNote}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
