import { Router } from "express";
import * as ProductController from "./controllers/products-controller";
import * as SupplierController from "./controllers/suppliers-controller";
import * as CustomerController from "./controllers/customers-controller";
import * as SaleController from "./controllers/sales-controller";
import * as ReportController from "./controllers/reports-controller";
import * as CategoriesController from "./controllers/categories-controller";
import * as MethodsController from "./controllers/methods-controller";

const router = Router();

//Produtos
router.get("/Products", ProductController.getAllProduct);
router.get("/Products/id/:id", ProductController.getProductById);
router.get("/Products/name/:name", ProductController.getProductByName);
router.delete("/Products/:id", ProductController.deleteProduct);

// body with the entire ProductModel json
router.post("/Products", ProductController.postProduct);
// param id and quantity
router.patch("/Products/:id", ProductController.updateProduct);

//Fornecedores
// no params or body
router.get("/Suppliers", SupplierController.getAllSupplier);
router.get("/Suppliers/:id", SupplierController.getSupplierById);
router.delete("/Suppliers/:id", SupplierController.deleteSupplier);

// body with the entire SupplierModel json
router.post("/Suppliers", SupplierController.postSupplier);

//Cliente
// no params or body
router.get("/Customers", CustomerController.getAllCustomer);
router.get("/Customers/id/:id", CustomerController.getCustomerById);
router.get("/Customers/name/:name", CustomerController.getCustomerByName);
router.delete("/Customers/:id", CustomerController.deleteCustomer);

// body with the entire ProductModel json
router.post("/Customers", CustomerController.postCustomer);
// param id and new_phone
router.patch("/Customers/:id", CustomerController.updateCustomer);

//Vendas
// no params or body
router.get("/Sales", SaleController.getAllSale);
router.get("/ItemSales", SaleController.getAllItemSales);
router.get("/Sales/:id", SaleController.getSaleById);
//  saleData: Omit<SaleModel, 'sale_id'> items: ItemSalePayload[]
router.post("/Sales/", SaleController.createSaleController);

//Métodos
// no params or body
router.get("/Methods", MethodsController.getAllMethods);

//Categorias
// no params or body
router.get("/Categories", CategoriesController.getAllCategories);

//Relatórios

// /Reports/profit/period?begin_date=01/01/2024&final_date=31/01/2026
router.get("/Reports/profit/period", ReportController.getProfitByPeriod);
// /Reports/profit/supplier?begin_date=01/01/2024&final_date=31/01/2026&supplier_id=1
router.get("/Reports/profit/supplier", ReportController.getProfitByPeriodAndSupplier);
// /Reports/profit/product/1
router.get("/Reports/profit/product/:id", ReportController.getProfitByProduct);
// no param
router.get("/Reports/method/most-used", ReportController.getMostUsedMethod);
router.get("/Reports/customer/most-purchases", ReportController.getCustomerWithMostPurchases);
// only id
router.get("/Reports/customer-products/:id", ReportController.getProductsBoughtByCustomer);
router.get("/Reports/product-customers/:id", ReportController.getCustomersWhoBoughtProduct);

export default router;