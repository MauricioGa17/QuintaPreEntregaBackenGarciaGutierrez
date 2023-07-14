import { Router } from "express";
import uniqid from 'uniqid';

import CartManager from '../helpers/CartManager.js'

const router = Router();

router.post('/', (req, res) => {

    const { products } = req.body;

    if(!products){
        return res.status(500).json({
            "statusCode": 500,
            "message": 'Se debe de agregar minimo un producto',
        });
    }

    const cart = new CartManager('cart.json');
    const newCart = cart.addNewCart(products);

    return res.status(200).json({
        "statusCode": 200,
        "message": 'Productos Agregados',
        "cart": newCart
    });
});

router.post('/:idCart/product/:idProduct', (req, res) => {

    const { idCart, idProduct } = req.params;
    const { quantity } = req.body;

    if(!quantity){
        return res.status(500).json({
            "statusCode": 500,
            "message" : "La cantidad es obligatoria",
        })
    }
    
    const cart = new CartManager('cart.json');
    const cartAddProduct = cart.cartAddProduct(idCart, idProduct, quantity);

    return res.status(200).json({
        "statusCode": 200,
        "response" : cartAddProduct,
    })

});

router.get('/:idCart', (req, res) => {

    const idCart = req.params.idCart

    const manager = new CartManager('cart.json');
    const productos = manager.getProducts(idCart);

    /*if(!productos){
        return res.status(500).json({
            "statusCode": 500,
            "message": "El carrito no se encontro"
        });
    }*/

    return res.status(200).json({
        "statusCode": 200,
        "cart": productos
    });
})



export default router;