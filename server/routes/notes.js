const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const authenticate = require('../middleware/auth');

// All routes below require authentication
router.use(authenticate);

// GET /api/notes — Get only the current user's notes
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;

    const filter = { user: req.user._id }; // ← Only this user's notes

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching notes' });
  }
});

// GET /api/notes/:id
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching note' });
  }
});

// POST /api/notes
router.post('/', async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      user: req.user._id, // ← Attach the authenticated user
    });
    res.status(201).json(note);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: messages.join('. ') });
    }
    res.status(500).json({ error: 'Server error while creating note' });
  }
});

// PUT /api/notes/:id
router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: messages.join('. ') });
    }
    res.status(500).json({ error: 'Server error while updating note' });
  }
});

// DELETE /api/notes/:id
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json({ message: 'Note deleted', note });
  } catch (error) {
    res.status(500).json({ error: 'Server error while deleting note' });
  }
});

module.exports = router;