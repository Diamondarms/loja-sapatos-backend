import { client } from "../db";
import { SaleModel, ItemSalePayload } from "../models/models";

export const findAllSales = async (): Promise<SaleModel[]> => {
    const result = await client.query(`
        SELECT 
        id_venda AS sale_id,
        data_venda AS sale_date,
        id_cliente AS customer_id
        FROM venda
    `);

    return result.rows;
}

export const findSaleById = async (id: number): Promise<SaleModel | null> => {
    const result = await client.query(`
        SELECT 
        id_venda AS sale_id,
        data_venda AS sale_date,
        id_cliente AS customer_id
        FROM venda
        WHERE id_venda = $1
    `, [id]);

    return result.rows[0] || null;
}

export const createCompleteSale = async (
    saleData: Omit<SaleModel, 'sale_id'>,
    method_id: number,
    items: ItemSalePayload[]
): Promise<number> => {

    const vendaResultante = await client.query(`
        INSERT INTO venda (data_venda, id_cliente)
        VALUES ($1, $2)
        RETURNING id_venda;
    `, [
        saleData.sale_date,
        saleData.customer_id
    ]);

    const idDaNovaVenda: number = vendaResultante.rows[0].id_venda;

    for (const item of items) {
        await client.query(`
            INSERT INTO itemvenda (id_venda, id_produto, quantidade)
            VALUES ($1, $2, $3);
        `, [
            idDaNovaVenda,
            item.product_id,
            item.quantity
        ]);

        await client.query(`
            UPDATE estoque
            SET quantidade = quantidade - $2
            WHERE id_produto = $1;
        `, [
            item.product_id,
            item.quantity
        ]);
    }
    
    return idDaNovaVenda;
};
