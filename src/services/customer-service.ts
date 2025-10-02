import { CustomerModel } from "../models/models";
import * as CustomersRepository from "../repositories/customers-repository";

export const getCustomersService = async () => {
    const data = await CustomersRepository.findAllCustomers();

    return data;
}

export const getCustomerByIdService = async (id : number) => {
    const data = await CustomersRepository.findCustomerById(id);

    return data;
}

export const getCustomerByNameService = async (name : string) => {
    const data = await CustomersRepository.findCustomerByName(name);

    return data;
}

export const createCustomerService = async (Customer : CustomerModel) => {
    const data = await CustomersRepository.createCustomer(Customer);

    return data;
}

export const updateCustomerService = async (id : number, new_phone : string) => {
    const data = await CustomersRepository.updateCustomerPhone(id,new_phone);

    return data;
}

export const deleteCustomerService = async (id : number) => {
    const data = await CustomersRepository.deleteCustomer(id);

    return data;
}