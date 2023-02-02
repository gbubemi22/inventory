const express = require('express')
const router = express.Router()




const {
   create,
   findAll,
   findOne,
   update,
   deleteProduct,
   deleteAll
 } = require('../controllers/productController')


router
.route('/')
.post(create)
.get(findAll)
.delete(deleteAll)


router
.route('/:id')
.get(findOne)
.put(update)
.delete(deleteProduct);




module.exports = router;