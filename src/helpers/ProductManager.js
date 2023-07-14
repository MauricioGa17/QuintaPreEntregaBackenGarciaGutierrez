import fs from 'fs'
import uniqid from 'uniqid';

class ProductManager {
    constructor(path) {
        this.path = path
    }

    addNewProduct = (title, descripcion, code, price, status, stock, category, thumbnails) => {

        if(fs.existsSync(this.path)){
            //Existe el archivo
            const product = {
                id: Date.now(),
                title: title,
                description: descripcion,
                code: code,
                price: price,
                status: status,
                stock: stock,
                category: category,
                thumbnail: thumbnails,
            }

            const contenido = fs.readFileSync(this.path, 'utf-8')
            const products = JSON.parse(contenido)

            products.push(product)

            fs.writeFileSync(this.path, JSON.stringify(products));

            return products;
        }else{
            //Escribir archivo
            const products = [];

            fs.writeFileSync(this.path, JSON.stringify(products));

            return products;
        }
    }

    updateProduct = (idProduct, title, descripcion, code, price, status, stock, category, thumbnails) => {

        const contenido = fs.readFileSync(this.path, 'utf-8')
        const products = JSON.parse(contenido)

        const product = products.find((product) => {
            return product.id === idProduct
        })

        if(!product){
            return null;
        }

        const newProducts = products.filter((products) => {
            return products.id != idProduct
        })

        product.title = title;
        product.description = descripcion;
        product.code = code,
        product.price = price;
        product.status = status,
        product.stock = stock,
        product.category = category,
        product.thumbnail = thumbnails;

        newProducts.push(product)

        fs.writeFileSync(this.path, JSON.stringify(products));

        return newProducts
      
    }

    getAllProducts = () => {
        if(fs.existsSync(this.path)){
            const products =  fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(products)
        }else{
            return [];
        }
    }

    getProductById = (idProduct) => {
        if(fs.existsSync(this.path)){
            const contenido =  fs.readFileSync(this.path, 'utf-8');
            const products = JSON.parse(contenido)

            const product = products.find((product) => {
                return product.id == idProduct
            })

            if(!product){
                return null
            }

            return product;

        }else{
            return "No se encontro el archivo";
        }
    }

    deleteProductById = (idProduct) => {
        if(fs.existsSync(this.path)){

            const contenido =  fs.readFileSync(this.path, 'utf-8');
            const products = JSON.parse(contenido)

            //Validar que exista
            const product = products.find((product) => {
                return product.id == idProduct
            })
    
            if(!product){
                return null;
            }

            const newProducts = products.filter((product) => {
                return product.id != idProduct
            })

            fs.writeFileSync(this.path, JSON.stringify(newProducts));

            return newProducts;

        }else{
            return "No se encontro el archivo";
        }
    }
}

export default ProductManager;