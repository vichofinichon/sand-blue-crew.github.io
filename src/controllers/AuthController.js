const Cuentas = require('../models/Shema-Cuentas')
const jwt = require('jsonwebtoken')


const login = async(req, res, next) => {
    var email = req.body.email;

    const user = await Cuentas.findOne({ Email: email }) 
	if(!user) {
    	return res.status(404).send("The email doesn't exists")
	}
	const validPassword = await user.Password !== req.body.Password
	if (!validPassword) {
        return res.send('Contraseña Incorrecta!')
	}
	const token = jwt.sign({id: user._id}, "SxSxSf42¿¿302", {
        expiresIn: 60 * 60 * 24
    });
    res.status(200).json({auth: true, token});
}

module.exports = login;