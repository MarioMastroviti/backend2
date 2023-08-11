const express = require('express');
const app = express();




const productsRouter = require('../src/routes/products.router');
const cartRouter = require('../src/routes/cart.router');


const PORT = 8081;

app.use(express.json());
app.use("/" , productsRouter);
app.use("/" , cartRouter);

app.listen(PORT, () => {
    console.log(`escuchando en el puerto ${PORT}`)
})

