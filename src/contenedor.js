const fs = require('fs');

 class Contenedor{
    constructor(file){
        this.file = file
    }

    async save(objeto){
        try{
            const objetos = await this.getAllProducts()
            const ultimoId = objetos.length > 0 ? objetos[objetos.length -1].id : 0
            const nuevoId = ultimoId +1
            const nuevoObjeto= {
                id: nuevoId, ...objeto
            }
            objetos.push(nuevoObjeto)
            await this.saveProduct(objetos)
            return nuevoId
        }
        catch(error){
            throw new Error("error al guardar el objeto")

        }
    }

    async productById(id){
        try{
            const objetos = await this.getAllProducts()
            const objeto = objetos.find((o) => o.id === id)
             return objeto || null
        }
        catch(error){
            throw new Error("error al obtener el id")
        }
    }


async getAll(){
    try{
        const objetos = await this.getAllProducts()
        return objetos
    }
    catch(error){
        throw new Error("error al obtener productos")
    }
}
async deleteProduct(id){
    try{
        let objetos = await this.getAllProducts()
        objetos = objetos.filter((o) => o.id !== id)
        await this.saveProduct(objetos)
            }

catch(error){
    throw new Error("error al eliminar el objeto")
}
}
async deleteProducts(){
    try{
        await this.saveProduct([])
    }
    catch (error) {
        throw new Error("error al eliminar los objetos")
    }
}
async getAllProducts(){
    try{
        const data = await fs.promises.readFile(this.file, "utf-8")
        return data ? JSON.parse(data) : []
    }
    catch(error){
      return  []
    }
}

async saveProduct(objetos){
    try{
        await fs.promises.writeFile(this.file, JSON.stringify(objetos, null, 2));
    }
    catch(error){
        throw new Error("error al guardar los objetos")
    }
}
}

const productos = new Contenedor("products.json")
module.exports = productos;
