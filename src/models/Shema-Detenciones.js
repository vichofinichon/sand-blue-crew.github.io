const mongoose = require('mongoose');

let Shema = new mongoose.Schema({
	// Info Detenido
    Detenido: String,
	DNI: String,
	Informe: String,
	Cargos: String,
	// Info Oficial
	Oficial: String,
	Placa: String,
	Rango: String, 
	Division: String,
	Fecha: String
});

module.exports = mongoose.model('Detenciones', Shema);