//Guardamos en una constante todo lo que nos ofrece express
const express = require('express');

const cors = require('cors');

//Se inicializan y guarda las funcionalidades de express
const server = express();

//Seteamos el puerto disponible en el sistema
server.set('port', process.env.PORT || 3000);

//El formato de datos para la recepcion y envio de datos seran en JSON
server.use(express.json());

//Nos permite la comunicación entre servidores(en este caso nuestro cliente en vue y nuestra API)  
server.use(cors());

//Nuestras rutas
server.use(require('./routes/route.factura'));

//Le damos arranque a nuestro servidor
server.listen( server.get('port') );

//Mensaje que ejecucion del server
console.log('Servidor de desarrollo en el puerto', server.get('port'));