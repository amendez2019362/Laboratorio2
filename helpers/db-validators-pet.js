const Pet = require('../models/pet');

const existePetById = async (id = '') => {
    const existePet = await Pet.find({id});
    if(existePet){
        throw new Error(`La mascota con el ${id} no existe`);
    }
}

module.exports = {
    existePetById
}