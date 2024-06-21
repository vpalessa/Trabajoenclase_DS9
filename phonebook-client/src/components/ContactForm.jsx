import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ContactForm = ({ fetchContacts, currentContact, setCurrentContact
}) => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');

    // Efecto para actualizar el formulario cuando se selecciona un contacto para editar
    useEffect(() => {
        if (currentContact) {
            setName(currentContact.name);
            setPhone(currentContact.phone);
            setAge(currentContact.age);
            setLastname(currentContact.lastname);
        }

    }, [currentContact]);
    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentContact) {
                // Actualizar contacto existente
                await
                    axios.patch(`http://localhost:3001/contacts/${currentContact._id}`, {
                        name, phone, age, lastname
                    });
                setCurrentContact(null);
            } else {
                // Crear nuevo contacto
                await axios.post('http://localhost:3001/contacts', {
                    name,
                    lastname,
                    phone,
                    age
                });
            }
            fetchContacts();
            setName('');
            setPhone('');
            setAge('');
            setLastname('');
            // ASDASDASDA
        } catch (error) {
            console.error('Error saving contact', error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre</label>
                <input type="text" value={name} onChange={(e) =>
                    setName(e.target.value)} required />
            </div>
            <div>
                <label>Apellido</label>
                <input type="text" value={lastname} onChange={(e) =>
                    setLastname(e.target.value)} required />
            </div>
            <div>
                <label>Numero de Telefono</label>
                <input type="text" value={phone} onChange={(e) =>
                    setPhone(e.target.value)} required />
            </div>
            <div>
                <label>Edad</label>
                <input type="text" value={age} onChange={(e) =>
                    setAge(e.target.value)} required />
            </div>
            <button type="submit">{currentContact ? 'Update Contact' : 'AddContact'}</button>
        </form>
    );
};
export default ContactForm;