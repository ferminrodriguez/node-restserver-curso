const express = require('express');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const Usuario = require('../models/usuario');


app.post('/login',(req, res) =>{
    let body = req.body;
    let palabrapaso = bcrypt.hashSync(body.password,10);
    Usuario.findOne({email: body.email},(err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err:
                {
                    message: "El Usuario o contraseña incorrectos."
                }
            });
        }
        
        if (!bcrypt.compareSync(body.password,usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err:
                {
                    message: "El Usuario o contraseña incorrectos",
                    password: body.passwor
               }
            });
        }

        let token= jwt.sign(
            {usuario: usuarioDB
        },process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN});

        res.json({
            ok: true,
            usuario: usuarioDB,
            token: token
        });
    });

    
});


module.exports = app;