const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

require('./database')

app.use(express.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(express.static(`${__dirname}/assets`));
app.locals.basedir = `${__dirname}/assets`;

app.use('/', require('./routes/deploy'))

let port = 4000 || process.env.PORT;
console.log(`Pagina Online y Sincronizada con Bot Discord. Port: ${port}`)
app.listen(port)