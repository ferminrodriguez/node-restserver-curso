 //============================
 //puerto del entorno
 //============================

 process.env.PORT=process.env.PORT || 3000;

 //=================
 //     ENTORNO
 //=================
 process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
 

 //===============================
 //     FECHA DE EXPIRACION TOKEN
 //===============================
 // 60 SEGUNDOS
 // 60 MUNUTOS
 // 24 HORAS
 // 30 DIAS
 process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

 //===============================
 //     SEED DE AUTENTICACION (SEMILLA)
 //===============================
    process.env.SEED = process.env.SEED || 'este-es-el-sec-desarrolo';

 //============
 // Base de datos
 //============
let urlDB;

 if (process.env.NODE_ENV==='dev') {
    urlDB='mongodb://localhost:27017/Cafe';
 } else {
     urlDB=process.env.MONGO_URI;
 }
 //*/urlDB='mongodb+srv://ferminr:aYJHKjADRmIRXyz@bancalmongodb-1mku3.mongodb.net/bancalmongoosedb';
 //mongodb+srv://ferminr:aYJHKjADRmIRXyz@bancalmongodb-1mku3.mongodb.net/bancalmongoosedb';
 //console.log(process.env.NODE_ENV);
 process.env.URLDB=urlDB;

 ///****** Google Client ID*****//
//=============================//
process.env.CLIENT_ID = process.env.CLIENT_ID || '1035253371589-el2ii4amqnudpqn43c7eotskpmcdm1fa.apps.googleusercontent.com';