const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Pet = require('../models/pet');

const petGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = {estado: true};

    const [total, pet] = await Promise.all([
        Pet.countDocuments(query),
        Pet.find(query)
            .skip(Number(desde))
    ]);

    res.status(200).json({
        total,
        pet
    });
}

const getPetById = async (req, res) =>{
    const {id} = req.params;
    const pet = await Pet.findOne({_id: id});

    res.status(200).json({
        pet
    });
}

const petPut = async (req, res) =>{
    const {id} = req.params;
    const {_id, edad, raza, peso, ...resto} = req.body;
    const pet = await Pet.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Datos de mascota actualizados'
    })

}