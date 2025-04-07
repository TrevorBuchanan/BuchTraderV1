// server.js

const express = require('express');
const path = require('path');
const routes = require('./routes');
const cors = require('cors');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files if needed

// Routes
app.use('/', routes); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

// Start the Server
const startServer = async () => {
    const PORT = process.env.PORT || 6000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

// Start the server
startServer().catch(err => {
    console.error('Error starting the server:', err);
});