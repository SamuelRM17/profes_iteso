const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
require('dotenv').config(); 
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Analiza el cuerpo de las solicitudes entrantes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




app.use(cookieParser());


app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./db')
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

const profesores = require('./routes/profesores')
app.use(profesores)

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const correo = req.body.correo;
    const contraseña = req.body.contraseña;

    //Buscamos al usuario en la base de datos
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
        return res.status(400).send('Usuario no encontrado');
    }

    //Comprobamos si la contraseña coincide con la del usuario
    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!contraseñaValida) {
        return res.status(400).send('Contraseña incorrecta');
    }

    //Si la contraseña es válida, creamos un token JWT
    const token = jwt.sign({ correo }, process.env.JWT_SECRET, { expiresIn: '1h' });

    //Almacenamos el token en una cookie y redirigimos al usuario a la página de inicio
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/index');
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
  });


app.listen(3000, () => {
    console.log('Servidor activo en http://localhost:3000');
});