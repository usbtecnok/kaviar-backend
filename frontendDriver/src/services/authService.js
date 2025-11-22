import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://kaviar-backend.onrender.com";

// LOGIN DO MOTORISTA
export async function loginDriver(email, password) {
  try {
    const response = await fetch(`${API_URL}/api/driver/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.error || "Erro no login" };
    }

    await AsyncStorage.setItem("driver_token", data.token);
    await AsyncStorage.setItem("driver_data", JSON.stringify(data.driver));

    return { success: true, driver: data.driver };
  } catch (err) {
    return { success: false, message: "Erro de rede" };
  }
}

// LOGOUT DO MOTORISTA
export async function logoutDriver() {
  try {
    await AsyncStorage.removeItem("driver_token");
    await AsyncStorage.removeItem("driver_data");
    return { success: true };
  } catch (err) {
    return { success: false, message: "Erro ao limpar sessão" };
  }
}
