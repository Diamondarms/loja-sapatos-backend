import * as CategoriesRepository from "../repositories/categories-repository";

export const getCategoriesService = async () => {
    const data = await CategoriesRepository.findAllCategories();

    return data;
}