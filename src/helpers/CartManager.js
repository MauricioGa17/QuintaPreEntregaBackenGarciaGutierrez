import fs from 'fs'
import uniqid from 'uniqid';

class CartManager {
    constructor(path) {
        this.path = path
    }

    addNewCart = ( products ) => {

        if(products.length == 0){
            return null;
        }

        const productList = [];

        for (let i = 0; i < products.length; i++) {
            const product = {
                "product": products[i]
            }
            productList.push(product)
        }

        const newCart = {
            id: uniqid(),
            products: productList
        }

        if(fs.existsSync(this.path)){
            const contenido = fs.readFileSync(this.path, 'utf-8')
            const cart = JSON.parse(contenido)

            cart.push(newCart)

            fs.writeFileSync(this.path, JSON.stringify(cart));

            return newCart;
        }else{
            //Escribir archivo
            const cart = [];

            cart.push(newCart)

            fs.writeFileSync(this.path, JSON.stringify(cart));

            return newCart;
        }
    }

    cartAddProduct = (idCart, idProduct, quantity) => {

        //Buscar el cart
        if(fs.existsSync(this.path)){
            const contenido =  fs.readFileSync(this.path, 'utf-8');
            const carrito = JSON.parse(contenido)

            const cart = carrito.find((cart) => {
                return cart.id == idCart
            })

            if(cart == null){
                return 'No se encontro el carrito'
            }


            //Buscar si ya existe
            const existeProduct = cart.products.find(product => {
                return product.product = idProduct;
            })

            const newProduct = {
                "product" : idProduct,
                "quantity": parseInt(quantity)
            }

            cart.products.push(newProduct);

            //Actualizar Dato
            const newCart = carrito.filter((cart) => {
                return cart.id != idCart
            })

            newCart.push(cart);

            fs.writeFileSync(this.path, JSON.stringify(newCart));

            return newCart

        }else{
            return "No se encontro el archivo";
        }
    }

    getProducts = (idCart) => {
        if(fs.existsSync(this.path)){
            const contenido =  fs.readFileSync(this.path, 'utf-8');
            const carrito = JSON.parse(contenido)

            const cart = carrito.find((cart) => {
                return cart.id == idCart
            })

            if(cart == null){
                return null
            }
            return cart;
        }else{
            return null;
        }
    }

}

export default CartManager;