const { Schema, model} = require('mongoose');

const PetSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    edad: {
        type: String,
        required: [true, 'Edad necesaria']
    },
    raza: {
        type: String,
        required: [true, 'Raza necesaria']
    },
    peso:{
        type: String,
        require: [true, 'Peso Necesario']
    },
    sexo:{
        type: String,
        require: [true, 'Sexo necesario']
    },
});

module.exports = model('pet', PetSchema);