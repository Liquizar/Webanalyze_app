// server.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { analyzeWebsite } = require('./analyze');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Serve the frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Handle root route
app.get('/', (req, res) => {
    // Redirect to the index.html file
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// API endpoint for website analysis
app.post('/analyze', async (req, res) => {
    const { websiteUrl } = req.body;
    try {
        const analysisResult = await analyzeWebsite(websiteUrl);
        res.json(analysisResult);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred during analysis.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
