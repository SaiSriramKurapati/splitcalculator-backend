const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const billRoutes = require('./routes/billRoutes');

dotenv.config();
const app =  express();
app.use(express.json());

// Allow CORS for localhost:3000 (Frontend)
app.use(cors({
    origin: 'https://splitcalculator.vercel.app'
}));

app.use('/api/bills',billRoutes);

const PORT = process.env.PORT; 
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
