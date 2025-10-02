import {Request, Response} from "express"
import * as MethodsService from "../services/method-service";

export const getAllMethods = async (req: Request, res: Response) => {
    const data = await MethodsService.getMethodsService();
    
    res.status(200).send(data);
};