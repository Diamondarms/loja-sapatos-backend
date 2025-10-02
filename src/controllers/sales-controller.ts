import {Request, Response} from "express"
import * as SalesService from "../services/sale-service";

export const getAllSale = async (req: Request, res: Response) => {
    const data = await SalesService.getSalesService();
    
    res.status(200).send(data);
};

export const getAllItemSales = async (req: Request, res: Response) => {
    const data = await SalesService.getItemSalesService();
    
    res.status(200).send(data);
};

export const getSaleById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const data = await SalesService.getSaleByIdService(id);
    
    res.status(200).send(data);
};

export const createSaleController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { saleData, payment_method_id, items } = req.body;

        if (!saleData || !items || !items.length || !payment_method_id) {
            res.status(400).json({ message: 'Dados da venda, itens ou método de pagamento ausentes.' });
            return;
        }
        const idDaNovaVenda = await SalesService.createCompleteSaleService(saleData, items, payment_method_id);

        res.status(201).json({ 
            message: 'Venda criada com sucesso!',
            sale_id: idDaNovaVenda 
        });
    } catch (error) {
        console.error('Erro ao criar venda:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao processar a venda.' });
    }
};

