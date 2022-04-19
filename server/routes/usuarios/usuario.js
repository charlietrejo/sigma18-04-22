const express = require('express');
const res = require('express/lib/response');
const app = express.Router();
let arrJsnUsuarios = []
// const path = require('path');
// const rutaDescarga = path.resolve(__dirname, '../../assets/index.html')
app.get('/', (req, res) =>{
})

app.post('/', (req, res) =>{
})

app.delete('/', (req,res) => {
    const _IdUsuario = parseInt(req.query._IdUsuario);
    if (!_IdUsuario) {
        return req.status(400).json({
           ok: false,
            msg: 'No se recibio un identificador de usuario', 
            cont: {
            _IdUsuario
            }
        })
    }
    const encontroUsuario = arrJsnUsuarios.find(usuario => usuario._IdUsuario == _IdUsuario)
    if (!encontroUsuario) {
        return res.status(400).json({
            ok: false,
            msg: `No se encontro un usuario con el Id: ${_IdUsuario} en la base de datos`, 
            cont: {
                _IdUsuario
            }
        })
    }
    const usuarioFiltrado = arrJsnUsuarios.filter(usuario => usuario._IdUsuario != _IdUsuario);
    arrJsnUsuarios = usuarioFiltrado;

    return res.status(200).json({
        ok: false,
        msg:'Se elimino el usuario de manera exitosa',
        cont: {
            encontroUsuario
        }
    })
})

app.put('/', (req, res) => {
    const _IdUsuario = parseInt(req.query._IdUsuario);
    if (_IdUsuario) {
        
    }
}

app.get('/',(req,res) => {
    const arrUsuarios = arrJsnUsuarios;
    if (arrUsuarios.length > 0) {
        return res.status(200).json({
            ok: true,
            msg: 'Se recibieron los usuarios de manera exitosa',
            cont: {
                arrUsuarios
            }
        })
    }else{
        return res.status(400).json({
            ok: false,
            msg: 'No se encontraron usuarios',
            cont
        })
    }
   return res.status(200).json({
        ok:true,
        msg: 'Se recibieron los usuarios de manera exitosa',
        cont:{
            arrUsuarios
        }
        
    })
})

app.post('/',(req,res) => {
    
        const body = {
        strNombre: req.body.strNombre,
        strApellido: req.body.strApellido,
        strEmail: req.body.strEmail,
        _id: Number(req.body._id)
        }
    
    if (body.strNombre && body.strApellido && body.strEmail && body._id) {
        
        const encontroUsuario = arrJsnUsuarios.find(usuario => usuario._id == body._id || usuario.strEmail == body.strEmail); 
            
        console.log(encontroUsuario, 'valor');

        arrJsnUsuarios.find(usuario => { console.log(usuario) })

        arrJsnUsuarios.find(res)
    arrJsnUsuarios.push(body)
    res.status(200).json({
        ok:true,
        msg: 'Se registro el usuario de manera correcta',
        cont: {
            arrJsnUsuarios
        }
    })
}else{
    res.status(400).json({
        ok:false,
        msg: 'No se recibio alguno  todos los valores requeridos',
        cont: {
            body
        }
    })
}
    const encontroUsuario = arrJsnUsuarios.find(usuario => usuario._id == body._id)
    
    if (encotrousuario) {
        res.status(400).json({
            ok: false,
            msg: 'El usuario ya se encuentra registrado',
            cont: {
                encontroUsuario
            }
        })
    }else{
        arrJsnUsuarios.push
    }

    arrJsnUsuarios.find(res)
    arrJsnUsuarios.push(body)
    res.status(200).json({
        ok:true,
        msg: 'Seregistro el usuario de manera correcta',
        cont: {
            arrJsnUsuarios
        }
    })
    }
    
    
})

module.exports = app;