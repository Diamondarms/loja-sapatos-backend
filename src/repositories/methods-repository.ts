import { client } from "../db";
import { MethodModel } from "../models/models";

export const findAllMethods = async (): Promise<MethodModel[]> => {
    const result = await client.query(`
        SELECT 
        id_metodo AS method_id,
        nome AS name
        FROM metodo
    `);

    return result.rows;
}