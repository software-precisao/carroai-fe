import { AxiosResponse } from "axios";
import { http } from "../../config";

// Interfaces para os dados esperados
interface LoginData {
  email: string;
  password: string;
}

interface VerificarEmailData {
  email: string;
}

interface VerificarCodeData {
  code: string;
  user_id: string;
}

interface VerificarTokenData {
  id: string;
}

interface ediSenhaData {
  password: string;
}

interface CadastroData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}

// interface FormData {
//   [key: string]: any; // Para representar dados dinâmicos no formulário
// }

export default {
  login: async (data: LoginData): Promise<AxiosResponse | string> => {
    try {
      const response = await http.post(`/auth/login`, data, {
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

  cadastroAdmin: async (
    data: CadastroData
  ): Promise<AxiosResponse | string> => {
    try {
      const response = await http.post("/users/create-admin", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
      });
      return response;
    } catch (error: any) {
      console.error("Cadastro error:", error);
      throw error.response?.data || error.message || "Erro desconhecido";
    }
  },

  verificarEmail: async (
    data: VerificarEmailData
  ): Promise<AxiosResponse | string> => {
    try {
      const response = await http.post("/auth/redefinir-email", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
      });
      return response;
    } catch (error: any) {
      console.error("Cadastro error:", error);
      throw error.response?.data || error.message || "Erro desconhecido";
    }
  },

  verificarCode: async (
    data: VerificarCodeData
  ): Promise<AxiosResponse | string> => {
    try {
      const response = await http.post("/users/verify-code", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
      });
      return response;
    } catch (error: any) {
      console.error("Cadastro error:", error);
      throw error.response?.data || error.message || "Erro desconhecido";
    }
  },

  verificarToken: async (
    data: VerificarTokenData
  ): Promise<AxiosResponse | string> => {
    try {
      const response = await http.get("/auth/verify-token", {
        params: { id: data.id },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
      });
      return response;
    } catch (error: any) {
      console.error("Cadastro error:", error);
      throw error.response?.data || error.message || "Erro desconhecido";
    }
  },

  editSenha: async (
    data: ediSenhaData,
    id: string
  ): Promise<AxiosResponse | string> => {
    try {
      const response = await http.put(`/auth/edit/senha/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT",
        },
      });
      return response;
    } catch (error: any) {
      console.error("Cadastro error:", error);
      throw error.response?.data || error.message || "Erro desconhecido";
    }
  },
};
