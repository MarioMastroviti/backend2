const express = require('express');

const router = express.Router();
const productos = require('../contenedor');


router.get("/api/products" , async(req, res) => {
    const todosProductos = await productos.getAllProducts()
    res.json({status: "sucess", todosProductos})
   });
   
   
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
    try {
        const pid = parseInt(req.params.pid);
        const cambiarObjeto = req.body;

        const prodToChange = await productos.productById(pid);

        if (prodToChange) {
            const updatedProduct = { ...prodToChange, ...cambiarObjeto };
            await productos.deleteProduct(pid);
            await productos.save(updatedProduct);

            res.status(200).json({ message: 'Producto actualizado con éxito', product: updatedProduct });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el producto' });
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