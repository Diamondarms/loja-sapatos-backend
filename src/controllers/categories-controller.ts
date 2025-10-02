import {Request, Response} from "express"
import * as CategoriesService from "../services/category-service";

export const getAllCategories = async (req: Request, res: Response) => {
    const data = await CategoriesService.getCategoriesService();
    
    res.status(200).send(data);
};