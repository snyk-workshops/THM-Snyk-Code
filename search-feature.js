const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const { searchChatHistory } = require('./chat-controller');

app.post('/search', (req, res) => {
  const { searchTerm } = req.body;
  searchChatHistory(searchTerm).then(searchResults => {
    res.json(searchResults);
  }).catch(err => res.status(500).send('An error occurred'));
});

app.get('/display', (req, res) => {
  const message = req.query.message;
  res.send(`<div>${message}</div>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
