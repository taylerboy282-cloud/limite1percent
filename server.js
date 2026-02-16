const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Basic Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Express server!');
});

app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});