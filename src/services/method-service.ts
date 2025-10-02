import * as MethodsRepository from "../repositories/methods-repository";

export const getMethodsService = async () => {
    const data = await MethodsRepository.findAllMethods();

    return data;
}