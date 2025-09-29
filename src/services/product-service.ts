import { ProductModel } from "../models/models";
import * as productsRepository from "../repositories/products-repository";

export const getProductsService = async () => {
    const data = await productsRepository.findAllProducts();

    return data;
}

export const getProductByIdService = async (id : number) => {
    const data = await productsRepository.findProductById(id);

    return data;
}

export const getProductByNameService = async (name : string) => {
    const data = await productsRepository.findProductByName(name);

    return data;
}

export const createProductService = async (product : ProductModel) => {
    const data = await productsRepository.createProduct(product);

    return data;
}

export const updateProductService = async (id : number, new_price : number) => {
    const data = await productsRepository.updateProduct(id,new_price);

    return data;
}

export const deleteProductService = async (id : number) => {
    const data = await productsRepository.deleteProduct(id);

    return data;
}