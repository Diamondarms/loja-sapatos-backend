import { client } from "../db";
import { CategoryModel } from "../models/models";

export const findAllCategories = async (): Promise<CategoryModel[]> => {
    const result = await client.query(`
        SELECT 
        id_categoria AS category_id,
        nome AS name
        FROM categoria
    `);

    return result.rows;
}