
# pinecone-ai-trainer-node

This project utilizes [Pinecone](https://www.pinecone.io/) as a vector database and [OpenAI](https://platform.openai.com/) for converting text into vectors to build a question-answering system based on stored stories.

## Features

- **Story Storage**: Save stories as vectors in Pinecone to enable efficient retrieval based on semantic similarity.
- **Text-to-Vector Conversion**: Use OpenAI's API to convert stories into vectors for storage in Pinecone.
- **Question Answering**: AQuery the stored stories to retrieve the most relevant answer using vector similarity search.
- **API Integration**: Two main APIs—one for saving stories and one for querying them with questions.

## Getting Started

### Prerequisites

- Node.js v20+ and npm installed.
- Pinecone account and API key for vector storage..
- OpenAI account and API key for text-to-vector conversion.

### Setup and Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/rohitcoding1991/pinecone-ai-trainer-node.git
   cd pinecone-ai-trainer-node.git
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   - Rename `.env.example` to `.env`.
   
   Example `.env` file:
   ```env
   PINECONE_API_KEY=
   PINECONE_ENVIRONMENT=
   PINECONE_INDEX_NAME=
   PORT=
   OPENAI_API_KEY=
   ```

4. **Start the Server:**

   Launch the application:
   ```bash
   npm start
   ```
5. **API Endpoints:**   
  
   -  **Add Story API**
   -  **URL: http://localhost:3000/add-story**
   -  **Method: POST**
   -  **Description: Stores a story in Pinecone as a vector for future retrieval.**
   -  **Request Body:**
    ```
    {
    "storyId": "1",
    "storyText":"story add example"
    }
    ```


    -  **Chat API (Ask a Question)**
   -  **URL: http://localhost:3000/chat**
   -  **Method: POST**
   -  **Description: Asks a question and retrieves the most relevant answer from the stored stories.**
   -  **Request Body:**
    ```
   {
    "question": "Who was Emily?"
   }
    ```

   # postman-collection
    
    **ai-project.postman_collection.json add in this file**