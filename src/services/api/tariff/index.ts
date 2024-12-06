import { AxiosResponse } from "axios";
import { http } from "../../config";

// Interfaces para os dados esperados
interface CadastrarTarifa {
  day_type: string;
  base_fare: string | number;
  kilometer_rate: string | number;
  time_rate: string | number;
}

export default {
  getAllTarifas: async (): Promise<AxiosResponse | string> => {
    try {
      const response = await http.get(`/tariff/`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
      });
      return response;
    } catch (error: any) {
      console.error("Login error:", error);
      return error.response?.data || error.message || "Erro desconhecido";
    }
  },

  cadastrarTarifa: async (
    data: CadastrarTarifa
  ): Promise<AxiosResponse | string> => {
    try {
      const response = await http.post(`/tariff/new-tariffs`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT",
        },
      });
      return response;
    } catch (error: any) {
      console.error("Login error:", error);
      return error.response?.data || error.message || "Erro desconhecido";
    }
  },

  atualizarTarifa: async (
    id: string,
    data: CadastrarTarifa
  ): Promise<AxiosResponse | string> => {
    try {
      const response = await http.put(`/tariff/edit-tariffs/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT",
        },
      });
      return response;
    } catch (error: any) {
      console.error("Login error:", error);
      return error.response?.data || error.message || "Erro desconhecido";
    }
  },
};
