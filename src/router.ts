import { Router } from 'express'
import { body } from 'express-validator';
import handleInputErrors from './modules/middleware';
import { createProduct, deleteProduct, getAllProducts, getNumberProducts, getOneProduct, getProducts, updateProduct } from './handlers/product';

const router = Router();

// Product routes

router.get('/product_total', getNumberProducts)
router.get('/product', getAllProducts)
router.get('/product_person', getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct)
router.post('/product', body('name').isString(), handleInputErrors, createProduct)
router.delete('/product/:id', deleteProduct)

export default router;
