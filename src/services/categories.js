import api from "./api";

export async function fetchCategories() {
    try {
        const response = await api.get('api/Categories');
        console.log('Categories fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }

}