const Note = require('../models/index').notes;

// Create a new note
exports.createNote = async (req, res) => {
    try {
        const title = req.body.title?.trim();
        const content = req.body.content?.trim();

        if (!title || !content) {
            return res.status(400).json({ error: 'Content or title is required' });
        }
        const note = await Note.create({ title, content });
        res.status(201).json({ success: true, message: "Content created successfully", Note: note });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create note' });
    }
};

// Fetch all notes
exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.findAll();
        res.status(200).json({ success: true, noOfNotes: notes.length, Note: notes });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to Get All notes' });
    }
};

// Update a note
exports.updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, title } = req.body;

        const note = await Note.findByPk(id);

        if (!note) {
            return res.status(404).json({ success: true, message: 'Note not found' });
        }
        note.content = content || note.content;
        note.title = title || note.title;
        await note.save();

        res.status(201).json({ success: true, message: "Content updated successfully", Note: note });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to Update notes' });
    }
};

// Delete a note
exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByPk(id);

        if (!note) {
            return res.status(404).json({ success: true, message: 'Note not found' });
        }
        await note.destroy();
        res.status(200).json({ success: true, message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to Delete notes' });
    }
};