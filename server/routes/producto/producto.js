const express = require('express');
const productoModel = require('../../models/producto/producto.model');
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
app.put('/', async (req,res) => {
    try {
        const _idProducto = req.query._idProducto;
        if (!_idProducto || _idProducto.length != 24) {
            return res.status(400).json({
                ok: false,
                msg: _idProducto ? 'El identificador no es valido' : 'No se recibio el identificador del producto',
                cont: {
                    _idProducto
                }
            })
        }
        const encontroProducto = await ProductoModel.findOne({ _idProducto});
        if (!encontroProducto) {
            return res.status(400).json({
                ok: false,
                msg: 'El producto no se encuentra registrado',
                cont: {
                    _idProducto
                }
            })
        }
        //const actualizarProducto = await ProductoModel.updateOne({ _idProducto }, {$set: {...req.body} })
        const actualizarProducto = await ProductoModel.findByIdAndUpdate({ _idProducto }, {$set: {...req.body} })
        if (!actualizarProducto) {
            return res.status(400).json({
                ok: false,
                msg: 'El producto no se logro actualizar',
                cont: {
                    ...req.body
                }
            })
        }
        return res.status(200).json({
            ok: true,
            msg: 'El producto se actualizo de manera exitosa',
            cont: {
                Producto
            }
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor',
            cont: {
                error
            }
        })
        
    }
    
})
app.delete('/', async (req,res) => {
    try {
        const _idProducto = req.query._idProducto;
    if (!_idProducto || _idProducto.length != 24) {
        return res.status(400).json({
            ok: false,
            msg: _idProducto ? 'El identificador es invalido' : 'No se recibio un identificador de producto',
            cont: {
                _idProducto
            }
        })
    }
    const encontrarProducto = await ProductoModel.findOne({_id: _idProducto});
    if (!encontrarProducto) {
        return res.status(400).json({
            ok: false,
            msg: 'El identificador del producto no se encuentra en la base de datos',
            cont: {
                _idProducto: _idProducto
            }
        })
    }
    const eliminarProducto = await productoModel.findOneAndDelete({_id: _idProducto});
    if (!eliminarProducto) {
        return res.status(400).json({
            ok: false,
            msg: 'El producto no se elimino de la base de datos',
            cont: {
                eliminarProducto
            }
        })
    }
    return res.status(200).json({
        ok: false,
        msg: 'El producto se elimino exitosamente',
        cont: {
            eliminarProducto
        }
    })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor',
            cont: {
                error
            }
        })
    }
})
module.exports = app;