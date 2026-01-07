const { Pinecone } = require('@pinecone-database/pinecone');
require('dotenv').config();

const initializePinecone = async () => {
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    });
    return pc;
};

module.exports = initializePinecone;
