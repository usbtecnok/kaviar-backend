import { useEffect, useState } from "react";
import * as Location from "expo-location";
import api from "../services/api";

export default function useLocationTrack(driverId, active) {
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let watcher = null;

    async function startTracking() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão negada");
        return;
      }

      watcher = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 3000,
          distanceInterval: 5,
        },
        async (loc) => {
          if (active) {
            await api.post("/driver/update-location", {
              driverId,
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            });
          }
        }
      );
    }

    if (active) startTracking();

    return () => {
      if (watcher) watcher.remove();
    };
  }, [active]);

  return errorMsg;
}
