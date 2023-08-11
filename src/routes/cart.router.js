const express = require('express');

const router = express.Router();

const cartManager = require("../cartManager");


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
   
    
 
    
    router.post('/api/cart/:cid/product/:pid', async (req, res) => {
        try {
            const {cid, pid} = req.params
    
            if(cartManager){
            const newProduct = await cartManager.addProductToCart(+cid, +pid);
    
            res.status(200).json({ message: 'Producto agregado al carrito con éxito'});
        }else{
            res.status(400).json({ message: 'carrito no encontrado' });
        }
        } catch (error) {
              res.status(500).json({ message: 'Error al agregar el producto al carrito' });
        }
    });
    


module.exports = router;