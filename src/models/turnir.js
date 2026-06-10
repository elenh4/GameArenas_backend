import mongoose from 'mongoose'

const TurnirSchema = new mongoose.Schema({
    naziv: {
        type: String,
        required: true
    },
    vrsta: {
        type: String,
        enum: ['social', 'esport'],
        required: true
    },
    maxIgraca: {
        type: Number,
        required: true
    },
    datum: {
        type: String,
        required: true
    },
    vrijeme: {
        type: String,
        required: true
    },
    nagrade: {
        type: [String],
        default: []
    },
    url: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

export default mongoose.model('Turnir', TurnirSchema)