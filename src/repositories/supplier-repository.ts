import { client } from "../db";
import { SupplierModel } from "../models/models";

export const findAllSuppliers = async (): Promise<SupplierModel[]> => {
    const result = await client.query(`
        SELECT 
        id_fornecedor AS supplier_id,
        nome AS name,
        cnpj,
        telefone AS phone
        FROM fornecedor
    `);

    return result.rows;
}

export const findSupplierById = async (id : number): Promise<SupplierModel[] | null> => {
    const result = await client.query(`
        SELECT 
        id_fornecedor AS supplier_id,
        nome AS name,
        cnpj,
        telefone AS phone
        FROM fornecedor
        WHERE id_fornecedor = $1
    `,[id]);

    return result.rows[0] || null;
}

export const createSupplier = async (supplier: SupplierModel): Promise<void> => {
  await client.query(`
    INSERT INTO fornecedor (
      id_fornecedor,
      nome,
      cnpj,
      telefone
    ) VALUES ($1, $2, $3, $4)
    `,[
      supplier.supplier_id,
      supplier.name,
      supplier.cnpj,
      supplier.phone
    ]);
};

export const deleteSupplier = async (id: number): Promise<void> => {
  await client.query( `
    DELETE FROM fornecedor
    WHERE id_fornecedor = $1
    `,[id]
  );
};
