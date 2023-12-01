const jwt = require('jsonwebtoken');

function autenticarUsuario(req, res, next) {
  const token = req.cookies['token']; //Buscamos el token en las cookies

  if (!token) {
    return res.status(403).json({ message: 'Se requiere autenticación' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Falló la autenticación' });
    }

    req.usuario = decoded;
    next();
  });
}

module.exports = autenticarUsuario;