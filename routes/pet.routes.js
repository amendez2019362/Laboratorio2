const { Router } = require('express');
const { check } = require('express-validator');

const { existePetById } = require('../helpers/db-validators-pet');
const { petPost, getPetById, petGet, petPut, petDelete } = require('../controller/pet.controller');
const pet = require('../models/pet');

const router = Router();

router.post(
    "/",
    [
        check("nombre", "Nombre Obligatorio").isEmpty(),
        check("edad", "La edad es obligatoria").isEmpty(),
        check("raza", "La raza es obligatoria").isEmpty(),
        check("peso", "El peso es obligatorio").isEmpty(),
        check("sexo", "El sexo de la mascota es obligatorio").isEmpty(),
        check("id").custom(existePetById),
    ], petPost
);

router.get("/", petGet);
router.get(
    "/:id",
    [
        check("id", "Formano no valido para MongoDB").isMongoId(),
        check("id").custom(existePetById),
    ], getPetById);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existePetById),
    ], petPut);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existePetById),
    ], petDelete);

module.exports = router;