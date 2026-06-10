import express from 'express';
import bcrypt from 'bcryptjs';
import Korisnik from '../models/Korisnik.js';
import Admin from '../models/Admin.js'

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
            uloga: 'korisnik'
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
        const { email, lozinka } = req.body
        const admin = await Admin.findOne({ email })
        if (admin) {
            const isMatch = await bcrypt.compare(lozinka, admin.password)
            if (!isMatch) return res.status(400).json({ message: 'Netočna lozinka.' })
            
            return res.status(200).json({
                message: 'Prijava uspješna!',
                user: {
                    id: admin._id,
                    email: admin.email,
                    username: 'Admin',
                    uloga: admin.role
                }
            })
        }
        const korisnik = await Korisnik.findOne({ email })
        if (!korisnik) return res.status(400).json({ message: 'Korisnik s tim e-mailom ne postoji.' })

        const isMatch = await bcrypt.compare(lozinka, korisnik.lozinka)
        if (!isMatch) return res.status(400).json({ message: 'Netočna lozinka.' })

        res.status(200).json({
            message: 'Prijava uspješna!',
            user: {
                id: korisnik._id,
                ime: korisnik.ime,
                prezime: korisnik.prezime,
                email: korisnik.email,
                username: korisnik.username,
                uloga: korisnik.uloga
            }
        })

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Error pri prijavi korisnika.')
    }
})
router.get('/', async (req, res) => {
    try {
        const korisnici = await Korisnik.find({}, '-lozinka')
        res.status(200).json(korisnici)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Greška pri dohvatu korisnika.')
    }
})

export default router;