import express from 'express'
const router = express.Router();
import {getProducts,addProduct, deleteProduct, updateProduct, getProduct, stats} from "../controllers/productController.js"
import {upload} from "../middleware/multer.js"

router.get("/",getProducts)
router.get("/stats",stats)
router.post("/",upload.single("image"),addProduct)
router.delete("/delete/:id",deleteProduct)
router.put("/update/:id",upload.single("image"),updateProduct)
router.get("/:id",getProduct)

export default router