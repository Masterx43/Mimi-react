import axios from "axios";

const API_URL = "http://localhost:8085/api/auth";

export async function login(email: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error : any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, message: "Error de conexión" };
  }
}

export async function getProfile(token: string) {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
