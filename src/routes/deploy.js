const express = require('express');
const router = express.Router();
const Cuentas = require('../models/Shema-Cuentas')
const Detenidos = require('../models/Shema-Detenciones')
const jwt = require('jsonwebtoken')

const authenticate = require('../middleware/authenticate');

router.post('/database/login', async(req, res, next) => {
	var email = req.body.email;

    const user = await Cuentas.findOne({ Email: email }) 
	if(!user) {
    	return res.status(404).send("The email doesn't exists")
	}
	const validPassword = await user.Password !== req.body.Password
	if (!validPassword) {
        return res.send('Contraseña Incorrecta!')
	}
	const token = jwt.sign({id: user._id}, "SxSxSf42¿¿302", {expiresIn: "1h"});
    res.status(200).render('../views/database/logueado') //json({auth: true, token});
})

router.get('/', (req, res) => {
    res.render('../views/index.pug')
});

router.get('/database/login', (req, res) => {
	res.render('../views/signin.pug')
})

router.get('/database/', (req, res) => {
	res.render('../views/database/index.pug')
});

router.get('/database/detenciones/', (req, res) => {
	res.render('../views/database/detenciones.pug')
});

// Detenciones

router.get('/database/detenciones/add', (req, res) => {
	res.render('../views/database/add-detenido.pug')
});

router.post('/database/detenciones/add', (req, res) => {
	let oficial = req.body.oficial;
	if(!oficial) res.send('Falta el Oficial!')
	let placa = req.body.placa;
	if(!placa) res.send('Coloca tu placa!')
	let fecha = req.body.fecha;
	if(!fecha) res.send('Falta la Fecha!')
	let detenido = req.body.nombre;
	if(!detenido) res.send('Falta el Detenido!')
	let numDNI = req.body.dni;
	if(!numDNI) res.send('Falta el DNI!')
	let informe = req.body.informe;
	if(!informe) res.send('Falta el Informe')
	let cargos = req.body.cargos;
	if(!cargos) res.send('Falta los Cargos!')
	let rangos = req.body.rango;
	if(!rangos) res.send('Falta los Rangos!')
	let division = req.body.division;
	if(!division) res.send('Falta tu Division!')

	Detenidos.findOne({ Detenido: detenido }, (err, data) => {
		if(err) console.log(err)

		if(!data) {
			let newDetenido = new Detenidos({
				Detenido: detenido,
				DNI: numDNI, 
				Informe: informe,
				Cargos: cargos,
				Oficial: oficial,
				Placa: placa,
				Rangos: rangos,
				Division: division,
				Fecha: fecha
			})
			newDetenido.save()
			res.send("Detenido subido a la base de datos.")
		} else {
			if(data) {
				let newDetenido = new Detenidos({
					Detenido: detenido,
					DNI: numDNI, 
					Informe: informe,
					Cargos: cargos,
					Oficial: oficial,
					Placa: placa,
					Rangos: rangos,
					Division: division,
					Fecha: fecha
				})
				newDetenido.save()
				res.send("Detenido subido a la base de datos.")
			}
		}
	})
});

router.post('/database/detenciones/', (req, res) => {
	let detenido = req.body.detenido;
	console.log(detenido)
	Detenidos.find({ Detenido: detenido }, (err, data) => {
		if(err) console.log(err)
		if(!data) {
			res.render('../views/errors/NoDetenido.pug')
		} else {
			if(data) {
				res.send(data)
			}
		}
	})
})

router.get('*', (req, res) => {
	res.render(`../views/errors/404.pug`)
})

module.exports = router;