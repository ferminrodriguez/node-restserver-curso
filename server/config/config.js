 //============================
 //puerto del entorno
 //============================

 process.env.PORT=process.env.PORT || 3000;

 //=================
 //     ENTORNO
 //=================
 process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
 
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
 console.log(process.env.NODE_ENV);
 process.env.URLDB=urlDB;