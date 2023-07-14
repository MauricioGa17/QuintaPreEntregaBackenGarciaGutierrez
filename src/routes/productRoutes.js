import { Router } from "express";
import uniqid from 'uniqid';

import ProductManager from '../helpers/ProductManager.js'

const router = Router();

router.get('/', (req, res) => {

    const limit = req.query.limit

    //Buscar Class BD
    const manager = new ProductManager('db.json')
    const products = manager.getAllProducts();

    if(limit){
        const productsLimit = products.slice(0, limit)

        return res.status(200).json({
            "statusCode": 200,
            "products": productsLimit
        })
    }

    return res.status(200).json({
        "statusCode": 200,
        "products": products
    });
});

router.get('/:idProduct', (req, res) => {

    const { idProduct } = req.params;

    const manager = new ProductManager('db.json')
    const product = manager.getProductById(idProduct);

    if(product == null){
        return res.status(404).json({
            "statusCode": 404,
            "message": 'Producto no encontrado',
        });
    }

    return res.status(200).json({
        "statusCode": 200,
        "product": product
    });
});

router.post('/', (req, res) => {

    const { title, descripcion, code, price, status, stock, category, thumbnails } = req.body;

    if(!title || !descripcion || !code || !price || !status || !stock || !category){
        return res.status(500).json({
            "statusCode": 500,
            "message": 'Todos los campos son obligatorios',
        });
    }

    //Guardar Class BD
    const manager = new ProductManager('db.json')
    manager.addNewProduct(title, descripcion, code, price, status, stock, category, thumbnails)
    
    const products = manager.getAllProducts();
    
    return res.status(200).json({
        "statusCode": 200,
        "message": 'Nuevo Producto agregado',
        "products": products
    });
});

router.put('/:idProduct', (req, res) => {

    const { idProduct } = req.params;
    const { title, descripcion, code, price, status, stock, category, thumbnails } = req.body;

    if(!title || !descripcion || !code || !price || !status || !stock || !category){
        return res.status(500).json({
            "statusCode": 500,
            "message": 'Todos los campos son obligatorios',
        });
    }

    //Guardar Class BD
    const manager = new ProductManager('db.json')
    const updateProduct = manager.updateProduct(idProduct, title, descripcion, code, price, status, stock, category, thumbnails)

    if(updateProduct == null){
        return res.status(404).json({
            "statusCode": 404,
            "message": 'Producto no encontrado',
        });
    }

    return res.status(200).json({
        "statusCode": 200,
        "message": 'Producto Actualizado',
        "product": updateProduct
    });
});

router.delete('/:idProduct', (req, res) => {

    const { idProduct } = req.params;

    if(idProduct == null){
        return res.status(404).json({
            "statusCode": 404,
            "message": 'Producto no encontrado para eliminar',
        });
    }

    //Guardar Class BD
    const manager = new ProductManager('db.json')
    const deleteProduct = manager.deleteProductById(idProduct)

    if(deleteProduct == null){
        return res.status(404).json({
            "statusCode": 404,
            "message": "Producto no encontrado para eliminar"
        });
    }

    return res.status(200).json({
        "statusCode": 200,
        "products": deleteProduct
    });
});


export default router;