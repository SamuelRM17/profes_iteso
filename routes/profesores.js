const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/UsuarioController');
const profesorController = require('../controllers/ProfesorController');
const autenticarUsuario = require('../middleware/autenticarUsuario'); 

//Mostramos los profesores con un método get
//router.get('/', autenticarUsuario, profesorController.mostrar);


router.get('/', usuarioController.getMain);
//Creamos profesores con post
router.post('/crear', autenticarUsuario, profesorController.crear);

//Editamos profesor(POST)
router.post('/editar', autenticarUsuario, profesorController.editar);

//Borrar profesor (GET)
router.get('/borrar/:id', autenticarUsuario, profesorController.borrar);

//Redirigimos a un controlador para la ruta /login
router.post('/login', usuarioController.login);
//Get de login
router.get('/login', usuarioController.getLogin);
//Mandamos a la página principal
router.get('/index', usuarioController.getIndex);

module.exports = router;