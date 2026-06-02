import express from 'express';
import bcrypt from 'bcryptjs';
import Korisnik from '../models/Korisnik.js';

const router = express.Router();

router.post('/registracija', async (req, res) => {
    try {
        const { ime, prezime, email, lozinka, username, newsletter } = req.body;
        let user = await Korisnik.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Korisnik s tim e-mailom već postoji.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashLozinka = await bcrypt.hash(lozinka, salt);
        const noviKorisnik = new Korisnik({
            ime,
            prezime,
            email,
            lozinka: hashLozinka,
            username,
            newsletter,
            uloga: 'User'
        });

        await noviKorisnik.save();
        res.status(201).json({ message: 'Registracija uspješna!' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error pri registraciji korisnika.');
    }
});

export default router;