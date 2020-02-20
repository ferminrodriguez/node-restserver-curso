const jwt = require('jsonwebtoken');

//====================
// VERIFICA TOKEN
//====================

let verificaToken = (req, res, next ) =>
{
let token = req.get('token');
console.log(token);
jwt.verify( token, process.env.SEED , (err, decoded ) => {
    
    
    if ( err ) {
        return res.status(401).json({
            ok: false,
            err
        });
    }
req.usuario = decoded.usuario;
next();
});
};

let verifica_ADMINROLE = (req, res, next ) =>
{
  let usuario = req.usuario;
  if (!usuario.rol==='ADMIN_ROLE') {
    return res.status(401).json({
        ok: false,
        err: {
            message: "Rol no valido para crear usuario"
        }
    });
    }
    next();
};
module.exports={
    verificaToken,
    verifica_ADMINROLE
}