require('./config/config')
require('colors')
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use('/api', require('./routes/index'))

//console.log(process.env.URLDB, 'URLDB');
mongoose.connect(process.env.URLDB, (err, resp) => {
    if (err) {
        console.log('Error al conectar la BD'.red);
        return err; 
    }
    console.log(`BD Online`, (process.env.URLDB).blue);
})

app.listen(process.env.PORT,()=>{
    console.log('[NODE]'.green, 'esta corriendo en el puerto: ', (process.env.PORT).yellow);
})