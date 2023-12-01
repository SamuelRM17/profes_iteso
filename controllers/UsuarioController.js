const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../model/Usuario');
const Profesor = require('../model/Profesor');

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.getMain = (req, res) => {
    res.render('inicio.ejs');
}
exports.getIndex = async (req, res) => {
    try {
        const profesores = await Profesor.find();
        res.render('index', { profesores });
    } catch (error) {
        console.error('Error al obtener la página de inicio:', error);
        res.status(500).json({ message: `Error al obtener la página de inicio: ${error.message}` });
    }
};


module.exports.login = async (req, res) => {
    try {
      const { correo, contraseña } = req.body;
  
      //Buscar el usuario en nuestra colección de usuarios
      const usuario = await Usuario.findOne({ correo });
  
      if (!usuario) {
        return res.status(401).json({ message: 'Correo no encontrado' });
      } else {
        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!contraseñaValida) {
          return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
      }
      
      //Si las credenciales son válidas, generamos un token de acceso
      const token = jwt.sign({ correo }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      //Almacenamos el token en una cookie y redirigimos al inicio
      res.cookie('token', token, { httpOnly: true });
      res.redirect('/index');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ message: `Error al iniciar sesión: ${error.message}` });
    }
  };

// module.exports.login = async (req, res) => {
//     try {
//       const { correo, contraseña } = req.body;
  
//       //Creamos un nuevo documento de Usuario
//       const user = new Usuario({ correo, contraseña });
  
//       //Guardamos el nuevo Usuario en la base de datos
//       await user.save();
//       res.status(200).send('Usuario guardado exitosamente');
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Error al guardar el usuario');
//     }
//   };