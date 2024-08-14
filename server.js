const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = 'avatar';
const API_URL = 'https://skizo.tech/api/y2mate';

app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.post('/download', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const response = await axios.get(API_URL, {
            params: {
                apikey: API_KEY,
                url
            }
        });
        const data = response.data;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
