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

router.post('/:id/prijava', async (req, res) => {
    try {
        const turnir = await Turnir.findById(req.params.id)
        if (!turnir) return res.status(404).json({ message: 'Turnir ne postoji.' })

        const userId = req.body.userId

        if (turnir.prijavljeni.includes(userId)) {
            return res.status(400).json({ message: 'Već ste prijavljeni na ovaj turnir.' })
        }

        if (turnir.prijavljeni.length >= turnir.maxIgraca) {
            return res.status(400).json({ message: 'Turnir je popunjen.' })
        }

        turnir.prijavljeni.push(userId)
        await turnir.save()

        res.status(200).json({ message: 'Uspješno ste se prijavili na turnir!' })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Greška pri prijavi na turnir.')
    }
})


router.get('/zavrseni', async (req, res) => {
    try {
        const sviTurniri = await Turnir.find().populate('prijavljeni', 'username')
        const zavrseni = sviTurniri.filter(t => {
            const vrijemeTurnira = new Date(`${t.datum}T${t.vrijeme}`)
            return vrijemeTurnira < new Date()
        })
        res.status(200).json(zavrseni)
    } catch (err) {
        res.status(500).send('Greška.')
    }
})
router.post('/:id/rezultati', async (req, res) => {
    try {
        const { rezultati } = req.body
        const turnir = await Turnir.findById(req.params.id)
        turnir.rezultati = rezultati
        turnir.zavrsen = true
        await turnir.save()
        res.status(200).json({ message: 'Rezultati upisani!' })
    } catch (err) {
        res.status(500).send('Greška.')
    }
})

export default router