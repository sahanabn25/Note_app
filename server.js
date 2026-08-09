const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const Note = require('./models/note');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/notesApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.get('/', async (req, res) => {
  const notes = await Note.find().sort({ updatedAt: -1 });
  res.render('index', { notes });
});

app.get('/note/:id', async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.render('editor', { note });
});

app.get('/new', (req, res) => {
  res.render('editor', { note: null });
});

app.post('/note', async (req, res) => {
  const { content, bgColor } = req.body;
  await Note.create({ content, bgColor });
  res.redirect('/');
});

app.post('/note/:id', async (req, res) => {
  const { content, bgColor } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { content, bgColor });
  res.redirect('/');
});

app.post('/note/:id/delete', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
