import {Request, Response} from "express"
import * as productsService from "../services/product-service";

export const getAllProduct = async (req: Request, res: Response) => {
    const data = await productsService.getProductsService();
    
    res.status(200).send(data);
};

export const getProductById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const data = await productsService.getProductByIdService(id);
    
    res.status(200).send(data);
};

export const getProductByName = async (req: Request, res: Response) => {
    const name = req.params.name;
    const data = await productsService.getProductByNameService(name);
    
    res.status(200).send(data);
};

export const postProduct = async (req: Request, res: Response) => {
    const bodyValue = req.body;
    const data = await productsService.createProductService(bodyValue);
    
    res.status(200).send(data);
};

export const updateProduct = async (req: Request, res: Response) => {
    const bodyValue = parseFloat(req.body.new_price);
    const id = parseInt(req.params.id);
    const data = await productsService.updateProductService(id,bodyValue);
    
    res.status(200).send(data);
};

export const deleteProduct = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const data = await productsService.deleteProductService(id);
    
    res.status(200).send(data);
};

