const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const PORT = 5000;

app.use(cors());

app.get('/api/getDetailCS', async (req, res) => {
    try {
        const response = await axios.get('https://store.steampowered.com/api/appdetails?appids=255710');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});

app.get('/api/getDetailDLC/:appid', async (req, res) => {
    const appid = req.params.appid;

    try {
        const response = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${appid}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
