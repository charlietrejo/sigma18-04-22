process.env.PORT = process.env.PORT || 3000;

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = "mongodb://localhost:27017/InventarioSigma"
}else{
    urlDB = "mongodb://localhost:27017/InventarioSigma"
}

process.env.URLDB = urlDB;