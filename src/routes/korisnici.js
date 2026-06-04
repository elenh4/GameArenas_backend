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

router.post('/prijava', async (req, res) => {
    try {
        const { email, lozinka } = req.body;
        const korisnik = await Korisnik.findOne({ email });
        if (!korisnik) {
            return res.status(400).json({ message: 'Korisnik s tim e-mailom ne postoji.' });
        }

        const isMatch = await bcrypt.compare(lozinka, korisnik.lozinka);
        if (!isMatch) {
            return res.status(400).json({ message: 'Netočna lozinka, pokušajte ponovno.' });
        }

        res.status(200).json({
            message: 'Prijava uspješna!',
            user: {
                id: korisnik._id,
                ime: korisnik.ime,
                prezime: korisnik.prezime,
                email: korisnik.email,
                uloga: korisnik.uloga
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error pri prijavi korisnika.');
    }
});

export default router;