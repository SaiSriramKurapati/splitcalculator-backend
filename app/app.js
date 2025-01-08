const express = require('express');
const dotenv = require('dotenv');
const billRoutes = require('./routes/billRoutes');

dotenv.config();
const app =  express();
app.use(express.json());

app.use('/api/bills',billRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
})