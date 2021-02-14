const express = require('express');
const app = express();
var cons = require('consolidate')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

require('./database')

app.use(express.json());

//app.set('views', __dirname + '/views');
//app.set('view engine', 'html');
app.engine('html', cons.swig)
app.set('views', __dirname + "/views");
app.set('view engine', 'html');

app.use(express.static(`${__dirname}/assets`));
app.locals.basedir = `${__dirname}/assets`;

app.use('/', require('./routes/deploy'))

let port = 4000 || process.env.PORT;
console.log(`Pagina Online y Sincronizada con Bot Discord. Port: ${port}`)
app.listen(port)