import { Router } from "express";
import * as ProductController from "./controllers/products-controller";
import * as SupplierController from "./controllers/suppliers-controller";

const router = Router();

//Produtos
router.get("/Products", ProductController.getAllProduct);
router.get("/Products/id/:id", ProductController.getProductById);
router.get("/Products/name/:name", ProductController.getProductByName);

router.post("/Products", ProductController.postProduct);
router.delete("/Products/:id", ProductController.deleteProduct);
router.patch("/Products/:id", ProductController.updateProduct);

//Fornecedores
router.get("/Suppliers", SupplierController.getAllSupplier);
router.get("/Suppliers/:id", SupplierController.getSupplierById);
router.post("/Suppliers", SupplierController.postSupplier);
router.delete("/Suppliers/:id", SupplierController.deleteSupplier);

export default router;