require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Ensure db.js is configured correctly
const cors = require('cors'); 
const userRoutes = require('./routes/userRoutes');
const jobRoutes=require('./routes/jobRoutes')
const RecruiterRoutes=require('./routes/RecuriterRoutes')
require('dotenv').config();


const app = express();
app.use(bodyParser.json()); // Parse JSON requests

const PORT = process.env.PORT || 5000;
app.use(cors({ origin: '*' }));


// Use the imported routes
app.use('/job', jobRoutes);
app.use('/recruiter', RecruiterRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
