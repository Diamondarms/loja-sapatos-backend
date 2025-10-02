import { ProductModel } from "../models/models";
import * as reportsRepository from "../repositories/reports-repository"; 

export const findProfitByPeriodService = async (begin_date: string, final_date: string) => {
    const data = await reportsRepository.findProfitByPeriod(begin_date, final_date);
    return data;
}

export const findProfitByPeriodAndSupplierService = async (begin_date: string, final_date: string, supplier_id: number) => {
    const data = await reportsRepository.findProfitByPeriodAndSupplier(begin_date, final_date, supplier_id);
    return data;
}

export const findProfitByProductService = async (product_id: number) => {
    const data = await reportsRepository.findProfitByProduct(product_id);
    return data;
}

export const findMostUsedMethodService = async () => {
    const data = await reportsRepository.findMostUsedMethod();
    return data;
}

export const findCustomerWithMostPurchasesService = async () => {
    const data = await reportsRepository.findCustomerWithMostPurchases();
    return data;
}

export const ProductsBoughtByCustomerService = async (customer_id: number) => {
    const data = await reportsRepository.ProductsBoughtByCustomer(customer_id);
    return data;
}

export const CustomersWhoBoughtProductService = async (product_id: number) => {
    const data = await reportsRepository.CustomersWhoBoughtProduct(product_id);
    return data;
}