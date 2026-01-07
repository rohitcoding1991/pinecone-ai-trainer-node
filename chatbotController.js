const initializePinecone = require("./pineconeClient");
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const addStory = async (req, res) => {
    const { storyId, storyText } = req.body;
  
    if (!storyId || !storyText) {
      return res.status(400).json({ error: 'storyId and storyText are required' });
    }
  
    try {
      // Generate embedding for the story using OpenAI
      const embeddingResponse = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: storyText,
      });
  
      // Ensure embedding is present
      const embedding = embeddingResponse.data[0]?.embedding;
      if (!embedding) {
        return res.status(500).json({ error: 'Embedding generation failed' });
      }
  
      // Debugging the generated embedding
      console.log('Generated embedding:', embedding);
  
      // Initialize Pinecone
      const pinecone = await initializePinecone();
      const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
      // Upsert the story's embedding into Pinecone
      const upsertResponse = await index.upsert(
        vectors= [
          {
            id: storyId.toString(), // Ensure ID is a string
            values: embedding, // The embedding values
            metadata: { storyText }, // Story text as metadata
          }
        ], // Ensure vectors are an array
      );
  
      console.log('Upsert response:', upsertResponse); // Debugging the upsert response
  
      // Return success message
      res.json({ message: 'Story added successfully!' });
    } catch (error) {
      console.error('Error adding story:', error);
      res.status(500).json({ error: 'An error occurred while adding the story.' });
    }
  };
  
  
  

  const chatWithBot = async (req, res) => {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }
  
    try {
      // Generate embedding for the question
      const embeddingResponse = await openai.embeddings.create({
        model: 'text-embedding-ada-002',  // This is still valid
        input: question,
      });
      console.log({embeddingResponse:embeddingResponse.data[0]});
      
      const questionEmbedding = embeddingResponse.data[0].embedding;
      
      // Search in Pinecone
      const pinecone = await initializePinecone();
      const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
  
      const queryResponse = await index.query({
        vector: questionEmbedding,
        topK: 1,
        includeMetadata: true,
      });
  
      const bestMatch = queryResponse.matches[0];
  
      if (!bestMatch) {
        return res.json({ answer: "I couldn't find anything related to your question." });
      }
  
      const story = bestMatch.metadata.storyText;
  
      // Generate answer from OpenAI chat model (gpt-3.5-turbo)
      const completionResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',  // Chat model
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: question },
          { role: 'assistant', content: `Story: ${story}` }
        ],
        max_tokens: 150,
      });
  
      const answer = completionResponse.choices[0].message.content.trim();
  
      res.json({ answer });
    } catch (error) {
      console.error('Error handling chatbot:', error);
      res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
  };
  
  

module.exports = { addStory, chatWithBot };
