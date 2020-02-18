const express = require('express');

const bcrypt= require('bcryptjs');
const _ = require('underscore');
const app = express();
const Usuario = require('../models/usuario');
app.get('/',function (req, resp ) {
  resp.json({
    ok: true,
    message: 'Api funcionando'
  });
})
app.get('/usuario', function (req, res) { 
  
  let desde = req.query.desde || 0;
  desde= Number(desde);
  //console.log(req.query);

  let estado = {estado: true}
  let limite = req.query.limite || 5;
  limite = Number(limite);

    Usuario.find(estado,'nombre email role google estado img')
    .skip(desde)
    .limit(limite)
    .sort({nombre: 'asc'})
    .exec( (err, usuarios) => { 
      if (err) {
            
        return res.status(400).json({ 
            ok: false,
            err
          }); //F3
        } 
    //usuarioDB.password=null;
    Usuario.count({estado},(err, conteo) => {
      res.json({
        ok: true,
        usuarios,
        registros: conteo
        }); 
      });

    });

}); 

  
  app.post('/usuario', function (req, res) {
      let body = req.body;
      let usuario = new Usuario({
          nombre: body.nombre,
          email: body.email,
          password: bcrypt.hashSync(body.password,10),
          role: body.role
      });

      usuario.save( (err, usuarioDB)  => {
        if (err) {
            
            return res.status(400).json({
                ok: false,
                err
            });
        } 
        //usuarioDB.password=null;
        res.json({
            ok: true,
            usuario: usuarioDB
        })
      });
    });
  
    app.put('/usuario/:id', function (req, res) {
      let id = req.params.id;
      let body = _.pick(req.body,['nombre','email','estado','img','role']);

      Usuario.findByIdAndUpdate( id, body, {new: true, runValidators: true},(err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json(
            {
                ok: true,
                usuario: usuarioDB
            }
        );
      });
      
    });

    app.delete('/usuario/:id', function (req, res) {
      let id = req.params.id;
      //let body = _.pick(req.body,['nombre','email','estado','img','role']);
      let cambiaestado = {
        estado: false
      }
      Usuario.findByIdAndUpdate( id, cambiaestado, {new: true},(err, usuarioborrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json(
            {
                ok: true,
                usuario: usuarioborrado
            }
        );
      });
      
    });


    module.exports = app;