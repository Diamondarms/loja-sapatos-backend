import { SaleModel, ItemSalePayload } from "../models/models";
import * as SalesRepository from "../repositories/sales-repository";

export const getSalesService = async () => {
    const data = await SalesRepository.findAllSales();

    return data;
}

export const getSaleByIdService = async (id : number) => {
    const data = await SalesRepository.findSaleById(id);

    return data;
}

export const createCompleteSaleService = async (
    saleData: Omit<SaleModel, 'sale_id'>,
    items: ItemSalePayload[]
): Promise<number> => {
    return SalesRepository.createCompleteSale(saleData, items);
};