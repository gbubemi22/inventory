const { StatusCodes } = require("http-status-codes");
const Product = require("../models/ProductModel");

// Create and Save a new Tutorial
const create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Product
  const product = new Product({
    

     product_name :req.body.product_name,
       product_line :req.body.product_line,
       unit_price : req.body.unit_price,
    
       pack_price: req.body.pack_price,
      batchId : req.body.batchId,
       pack :req.body.pack,
  });

  // Save Tutorial in the database
  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    else res.status(StatusCodes.CONFLICT).json(data);
  });
};


// Retrieve all Product from the database (with condition).
const findAll = (req, res) => {
     const product_name = req.query.product_name;
   
     Product.getAll(product_name, (err, data) => {
       if (err)
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
           message:
             err.message || "Some error occurred while retrieving products."
         });
       else res.status(StatusCodes.OK).json(data);
     });
   };
   
   // Find a single Product by Id
   const findOne = (req, res) => {
     Product.findOne(req.params.id, (err, data) => {
       if (err) {
         if (err.kind === "not_found") {
           res.status(404).send({
             message: `Not found Product with id ${req.params.id}.`
           });
         } else {
           res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
             message: "Error retrieving Product with id " + req.params.id
           });
         }
       } else res.status(StatusCodes.OK).json(data);
     });
   };

   // Update a Product identified by the id in the request
const update = (req, res) => {
     // Validate Request
     if (!req.body) {
       res.status(StatusCodes.BAD_REQUEST).json({
         message: "Content can not be empty!"
       });
     }
   
     console.log(req.body);
   
     Product.updateById(
       req.params.id,
       new Product(req.body),
       (err, data) => {
         if (err) {
           if (err.kind === "not_found") {
             res.status(StatusCodes.BAD_REQUEST).json({
               message: `Not found Product with id ${req.params.id}.`
             });
           } else {
             res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
               message: "Error updating Product with id " + req.params.id
             });
           }
         } else res.status(StatusCodes.OK).json(data);
       }
     );
   };
   
   // Delete a Product with the specified id in the request
   const deleteProduct = (req, res) => {
     Product.remove(req.params.id, (err, data) => {
       if (err) {
         if (err.kind === "not_found") {
           res.status(404).send({
             message: `Not found Product with id ${req.params.id}.`
           });
         } else {
           res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
             message: "Could not delete Product with id " + req.params.id
           });
         }
       } else res.status(StatusCodes.OK).json({ message: `Product was deleted successfully!` });
     });
   };
   
   // Delete all Product from the database.
   const deleteAll = (req, res) => {
     Product.removeAll((err, data) => {
       if (err)
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
           message:
             err.message || "Some error occurred while removing all product."
         });
       else res.status(StatusCodes.OK).json({ message: `All product were deleted successfully!` });
     });
   };

module.exports = {
     create,
     findAll,
     findOne,
     update,
     deleteProduct,
     deleteAll
};




