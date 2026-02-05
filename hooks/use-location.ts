import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

type UserLocation = {
  latitude: number;
  longitude: number;
  city: string | null;
  country: string | null;
};

export function useLocation() {
  const [loading, setLoading] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [location, setLocation] = useState<UserLocation | null>(null);

  useEffect(() => {
    (async () => {
      // 1️⃣ Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setPermissionGranted(false);
        setLoading(false);
        return;
      }

      setPermissionGranted(true);

      // 2️⃣ Get HIGH accuracy GPS (no cached city)
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });

      const { latitude, longitude } = position.coords;

      // 3️⃣ Reverse geocode via GOOGLE (lat/lng only)
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY}`
      );

      const json = await res.json();

      if (json.status !== 'OK') {
        console.log("ok" , json)
        
        setLocation({
          latitude,
          longitude,
          city: null,
          country: null,
        });
        setLoading(false);
        return;
      }else{
        console.log("api failed")
        
      }

      const components = json.results[0].address_components;

      const city =
        components.find((c: any) =>
          c.types.includes('locality')
        )?.long_name ||
        components.find((c: any) =>
          c.types.includes('administrative_area_level_2')
        )?.long_name ||
        null;

      const country =
        components.find((c: any) =>
          c.types.includes('country')
        )?.long_name || null;

      // 4️⃣ Final result
      setLocation({
        latitude,
        longitude,
        city,
        country,
      });

      setLoading(false);
    })();
  }, []);

  return {
    loading,
    permissionGranted,
    location,
  };
}
