import axios from 'axios';

export async function requestCepDetails(cep: string): Promise<any> {
    try {
        const response = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar detalhes do CEP:", error);
        throw new Error("Erro ao buscar detalhes do CEP");
    }
}
