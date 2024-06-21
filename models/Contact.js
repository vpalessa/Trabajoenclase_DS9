const mongoose = require('mongoose');
// Definición del esquema del contacto
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});
// Creación del modelo de contacto
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
