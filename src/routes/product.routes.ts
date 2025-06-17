import { Router } from "express";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller";

const router = Router();

router.get("/", getProducts); 
router.post("/add-product", addProduct);
router.put("/update-product/:productId", updateProduct); 
router.put("/delete-product/:productId", deleteProduct);

export default router;