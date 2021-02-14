const mongoose = require('mongoose');

let datalink = 'mongodb+srv://vichofinichon:2006hola@cluster0.z00fc.mongodb.net/Sand-Blue-Crew?retryWrites=true&w=majority'

mongoose.connect(datalink, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(db => console.log(`DataBase Sincronizada`)).catch(err => console.log(err))