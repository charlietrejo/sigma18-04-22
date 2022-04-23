const express = require('express');
const app = express.Router();
const ProductoModel = require('../../models/producto/producto.model');

app.get('/', async (req,res) => {
    const obtenerProductos = await ProductoModel.find();
    if (obtenerProductos.length < 1) {
        return res.status(400).json({
            ok: false,
            msg: 'No se encontraron productos en la base de datos',
            cont: {
                obtenerProductos
            }
        })
    }
    return res.status(200).json({
        ok: true,
        msg: 'Se obtuvieron los productos de manera exitosa',
        cont: {
            obtenerProductos
        }
    })
})
app.post('/', async (req,res) => {
    const body = req.body;
    const productoBody = new ProductoModel(body);
    const err = productoBody.validateSync();
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'No se recibio uno o mas campos favor de validar',
                cont :{
                    err
                }
            })
        }
        const productoRegistrado = await productoBody.save();
        return res.status(200).json({
            ok: true,
            msg: 'El producto se registro de manera exitosa',
            cont: {
                productoRegistrado
            }
        })
})

module.exports = app;