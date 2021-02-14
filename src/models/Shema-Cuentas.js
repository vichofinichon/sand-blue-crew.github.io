const mongoose = require('mongoose');

let Shema = new mongoose.Schema({
    Oficial: String, 
    Email: String,
    Password: String
});

module.exports = mongoose.model('Cuentas', Shema);