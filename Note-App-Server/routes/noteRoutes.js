const express = require('express');
const {
    getAllNotes,
    createNote,
    deleteNote,
    updateNote,
} = require('../controllers/noteController');

const router = express.Router();

router.get('/', getAllNotes);
router.post('/', createNote);
router.delete('/:id', deleteNote);
router.put('/:id', updateNote);

module.exports = router;
