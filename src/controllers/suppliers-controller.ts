import {Request, Response} from "express"
import * as SuppliersService from "../services/supplier-service";

export const getAllSupplier = async (req: Request, res: Response) => {
    const data = await SuppliersService.getSuppliersService();
    
    res.status(200).send(data);
};

export const getSupplierById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const data = await SuppliersService.getSupplierByIdService(id);
    
    res.status(200).send(data);
};

export const postSupplier = async (req: Request, res: Response) => {
    const bodyValue = req.body;
    const data = await SuppliersService.createSupplierService(bodyValue);
    
    res.status(200).send(data);
};

export const deleteSupplier = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const data = await SuppliersService.deleteSupplierService(id);
    
    res.status(200).send(data);
};

