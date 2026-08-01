import axios from "axios";

export interface ValidationResponse {
    status: boolean;
    bank: string;
    nama: string;
    rekening: string;
    responseTime: number;
    error?: string;
    message?: string;
}

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function validateAccount(
  bankId: string,
  bankName: string,
  rekening: string
): Promise<ValidationResponse> {
  try {
    const { data } = await api.post<ValidationResponse>(
      "/cekrekening",
      {
        bankId,
        bankName,
        rekening,
      }
    );

    return data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data?.error ||
          "Server mengembalikan error."
      );
    }

    if (error.request) {
      throw new Error(
        "Backend tidak dapat dihubungi."
      );
    }

    throw new Error(error.message);
  }
}

export default api;