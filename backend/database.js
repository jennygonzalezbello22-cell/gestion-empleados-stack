const mongoose = require('mongoose');
const dns = require('dns');

// Configuración DNS para evitar el error ECONNREFUSED en Windows
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Reemplaza TU_CONTRASEÑA por la contraseña que le asignaste al usuario admin
const URI = 'mongodb+srv://admin:70400339@cluster0.sldxhck.mongodb.net/empleados?retryWrites=true&w=majority';

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;