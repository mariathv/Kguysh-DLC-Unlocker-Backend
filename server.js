const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const PORT = 5000;
const path = require('path')
const fs = require('fs');

app.use(cors());
app.use(express.json());

const configFilePath = path.join(__dirname, 'cream_api.ini')



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

app.post('/generate-creamapid', (req, res) => {
    const inidata = req.body.inidata;
    console.log(inidata);
    fs.readFile(configFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return res.status(500).send('Error reading the file');
        }

        let updatedData = data;

        for (const [id, name] of Object.entries(inidata)) {
            updatedData += `\n${id} = ${name}`;
        }
        res.json({ updatedContent: updatedData });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
