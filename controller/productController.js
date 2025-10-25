import { isAdmin } from '../controller/userController.js'; // isAdmin function එක ආනයනය කරනවා.
import Product from '../models/product.js';

export function createProduct(req, res) {

    if (!isAdmin(req)) {
        res.json({
            message: "please login as administor to create product"
        });
        return;
    }

    const product = new Product(req.body); // <-- මෙතනදී req.body යවන්න ඕන.

    product.save().then(
        () => {
            res.json({
                message: "Product Created", // සාර්ථක පණිවිඩයක් JSON ආකාරයෙන් යවනවා.
            });
        }
    ).catch((err) => {
        res.status(500).json({
            error: err // දෝෂයක් ඇතිවුවහොත් එය JSON ආකාරයෙන් යවනවා.
        });
    });
}

export function getProduct(req, res) {
    Product.find().then((productList) => {
        res.json(
             productList // productList එක JSON ආකාරයෙන් පිළිතුර යවනවා.
        );
    });
}



export function deleteProduct(req, res) {
  if (!isAdmin(req)) {
    return res.status(403).json({
      message: "Please login as administrator to delete product"
    });
  }

  const productId = req.params.productId;

  Product.deleteOne({ productId: productId }).then(()=>(
    res.status(200).json({
      message: "Product deleted successfully"
    })
  )).catch((err) => {
    res.status(500).json({
      error: err
    });
  }).catch((err) => {
    res.status(500).json({
      error: err, message: "somthing connection failure"
    });
  })
    

    
  }
  
   








