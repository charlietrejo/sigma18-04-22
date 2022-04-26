const mongoose = require('mongoose');

let SchemaUsuario = mongoose.Schema({
    strNombre:{
        type: String,
        required:[true, 'No se recibio el strNombre, favor de ingresarlo']
    },
    strApellido:{
        type:String,
        required:[true, 'No se recibio el strApellido, favor de ingresarlo']
    },
    strContrasena:{
        type:String,
        required:[true, 'No se recibio el nmbNomina, favor de ingresarlo']
    },
    strEmail:{
        type:String,
        required:[true, 'No se recicbio el strEmail, favor de ingresarlo']
    },
    strNombreUsuario:{
        type:String,
        required:[true, 'No se recicbio el strNombreUsuario, favor de ingresarlo']
    },
    strDireccion:{
        type:String,
        required:[true, 'No se recicbio el strNombreUsuario, favor de ingresarlo']
    }
})

module.exports = mongoose.model('usuario', SchemaUsuario);