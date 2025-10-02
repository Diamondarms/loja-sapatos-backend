import { client } from "../db";
import { ProductModel } from "../models/models";

export const findProfitByPeriod = async (begin_date: string, final_date: string): Promise<ProductModel[] | null> => {
    const result = await client.query(`
        SELECT COALESCE(SUM(itv.quantidade * prod.preco_venda), 0) AS profit
        FROM venda ven
        JOIN item_venda itv ON ven.id_venda = itv.id_venda
        JOIN produto prod ON itv.id_produto = prod.id_produto
        WHERE ven.data_venda
        BETWEEN TO_DATE($1,'DD/MM/YYYY')
        AND TO_DATE($2,'DD/MM/YYYY')
    `, [begin_date, final_date]);
    return result.rows[0] || null;
}

export const findProfitByPeriodAndSupplier = async (begin_date: string, final_date: string, supplier_id: number): Promise<ProductModel[] | null> => {
    const result = await client.query(`
        SELECT COALESCE(SUM(itv.quantidade * prod.preco_venda), 0) AS profit
        FROM venda ven
        JOIN item_venda itv ON ven.id_venda = itv.id_venda
        JOIN produto prod ON itv.id_produto = prod.id_produto
        WHERE ven.data_venda
        BETWEEN TO_DATE($1,'DD/MM/YYYY')
        AND TO_DATE($2,'DD/MM/YYYY')
        AND prod.id_fornecedor = $3
    `, [begin_date, final_date, supplier_id]);
    return result.rows[0] || null;
}

export const findProfitByProduct = async (product_id: number): Promise<ProductModel[] | null> => {
    const result = await client.query(`
      SELECT COALESCE(SUM(itv.quantidade * prod.preco_venda), 0) AS profit
      FROM venda ven
      JOIN item_venda itv ON ven.id_venda = itv.id_venda
      JOIN produto prod ON itv.id_produto = prod.id_produto
      WHERE prod.id_produto = $1
    `, [product_id]);
    return result.rows[0] || null;
}

export const findMostUsedMethod = async (): Promise<ProductModel[] | null> => {
    const result = await client.query(`
        select pag.id_metodo as method_id, met.nome as method_name, count(pag.id_metodo) as method_count
        from pagamento pag
        join metodo met ON pag.id_metodo = met.id_metodo
        group by 1, 2
        order by 3 DESC LIMIT 1
    `);
    return result.rows[0] || null;
}

export const findCustomerWithMostPurchases = async (): Promise<ProductModel[] | null> => {
    const result = await client.query(`
        select cli.id_cliente as customer_id, cli.nome as customer_name, count(ven.id_venda) as customer_purchase_count
        from cliente cli
        join venda ven ON cli.id_cliente = ven.id_cliente
        group by 1, 2
        order by 3 DESC LIMIT 1
    `);
    return result.rows[0] || null;
}

export const ProductsBoughtByCustomer = async (customer_id: number): Promise<ProductModel[] | null> => {
    const result = await client.query(`
        select cli.id_cliente as customer_id, cli.nome as customer_name, pro.nome as product_name
        from cliente cli
        join venda ven ON cli.id_cliente = ven.id_cliente
        join item_venda itv ON ven.id_venda = itv.id_venda
        join produto pro ON itv.id_produto = pro.id_produto
        where cli.id_cliente = $1
    `, [customer_id]);
    return result.rows[0] || null;
}

export const CustomersWhoBoughtProduct = async (product_id: number): Promise<ProductModel[] | null> => {
    const result = await client.query(`
        select cli.id_cliente as customer_id, pro.nome as product_name, cli.nome as customer_name
        from cliente cli
        join venda ven ON cli.id_cliente = ven.id_cliente
        join item_venda itv ON ven.id_venda = itv.id_venda
        join produto pro ON itv.id_produto = pro.id_produto
        where pro.id_produto = $1
    `, [product_id]);
    return result.rows[0] || null;
}