const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existenteEmail, existeUsuarioById } = require('../helpers/db-validators');
const { usuariosPost, usuariosGet, getUsuarioById, usuariosPut, usuariosDelete } = require('../controller/user.controller');
const usuario = require('../models/usuario');

const router = Router();

router.get("/", usuariosGet);
router.get(
    "/:id",
    [
        check("id", "Formano no valido para MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], getUsuarioById);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], usuariosPut);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], usuariosDelete);

router.post(
    "/",
    [
        check("nombre", "Nombre obligatorio").not().isEmpty(),
        check("password", "Password debe ser mayor a 6 caracteres").isLength({ min: 6, }),
        check("correo", "Correo valido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos,
    ], usuariosPost);

module.exports = router;