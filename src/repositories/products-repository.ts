import { client } from "../db";
import { ProductModel } from "../models/models";

export const findAllProducts = async (): Promise<ProductModel[]> => {
    const result = await client.query(`
        SELECT 
        id_produto AS product_id,
        nome AS name,
        id_categoria AS category_id,
        tamanho AS size,
        quantidade_estoque AS stock,
        preco_venda AS sale_price,
        preco_compra AS purchase_price,
        id_fornecedor AS supplier_id
        FROM produto
    `);

    return result.rows;
}

export const findProductById = async (id : number): Promise<ProductModel[] | null> => {
    const result = await client.query(`
        SELECT 
        id_produto AS product_id,
        nome AS name,
        id_categoria AS category_id,
        tamanho AS size,
        quantidade_estoque AS stock,
        preco_venda AS sale_price,
        preco_compra AS purchase_price,
        id_fornecedor AS supplier_id
        FROM produto
        WHERE
        id_produto = $1
    `,[id]);

    return result.rows[0] || null;
}

export const findProductByName = async (name : string): Promise<ProductModel[] | null> => {
    const result = await client.query(`
        SELECT 
        id_produto AS product_id,
        nome AS name,
        id_categoria AS category_id,
        tamanho AS size,
        quantidade_estoque AS stock,
        preco_venda AS sale_price,
        preco_compra AS purchase_price,
        id_fornecedor AS supplier_id
        FROM produto
        WHERE
        nome = $1
    `,[name]);
    
    return result.rows[0] || null;
}

export const createProduct = async (product: ProductModel): Promise<void> => {
  await client.query(`
    INSERT INTO produto (
      nome,
      tamanho,
      quantidade_estoque,
      preco_compra,
      preco_venda,
      id_fornecedor,
      id_categoria
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,[
      product.name,
      product.size,
      product.stock,
      product.purchase_price,
      product.sale_price,
      product.supplier_id,
      product.category_id,
    ]);
};

export const updateProduct = async (id: number, new_stock: number): Promise<void> => {
  await client.query(`
    UPDATE produto
    SET quantidade_estoque = $1
    WHERE id_produto = $2
    `,[new_stock, id]
  );
};

export const deleteProduct = async (id: number): Promise<void> => {
  await client.query( `
    DELETE FROM produto
    WHERE id_produto = $1
    `,[id]
  );
};
