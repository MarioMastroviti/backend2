const express = require('express');

const router = express.Router();


const contenedor = require('../contenedor');
const productos = new contenedor("products.json")

router.get("/api/products" , async(req, res) => {
    const todosProductos = await productos.getAllProducts()
    res.json({status: "sucess", todosProductos})
   })

   router.get("/api/products/:pid", async(req,res) => {
    const pid = parseInt(req.params.pid);
    const productoBuscado = await productos.productById(pid)
    
    if (!productoBuscado) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    return res.json(productoBuscado);
    })


router.post("/api/products" , async (req, res) => {
    try {
        const newProduct = req.body;
        await productos.save(newProduct);
  res.json({ mensaje: 'Nuevo producto creado'});
} catch (error) {
  res.status(500).json({ error: 'Error al crear el carrito' });
}
});
    


 
    router.put('/api/products/:pid', async (req, res) => {
        const pid = parseInt(req.params.pid);
        const cambiarObjeto = req.body;
    
        if (productos[pid]) { 
            productos[pid] = cambiarObjeto; 
            await save(productos); 

    res.status(200).json({ mensaje: "producto cambiado correctamente" }); 
        } else {
            res.status(400).json({ mensaje: "producto no encontrado" });
        }
    });
   
    
    
    
    

router.delete('/api/products/:pid', async(req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        productos.deleteProduct(pid);
        
     res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } 
    catch (error) {
         res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});


  
    



module.exports = router;