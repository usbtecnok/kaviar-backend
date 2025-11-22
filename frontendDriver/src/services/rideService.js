import axios from "axios";

const API_BASE = "https://kaviar-backend.onrender.com/api/ride";

/**
 * Lista todas as corridas do motorista autenticado
 */
export async function getDriverRides(token) {
  try {
    const response = await axios.get(`${API_BASE}/driver`, {
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
        error?.response?.data?.message ||
        "Erro ao buscar corridas do motorista.",
    };
  }
}

/**
 * Aceitar uma corrida específica
 */
export async function acceptRide(rideId, token) {
  try {
    const response = await axios.patch(
      `${API_BASE}/${rideId}/accept`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Corrida aceita com sucesso!",
      data: response.data,
    };

  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.error ||
        "Não foi possível aceitar a corrida.",
    };
  }
}

/**
 * Atualizar o status da corrida (ex: "on_the_way", "completed")
 */
export async function updateRideStatus(rideId, status, token) {
  try {
    const response = await axios.patch(
      `${API_BASE}/${rideId}/status`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Status atualizado com sucesso.",
      data: response.data,
    };

  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.error ||
        "Erro ao atualizar status da corrida.",
    };
  }
}

/**
 * Cria uma corrida (apenas para testes)
 */
export async function createRide(data) {
  try {
    const response = await axios.post(`${API_BASE}`, data);

    return {
      success: true,
      data: response.data,
    };

  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.error ||
        "Erro ao criar corrida.",
    };
  }
}
