import {Request, Response} from "express"
import * as CustomersService from "../services/customer-service";

export const getAllCustomer = async (req: Request, res: Response) => {
    const data = await CustomersService.getCustomersService();
    
    res.status(200).send(data);
};

export const getCustomerById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const data = await CustomersService.getCustomerByIdService(id);
    
    res.status(200).send(data);
};

export const getCustomerByName = async (req: Request, res: Response) => {
    const name = req.params.name;
    const data = await CustomersService.getCustomerByNameService(name);
    
    res.status(200).send(data);
};

export const postCustomer = async (req: Request, res: Response) => {
    const bodyValue = req.body;
    const data = await CustomersService.createCustomerService(bodyValue);
    
    res.status(200).send(data);
};

export const updateCustomer = async (req: Request, res: Response) => {
    const bodyValue = req.body.new_phone;
    const id = parseInt(req.params.id);
    const data = await CustomersService.updateCustomerService(id,bodyValue);
    
    res.status(200).send(data);
};

export const deleteCustomer = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const data = await CustomersService.deleteCustomerService(id);
    
    res.status(200).send(data);
};

