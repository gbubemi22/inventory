const sql = require("./index");

// constructor
class Product {
   constructor(product) {
      this.product_name = product.product_name;
      this.product_line = product.product_line;
      this.unit_price = product.unit_price;
      this.pack_price = product.pack_price;
      this.batchId = product.batchId;
      this.pack = product.pack;
   }
   static create(newProduct, result) {
      sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("created product: ", { id: res.insertId, ...newProduct });
         result(null, { id: res.insertId, ...newProduct });
      });
   }
   static findOne(id, result) {
      sql.query(`SELECT * FROM products WHERE id = ${id}`, (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found product: ", res[0]);
            result(null, res[0]);
            return;
         }

         // not found Product with the id
         result({ kind: "not_found" }, null);
      });
   }
   static getAll(product_name, result) {
      let query = "SELECT * FROM product";

      if (product_name) {
         query += ` WHERE product_name LIKE '%${product_name}%'`;
      }

      sql.query(query, (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("products: ", res);
         result(null, res);
      });
   }
   static updateById(id, product, result) {
      sql.query(
         "UPDATE products SET product_name = ?, product_line = ?, unit_price = ? ,pack_price = ? , batchId = ? , pack = ? WHERE id = ?",
         [
            product.product_name,
            product.product_line,
            product.unit_price,
            product.pack_price,
            product.batchId,
            product.pack,
            id
         ],
         (err, res) => {
            if (err) {
               console.log("error: ", err);
               result(null, err);
               return;
            }

            if (res.affectedRows == 0) {
               // not found Tutorial with the id
               result({ kind: "not_found" }, null);
               return;
            }

            console.log("updated product: ", { id: id, ...product });
            result(null, { id: id, ...product });
         }
      );
   }
   static remove(id, result) {
      sql.query("DELETE FROM products WHERE id = ?", id, (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         if (res.affectedRows == 0) {
            // not found Product with the id
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("deleted product with id: ", id);
         result(null, res);
      });

   }
}

module.exports = Product;



 
