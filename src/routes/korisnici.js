const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.post('/Registracija_korisnika', async (req, res) => {
    try {
        const { ime, prezime, email, lozinka, username, newsletter } = req.body;

        let user = await user.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Korisnik s tim e-mailom već postoji.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashLozinka = await bcrypt.hash(lozinka, salt);

        user = new user({
            ime,
            prezime,
            email,
            lozinka: hashLozinka,
            username,
            newsletter,
            uloga: 'User'
        });

        await korisnik.save();
        res.status(201).json({ message: 'Registracija uspješna!' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error pri registraciji korisnika.');
    }
});

module.exports = router;