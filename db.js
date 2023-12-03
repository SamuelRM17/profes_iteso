const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/db_profesores';

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error no se pudo conectar a MongoDB'));
db.once('open', function callback() {
    console.log('Conectado a MongoDB');
});

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conexión a la base de datos establecida');
}).catch(err => console.error('Error al conectar a la base de datos:', err));

module.exports = db;
