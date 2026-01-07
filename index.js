const express = require('express');
const bodyParser = require('body-parser');
const { addStory, chatWithBot } = require('./chatbotController');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/add-story', addStory); // Add a story to Pinecone
app.post('/chat', chatWithBot);   // Chat with the bot

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
