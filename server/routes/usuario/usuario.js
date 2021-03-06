const express = require('express');
const res = require('express/lib/response');
const app = express.Router();
const UsuarioModel = require('../../models/usuario/usuario.model');
const bcrypt = require('bcrypt');
const ProductoModel = require('../../models/producto/producto.model');

app.get('/', async (req,res) => {
    const obtenerUsuario = await UsuarioModel.find({strContrasena:0});
    if (obtenerUsuario.length < 1) {
      return res.status(400).json({  
        ok: true,  
        msg: 'No se encontraron usuarios',
        cont: {
            obtenerUsuario
        }     
    })
}
    return res.status(200).json({
        ok: false,
        msg: 'Se encontraror usuarios',
        count: obtenerUsuario.length,
        cont: {
            obtenerUsuario
        }
    })
})

app.post('/', async (req,res) => {
    const body = {...req.body, strContrasena: req.body.strContrasena ? bcrypt.hashSync(req.body.strContrasena, 10) : undefined};
    const bodyUsuario = new UsuarioModel(body);
    
    
    const encontroEmail = await UsuarioModel.findOne({strEmail:body.strEmail});
    const encontroNombreUsuario = await UsuarioModel.findOne({strNombreUsuario:body.strNombreUsuario});

    if (encontroEmail.length>0) {
        return res.status(400).json({
            ok: false,
            msg: 'El strEmail ya se encuentra registrado',
            cont: {
                body 
            }
        })
        if (encontroNombreUsuario.length>0) {
            return res.status(400).json({
            ok: false,
            msg: 'El strEmail ya se encuentra registrado',
            cont: {
                body 
            }
        })
    }
}
    const err = bodyUsuario.validateSync();
    if (err) {
        return res.status(400).json({
            ok: false,
            msg: 'No se envio alguno de los campos requeridos',
            cont: {
                err
            }
        }) 
    }
    const usuarioRegistrado = await bodyUsuario.save();
    return res.status(200).json({
        ok: true,
        msg: 'El usuario se registro correctamente',
        cont: {
            usuarioRegistrado
        }
    })
})

app.put('/', async (req, res) => {
    try {
        const _idUsuario = req.query._idUsuario;
        if (!_idUsuario || _idUsuario.length != 24) {
            return res.status(400).json({
                ok: false,
                msg: _idUsuario ? 'El identificador no es valido' : 'No se recibio el identificador del usuario',
                cont: {
                    _idUsuario
                }
            })
        }
        const encontroUsuario = await usuarioModel.findOne({_idUsuario})
        if (!encontroUsuario) {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontro el usuario en la base de datos',
                cont: {
                    _idUsuario
                }
            })
        }
        const usuarioActualizado = await usuarioModel.findByIdAndUpdate(_idUsuario, {$set:{strNombre: req.body.strNombre, strApellido: req.body.strApellido, strDireccion: req.body.strDireccion } }, {new:true})
        //console.log(encontroUsuario);
        return res.status(200).json({
            ok: true,
            msg: 'Se actualizo el usuario correctamente',
            cont: {
                usuarioAnterior: encontroUsuario,
                usuarioActual: usuarioActualizado
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error del servidor',
            cont: {
                error
            }
        })
    }
})

app.delete('/', async (req,res) => {
    try {
        const blnEstado = req.body.blnEstado == "false" ? false : true
    const _idUsuario = req.query._idUsuario
    if (!_idUsuario || _idUsuario != 24) {
        return res.status(400).json({
            ok: false,
            msg: _idUsuario ? 'No es un id valido' : 'No se ingreso un id de usuario',
            cont: {
                _idUsuario: _idUsuario
            }
        })
    }
    const modificarEstadoUsuario = await UsuarioModel.findOneAndUpdate({_id: _idUsuario},{$set:{blnEstado:blnEstado }},{new:true})

    return res.status(200).json({
        ok: true,
        msg: blnEstado == true ? 'Se activo el usuario de manera existosa' : 'Se desactivo el usuario de manera exitosa',
        cont: {
            modificarEstadoUsuario
        }
    })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error del servidor',
            cont: {
                error
            }
        })
    }
})

module.exports = app;




// app.get('/obtenerUsuario', (req,res) => {
//     const _idUsuario = Number(req.query._idUsuario);
//     if (!_idUsuario) {
//         return res.status(400).json({
//             ok: false,
//             msg: 'No se recibio un identificador de usuario',
//             cont: {
//                 _idUsuario
//             }
//         })
//     }
//     const obtenerUsuario = arrJsnUsuarios.find(usuario => usuario._id == _idUsuario);
//     if (!obtenerUsuario) {
//         return res.status(400).json({
//             ok: false,
//             msg: `El usuario con el id: ${_idUsuario} , no se encuentra registrado en la base de datos`,
//             cont: {
//                 _idUsuario
//             }
//         })
//     }
// return res.status(200).json({
//     ok: true,
//     msg: 'Se recibio el usuario de manera exitosa',
//     cont: {
//         obtenerUsuario
//     }
// })

//     return res.status(200).json({
//         ok: true,
//         msg: 'Estoy en el segundo get',
//         cont: {
//             _idUsuario
//         }
//     })
// })
//let arrJsnUsuarios = [{ _id:}]
// const path = require('path');
// const rutaDescarga = path.resolve(__dirname, '../../assets/index.html')
// app.get('/', (req, res) =>{
// })

// app.post('/', (req, res) =>{
// })

// app.delete('/', (req,res) => {
//     const _IdUsuario = parseInt(req.query._IdUsuario);
//     if (!_IdUsuario) {
//         return req.status(400).json({
//            ok: false,
//             msg: 'No se recibio un identificador de usuario', 
//             cont: {
//             _IdUsuario
//             }
//         })
//     }
    // const encontroUsuario = arrJsnUsuarios.find(usuario => usuario._IdUsuario == _IdUsuario)
    // if (!encontroUsuario) {
    //     return res.status(400).json({
    //         ok: false,
    //         msg: `No se encontro un usuario con el Id: ${_IdUsuario} en la base de datos`, 
    //         cont: {
    //             _IdUsuario
    //         }
    //     })
    // }
//     const usuarioFiltrado = arrJsnUsuarios.filter(usuario => usuario._IdUsuario != _IdUsuario);
//     arrJsnUsuarios = usuarioFiltrado;

//     return res.status(200).json({
//         ok: false,
//         msg:'Se elimino el usuario de manera exitosa',
//         cont: {
//             encontroUsuario
//         }
//     })
// })

// app.put('/', (req, res) => {
//     const _IdUsuario = parseInt(req.query._IdUsuario);
//     if (_IdUsuario) {
        
//     }
// }

// app.get('/',(req,res) => {
//     const arrUsuarios = arrJsnUsuarios;
//     if (arrUsuarios.length > 0) {
//         return res.status(200).json({
//             ok: true,
//             msg: 'Se recibieron los usuarios de manera exitosa',
//             cont: {
//                 arrUsuarios
//             }
//         })
//     }else{
//         return res.status(400).json({
//             ok: false,
//             msg: 'No se encontraron usuarios',
//             cont
//         })
//     }
//    return res.status(200).json({
//         ok:true,
//         msg: 'Se recibieron los usuarios de manera exitosa',
//         cont:{
//             arrUsuarios
//         }
        
//     })
// })

// app.post('/',(req,res) => {
    
//         const body = {
//         strNombre: req.body.strNombre,
//         strApellido: req.body.strApellido,
//         strEmail: req.body.strEmail,
//         _id: Number(req.body._id)
//         }
    
//     if (body.strNombre && body.strApellido && body.strEmail && body._id) {
        
//         const encontroUsuario = arrJsnUsuarios.find(usuario => usuario._id == body._id || usuario.strEmail == body.strEmail); 
            
//         console.log(encontroUsuario, 'valor');

//         arrJsnUsuarios.find(usuario => { console.log(usuario) })

//         arrJsnUsuarios.find(res)
//     arrJsnUsuarios.push(body)
//     res.status(200).json({
//         ok:true,
//         msg: 'Se registro el usuario de manera correcta',
//         cont: {
//             arrJsnUsuarios
//         }
//     })
// }else{
//     res.status(400).json({
//         ok:false,
//         msg: 'No se recibio alguno  todos los valores requeridos',
//         cont: {
//             body
//         }
//     })
// }
//     const encontroUsuario = arrJsnUsuarios.find(usuario => usuario._id == body._id)
    
//     if (encotrousuario) {
//         res.status(400).json({
//             ok: false,
//             msg: 'El usuario ya se encuentra registrado',
//             cont: {
//                 encontroUsuario
//             }
//         })
//     }else{
//         arrJsnUsuarios.push
//     }

//     arrJsnUsuarios.find(res)
//     arrJsnUsuarios.push(body)
//     res.status(200).json({
//         ok:true,
//         msg: 'Seregistro el usuario de manera correcta',
//         cont: {
//             arrJsnUsuarios
//         }
//     })
//     }
    
    
// })

module.exports = app;