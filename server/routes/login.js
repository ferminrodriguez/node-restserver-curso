const express = require('express');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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

///configuraciones de google///
async function verify ( token ) {
    
    const ticket = await client.verifyIdToken({
        idToken : token,
        audience: process.env.CLIENT_ID,

  });
    const payload = ticket.getPayload();
        
    return ({
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    });
    }
    
//verify().catch(console.error);
app.post('/google', async (req, res) => {
let token = req.body.idtoken;
let googleUser= await verify(token)
    .catch(err => {
        return res.status(403).json({
            ok:false,
            error: err
        });
    });

    Usuario.findOne({email: googleUser.email}, ( err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (usuarioDB) {
        if (usuario.google === false) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Debe usar su autenticacion normal'
                }
                
            });
        }  else   {
            let token= jwt.sign(
                {usuario: usuarioDB
            },process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN});
            
            res.json({
                usuario: usuarioDB,
                token: token
            });
        }
    } else {
        //si el usuario no existe en la base de datos
        let usuario = new Usuario();
        usuario.nombre = googleUser.nombre;
        usuario.email = googleUser.email;
        usuario.img = googleUser.img;
        usuario.google = true;
        usuario.password = ':)';
        usuario.save( ( err, usarioDB) =>
        {
            
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Debe usar us autenticacion normal'
                    }   
                });
            }
            let token= jwt.sign(
                {usuario: usuarioDB
            },process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN});
    
            return res.json({
                ok: true,
                usuario: usuarioDB,
                token
            });
            
        });

    }

    });

  //  res.json({
  //      usuario: googleUser
  //  });


});


module.exports = app;