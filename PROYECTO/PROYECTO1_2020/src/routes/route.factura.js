const express = require('express');
const router = express.Router();

const db = require('../database');

router.get('/factura', (req,res) => {

    db.query('select * from factura', (err,rows) => {
        if(!err){
            res.json(rows);
        }else{
            res.json('Error al traer los datos de la tabla factura');
        }
    });

    //res.json('haciendo uso de esta ruta a traves del metodo GET se obtendra una lista de facturas');

});

//Eliminacion de una factura
router.delete('/factura/:codigo', (req,res) => {

    var id = req.params.codigo;
    db.query('delete from factura where id_factura =?',[id]);
        
    res.json('Se eliminó exitosamente!');

});
//Guardar una factura
router.post('/factura', (req,res) => {

    const unaFactura = req.body;

    db.query('insert into factura set ?',[unaFactura]);

    res.json('Se insertó exitosamente!');
});
//Actualizar factura
router.put('/factura/:codigo',(req,res) => {

    const id = req.params.codigo;

    const unaFactura = req.body;

    db.query('update factura set ? where id_factura = ?',[unaFactura,id]);

    res.json('Se actualizo la factura exitosamente!');
});

router.get('/factura/:codigo',(req,res) => {

    const id = req.params.codigo;

    db.query('select * from factura where id_factura = ?',[id],(err,rows) => {
        if(!err)
        {
            res.json(rows);
        }else{
            res.json('Ocurrió un error. Revisar!')
        }
    });

});

module.exports = router;