const express = require('express')
const router = express.Router()




const {
     addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct
 } = require('../controllers/productController')


router
.route('/')
.post(addProduct)
.get(getAllProducts)


router
.route('/:id')
.get(getOneProduct)
.put(updateProduct)
.delete(deleteProduct);




module.exports = router;