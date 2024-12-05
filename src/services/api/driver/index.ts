import { AxiosResponse } from "axios";
import { http } from "../../config";

// Interfaces para os dados esperados
interface UpdateActiveatdUser {
  activated: boolean;
}

export default {
  getAllDrivers: async (): Promise<AxiosResponse | string> => {
    try {
      const response = await http.get(`/users/drivers`, {
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

  updateActiveatdUser: async (
    id: string,
    data: UpdateActiveatdUser
  ): Promise<AxiosResponse | string> => {
    try {
      const response = await http.put(`/users/edit/${id}`, data, {
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
