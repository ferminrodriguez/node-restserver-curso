
require ('./config/config');
const express = require('express');
var cors = require('cors')

const app = express();

const bodyParser= require('body-parser');
const mongoose   = require('mongoose');



// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
// parse application/json
app.use(bodyParser.json());

//configuracion global de rutas
app.use( require('./routes/index') );


 //Coneccion a mongodb
 mongoose.connect(process.env.URLDB,{ useCreateIndex: true,useUnifiedTopology: true, useNewUrlParser: true}, (err, rep) =>{
 if (err) throw err; 
  console.log('Base de datos Montada');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto 3000',3000);
});