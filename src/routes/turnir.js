import express from 'express'
import Turnir from '../models/turnir.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const turniri = await Turnir.find()
        res.status(200).json(turniri)
    } catch (err) {
        res.status(500).send('Greška pri dohvatu turnira.')
    }
})

router.post('/', async (req, res) => {
    try {
        const { naziv, vrsta, maxIgraca, datum, vrijeme, nagrade, url } = req.body
        const noviTurnir = new Turnir({ naziv, vrsta, maxIgraca, datum, vrijeme, nagrade, url })
        await noviTurnir.save()
        res.status(201).json({ message: 'Turnir uspješno dodan!', turnir: noviTurnir })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Greška pri dodavanju turnira.')
    }
})

export default router