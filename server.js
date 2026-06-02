import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import korisniciRoute from './src/routes/korisnici.js';

dotenv.config();

const app = express();

connectDB();

app.use(cors())
app.use(express.json());

app.use('/api/korisnici', korisniciRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});