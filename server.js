import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './src/config/db.js';
import korisniciRoute from './src/routes/korisnici.js';
import turniriRoute from './src/routes/turnir.js'

dotenv.config()
const app = express();

connectDB();

app.use(cors())
app.use(express.json());

app.use('/api/korisnici', korisniciRoute);
app.use('/api/turniri', turniriRoute)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});