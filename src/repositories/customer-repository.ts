import { client } from "../db";
import { CustomerModel } from "../models/models";

export const findAllCustomers = async (): Promise<CustomerModel[]> => {
  const result = await client.query(`
    SELECT 
      id_cliente AS customer_id,
      nome AS name,
      cpf,
      telefone AS phone,
      cep
    FROM cliente
  `);

  return result.rows;
};

export const findCustomerById = async (id: number): Promise<CustomerModel | null> => {
  const result = await client.query(`
    SELECT 
      id_cliente AS customer_id,
      nome AS name,
      cpf,
      telefone AS phone,
      cep
    FROM cliente
    WHERE id_cliente = $1
  `, [id]);

  return result.rows[0] || null;
};

export const findCustomerByName = async (name: string): Promise<CustomerModel | null> => {
  const result = await client.query(`
    SELECT 
      id_cliente AS customer_id,
      nome AS name,
      cpf,
      telefone AS phone,
      cep
    FROM cliente
    WHERE nome = $1
  `, [name]);

  return result.rows[0] || null;
};

export const createCustomer = async (customer: CustomerModel): Promise<void> => {
  await client.query(`
    INSERT INTO cliente (
      id_cliente,
      nome,
      cpf,
      telefone,
      cep
    ) VALUES ($1, $2, $3, $4, $5)
  `, [
    customer.customer_id,
    customer.name,
    customer.cpf,
    customer.phone,
    customer.cep,
  ]);
};

export const updateCustomerPhone = async (id: number, newPhone: string): Promise<void> => {
  await client.query(`
    UPDATE cliente
    SET telefone = $1
    WHERE id_cliente = $2
  `, [newPhone, id]);
};

export const deleteCustomer = async (id: number): Promise<void> => {
  await client.query(`
    DELETE FROM cliente
    WHERE id_cliente = $1
  `, [id]);
};