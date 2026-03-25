import api from "./api";

export async function askProductQuestion(productId, question) {
    try {
        const response = await api.post(`api/Products/${productId}/ask`, { question });
        console.log('Question asked successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error asking question:', error);
        throw error;
    }
}