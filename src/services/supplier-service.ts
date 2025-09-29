import { SupplierModel } from "../models/models";
import * as SuppliersRepository from "../repositories/supplier-repository";

export const getSuppliersService = async () => {
    const data = await SuppliersRepository.findAllSuppliers();

    return data;
}

export const getSupplierByIdService = async (id : number) => {
    const data = await SuppliersRepository.findSupplierById(id);

    return data;
}

export const createSupplierService = async (Supplier : SupplierModel) => {
    const data = await SuppliersRepository.createSupplier(Supplier);

    return data;
}

export const deleteSupplierService = async (id : number) => {
    const data = await SuppliersRepository.deleteSupplier(id);

    return data;
}