import axios from "axios";

const API_BASE = "https://kaviar-backend.onrender.com/api/driver";

/**
 * Buscar perfil do motorista autenticado
 */
export async function getDriverProfile(token) {
  try {
    const response = await axios.get(`${API_BASE}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      data: response.data,
    };

  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.error ||
        "Erro ao buscar o perfil do motorista.",
    };
  }
}

/**
 * Atualizar informações do motorista
 * Campos aceitos: name, carModel, carPlate
 */
export async function updateDriverProfile(token, updateData) {
  try {
    const response = await axios.patch(`${API_BASE}/profile`, updateData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Perfil atualizado com sucesso.",
      data: response.data,
    };

  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.error ||
        "Erro ao atualizar o perfil do motorista.",
    };
  }
}

/**
 * Atualizar localização atual do motorista (GPS)
 * Exemplo:
 * updateDriverLocation(token, -22.9711, -43.1822)
 */
export async function updateDriverLocation(token, latitude, longitude) {
  try {
    const response = await axios.patch(
      `${API_BASE}/location`,
      { latitude, longitude },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Localização atualizada.",
      data: response.data,
    };

  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.error ||
        "Erro ao atualizar localização.",
    };
  }
}
