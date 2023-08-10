const fs = require('fs');
const Contenedor = require("./contenedor");
const contenedor = new Contenedor()


class CartManager {
     constructor (path) {
        this.path = path
        this.carts = []
     }

     async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const carts = await fs.promises.readFile(this.path,'utf-8')
                return JSON.parse(carts)
            } else {
                return []
            }
        } catch (error) {
            console.log(error)
            return error
        }
     }

 
     async getCartsById(id) {
        try {
            const cartsPrev = await this.getCarts()
            const cartById = cartsPrev.find((o) => o.id === id)
            return cartById || null
        } catch(error) {
            console.log(error)
            return error
        }
     }

     async addCart() {
        try {
            const cartsPrev = await this.getCarts()
            let id 
            if (!cartsPrev.length){
                id = 1
            } else {
                id = cartsPrev[cartsPrev.length - 1].id + 1
            }
            let newCart = {
                id: id,
                products: []
            }
            cartsPrev.push(newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(cartsPrev))
            return newCart
        } catch (error) {
            console.log(error)
            return error
        }
     }
    
     async addProductToCart(cid, pid) {
        try {
            const cartsPrev = await this.getCartsById(cid)
            const productById = await contenedor.productById(pid)
        
           const newProductToCart = {
                product: productById.id,
                quantity: 1
            }
            const carts = cartsPrev.map(cart => {
                if (cart.id === cid) {
                    const productInCart = cart.products.find(product => product.product === pid)
                    if (productInCart) {
                        productInCart.quantity++
                    } else {
                        cart.products.push(newProductToCart)
                    }
                }
                return cart
            })
            await fs.promises.writeFile(this.path, JSON.stringify(carts))
            return newProductToCart
        } catch (error) {
            console.log(error)
            return error
        }
     }
}

const cartManager = new CartManager('carts.json')
module.exports = cartManager

