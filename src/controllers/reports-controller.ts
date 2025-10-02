import { Request, Response } from "express";
import * as reportService from "../services/report-service";

export const getProfitByPeriod = async (req: Request, res: Response) => {
    const { begin_date, final_date } = req.query;

    if (!begin_date || !final_date) {
        return res.status(400).send({ message: "As datas 'begin_date' e 'final_date' são obrigatórias." });
    }

    const data = await reportService.findProfitByPeriodService(begin_date as string, final_date as string);
    
    res.status(200).send(data);
};

export const getProfitByPeriodAndSupplier = async (req: Request, res: Response) => {
    const { begin_date, final_date, supplier_id } = req.query;

    if (!begin_date || !final_date || !supplier_id) {
        return res.status(400).send({ message: "As datas e o 'supplier_id' são obrigatórios." });
    }

    const supplierIdNum = parseInt(supplier_id as string);
    if (isNaN(supplierIdNum)) {
        return res.status(400).send({ message: "'supplier_id' deve ser um número." });
    }

    const data = await reportService.findProfitByPeriodAndSupplierService(begin_date as string, final_date as string, supplierIdNum);
    
    res.status(200).send(data);
};

export const getProfitByProduct = async (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);

    if (isNaN(productId)) {
        return res.status(400).send({ message: "O 'id' do produto deve ser um número." });
    }

    const data = await reportService.findProfitByProductService(productId);
    
    res.status(200).send(data);
};

export const getMostUsedMethod = async (req: Request, res: Response) => {
    const data = await reportService.findMostUsedMethodService();
    
    res.status(200).send(data);
};

export const getCustomerWithMostPurchases = async (req: Request, res: Response) => {
    const data = await reportService.findCustomerWithMostPurchasesService();
    
    res.status(200).send(data);
};

export const getProductsBoughtByCustomer = async (req: Request, res: Response) => {
    const customerId = parseInt(req.params.id);

    if (isNaN(customerId)) {
        return res.status(400).send({ message: "O 'id' do cliente deve ser um número." });
    }

    const data = await reportService.ProductsBoughtByCustomerService(customerId);
    
    res.status(200).send(data);
};

export const getCustomersWhoBoughtProduct = async (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);

    if (isNaN(productId)) {
        return res.status(400).send({ message: "O 'id' do produto deve ser um número." });
    }

    const data = await reportService.CustomersWhoBoughtProductService(productId);
    
    res.status(200).send(data);
};