import * as Location from "expo-location";

export async function startLocationStream(callback: (coords: any) => void) {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        alert("Permissão de localização negada");
        return;
    }

    await Location.watchPositionAsync(
        {
            accuracy: Location.Accuracy.High,
            timeInterval: 3000, // envia localização a cada 3 segundos
            distanceInterval: 2, // envia a cada 2 metros
        },
        (loc) => {
            callback(loc.coords);
        }
    );
}
