import mongoose from 'mongoose';

const KorisnikSchema = new mongoose.Schema({
    ime: {
        type: String,
        required: true
    },
    prezime: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    lozinka: {
        type: String,
        required: true
    },
    username: {
        type: String,
        default: null
    },
    newsletter: {
        type: Boolean,
        default: false
    },
    uloga: {
        type: String,
        enum: ['User', 'korisnik', 'volonter', ],
        default: 'korisnik'
    },
    odobren: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Korisnik = mongoose.model('Korisnik', KorisnikSchema);
export default Korisnik;