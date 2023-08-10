const express = require('express');

const router = express.Router();

const cartManager = require("../cartManager");
const contenedor = require("../contenedor");



router.post('/api/cart', async (req,res) => {
    try {
        await cartManager.addCart(req.body)
        res.status(200).json({message: 'Carrito agregado'})
    } catch (error) {
        res.status(500).json({error})
    }
} )

router.get("/api/cart", async (req, res) => {
	try {
		const carts = await cartManager.getCarts();
		return res.status(200).send({ status: 200, payload: carts });
	} catch (error) {
		res.status(404).send({ status: 404, error: error.message });
	}
});


    router.get("/api/cart/:cid", async(req,res) => {
        const cid = parseInt(req.params.cid);
        const carritoBuscado = await cartManager.getCartsById(cid)
        
        if (!carritoBuscado) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }
    
        return res.json(carritoBuscado);
        })
   
    
    /*router.post('/api/cart/:cid/product/:pid', async (req,res) => {
        const {cid, pid} = req.params
        try {
            const newProductAdded = await cartManager.addProductToCart(+cid, +pid)
            res.status(200).json({message: 'Product added to cart', product: newProductAdded}) 
        } catch (error) {
            res.status(500).json({error})
        }
    } )*/

    router.post('/api/cart/:cid/product/:pid', async (req, res) => {
        try {
            const carritoId = parseInt(req.params.cid);
            const productoId = parseInt(req.params.pid);

               
            const carritoEncontrado = await cartManager.getCartsById(carritoId);
            if (!carritoEncontrado) {
                return res.status(404).json({ error: 'Carrito no encontrado.' });
            }

        
    
            
            carritoEncontrado.add = carritoEncontrado.productos || [];
            carritoEncontrado.productos.push(productoId);
    
            await cartManager.addCart(carritoEncontrado);
    
            res.json({ mensaje: `Producto ${productoId} agregado al carrito ${carritoId}.` });
        } catch (error) {
            res.status(500).json({ error: 'Error al agregar el producto al carrito.' });
        }
    });
    


module.exports = router;