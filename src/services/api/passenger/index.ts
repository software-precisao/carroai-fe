import { AxiosResponse } from "axios";
import { http } from "../../config";

// Interfaces para os dados esperados
// interface GetAllDrivers {
//   email: string;
//   password: string;
// }

export default {
  getAllPassaegers: async (): Promise<AxiosResponse | string> => {
    try {
      const response = await http.get(`/users/passengers`, {
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
};
