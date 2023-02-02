const Product = require("../models/ProductModel");
const { StatusCodes } = require("http-status-codes");


const addProduct = async (req, res) => {
     // const product_name = req.body.product_name;
     // const product_line = req.body.product_line;
     // const unit_price = req.body.unit_price;
    
     // const pack_price = req.body.pack_price;
     // const batchId = req.body.batchId;
     // const pack = req.body.pack;

     const { 
          product_name,
           product_line,
            unit_price,
             pack_price, 
             batchId, 
             pack
          } = req.body;
     const product =  Product.create({
         product_name,
         product_line,
         unit_price,
     
         pack_price,
         batchId,
         pack

     })

    // product = await product.save();


     res.status(StatusCodes.CREATED).json({
          message: "Product added successfully",
          product : product
     })
}

const getAllProducts = async (req, res) => {
     const products = await Product.findAll({
         
     })
          
     
    console.log(products)
     res.status(StatusCodes.OK).json({
          count:products.length,
          message: "Products fetched successfully",
          products
     })
}

const getOneProduct = async (req, res) => {
     const id = req.params;

     const product = await Product.findOne({
          where : {id:id}   
     })

      if (product === null ) {
          return res.status(StatusCodes.NOT_FOUND).json({
               message: "Product not found"
          });
      }
     res.status(StatusCodes.OK).json({
          message: "Product fetched successfully",
          product
     })
}


const updateProduct = async (req, res) => {
     
     const product_name = req.body.product_name;
     const product_line = req.body.product_line;
     const unit_price = req.body.unit_price;
     //const quantity = req.body.quantity;
     const pack_price = req.body.pack_price;
     const batchId = req.body.batchId;
     const pack = req.body.pack;

     const productId = req.params;

     const product = await Product.findByIdAndUpdate(productId, {
          product_name,
          product_line,
          unit_price,
        //  quantity,
          pack_price,
          batchId,
          pack
          }, {
              new: true
          });
          if (!product) {
               return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Product not found"
               });
          

          }
          res.status(StatusCodes.OK).json({
               message: "Product updated successfully",
          })
}

const deleteProduct = async (req, res) => {
     const productId = req.params;

     const product = await Product.destroy(productId);
      if (!product) {
          return res.status(StatusCodes.NOT_FOUND).json({
               message: "Product not found"
          });
      }
      res.status(StatusCodes.OK).json({
          message: "Product deleted successfully",
      })
}


module.exports =  {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct
}