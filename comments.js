// Create web server
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const comments = require('./comments');

app.use(bodyParser.json());

// GET /comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// POST /comments
app.post('/comments', (req, res) => {
  const { body } = req;
  if (!body || !body.author || !body.message) {
    res.status(400).json({ error: 'author and message are required' });
    return;
  }
  comments.push(body);
  res.json(body);
});

// DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  if (!comments[id]) {
    res.status(404).json({ error: 'comment not found' });
    return;
  }
  comments.splice(id, 1);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});