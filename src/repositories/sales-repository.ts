import { client } from "../db";
import { SaleModel, ItemSalePayload, ItemSaleModel, ProductDetailModel } from "../models/models";

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

export const findAllItemSales = async (): Promise<ItemSaleModel[]> => {
    const result = await client.query(`
        SELECT 
        id_item_venda AS item_sale_id,
        quantidade AS quantity,
        id_venda AS sale_id,
        id_produto AS product_id
        FROM item_venda
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
        new Date().toISOString(),
        saleData.customer_id
    ]);

    const idDaNovaVenda: number = vendaResultante.rows[0].id_venda;
    let valorTotalVenda = 0;

    for (const item of items) {
        const productResult = await client.query<ProductDetailModel>(`
            SELECT preco_venda, quantidade_estoque
            FROM produto
            WHERE id_produto = $1;
        `, [item.product_id]);

        if (productResult.rows.length === 0) {
            throw new Error(`Produto com ID ${item.product_id} não encontrado.`);
        }
        
        const product = productResult.rows[0];
        const precoVenda = product.preco_venda;
        
        if (product.quantidade_estoque < item.quantity) {
             throw new Error(`Estoque insuficiente para o produto ID ${item.product_id}.`);
        }

        await client.query(`
            INSERT INTO item_venda (id_venda, id_produto, quantidade)
            VALUES ($1, $2, $3);
        `, [
            idDaNovaVenda,
            item.product_id,
            item.quantity
        ]);

        await client.query(`
            UPDATE produto
            SET quantidade_estoque = quantidade_estoque - $2
            WHERE id_produto = $1;
        `, [
            item.product_id,
            item.quantity
        ]);

        valorTotalVenda += parseFloat(precoVenda.toString()) * item.quantity;
    }

    await client.query(`
        INSERT INTO pagamento (id_venda, id_metodo, valor_pago)
        VALUES ($1, $2, $3);
    `, [
        idDaNovaVenda,
        method_id,
        valorTotalVenda
    ]);
    
    return idDaNovaVenda;
};
