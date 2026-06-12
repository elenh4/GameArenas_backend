import express from 'express';
import Korisnik from '../models/Korisnik.js';

const router = express.Router();

router.patch('/:id/bodovi', async (req, res) => {
    try {
        const { bodovi } = req.body;
        
        const korisnik = await Korisnik.findByIdAndUpdate(
            req.params.id,
            { bodovi: bodovi },
            { new: true }
        );

        if (!korisnik) {
            return res.status(404).json({ message: 'Korisnik nije pronađen' });
        }

        res.status(200).json({ message: 'Bodovi ažurirani', korisnik });
    } catch (error) {
        res.status(500).json({ message: 'Greška pri ažuriranju', error });
    }
});

export default router;