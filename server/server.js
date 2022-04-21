require('./config/config')
require('colors')
const express = require('express');
const app = express();

app.use('/api', require('./routes/index'))

app.listen(process.env.PORT,()=>{
    console.log('Node'.green, 'esta corriendo en el puerto: ', (process.env.PORT).yellow);
})