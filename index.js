const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
// Middleware para parsear JSON y permitir CORS
app.use(express.json());
app.use(cors());
// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/phonebook', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB', error);
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Importar el modelo de Contact
const Contact = require('./models/Contact');
// Ruta para crear un nuevo contacto
app.post('/contacts', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).send(contact);
    } catch (error) {
        res.status(400).send(error);
    }
});
// Ruta para obtener todos los contactos
app.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).send(contacts);
    } catch (error) {
        res.status(500).send(error);
    }
});
// Ruta para obtener un contacto por ID
app.get('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).send();
        }
        res.status(200).send(contact);
    } catch (error) {
        res.status(500).send(error);
    }
});
// Ruta para actualizar un contacto
app.patch('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id,
            req.body, { new: true, runValidators: true });
        if (!contact) {
            return res.status(404).send();
        }
        res.status(200).send(contact);
    } catch (error) {
        res.status(400).send(error);
    }
});
// Ruta para eliminar un contacto
app.delete('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).send();
        }
        res.status(200).send(contact);
    } catch (error) {
        res.status(500).send(error);
    }
});
// Ruta para eliminar todos los contactos
