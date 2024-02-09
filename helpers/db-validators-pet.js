const Pet = require('../models/pet');

const existePetById = async (id = '') => {
    const existePetById = await Pet.find({id});
    if(existePetById){
        throw new Error(`La mascota con el ${id} no existe`);
    }
}

module.exports = {
    existePetById
}