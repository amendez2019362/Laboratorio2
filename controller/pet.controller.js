const { response, json } = require('express');
const Pet = require('../models/pet');

const petPost = async (req, res) => {
    const { nombre, edad, raza, peso, sexo } = req.body;
    const pet = new Pet({ nombre, edad, raza, peso, sexo });

    await pet.save();
    res.status(200).json({
        pet
    });
}

const petGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, pet] = await Promise.all([
        Pet.countDocuments(query),
        Pet.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        pet
    });
}

const getPetById = async (req, res) => {
    const {id} = req.params;
    const pet = await Pet.findOne({_id: id});

    res.status(200).json({
        pet
    });
}

const petPut = async (req, res) =>{
    const {id} = req.params;
    const { _id, nombre, edad, raza, ...resto} = req.body;
    const pet = await Pet.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Mascota actualizada exitosamente'
    });
}

const petDelete = async (req, res) => {
    const {id} = req.params;
    const pet = await Pet.findByIdAndUpdate(id, {estado: false});

    res.status(200).json({
        msg: 'Mascota Eliminada'
    });
}

module.exports = {
    petPost,
    getPetById,
    petGet,
    petPut,
    petDelete
}