import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { useLocation } from '@/hooks/use-location';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/ui/icon';
import { Search } from 'lucide-react-native';
export default function index() {
  const { loading, location } = useLocation();

  const [isTypingPlace, setIsTypingPlace] = useState(false);

  if (loading) {
    return <Text>loading</Text>;
  }

  const handleOnChangeText = async (e: string) => {
    if (!e || !e.trim()) {
      setIsTypingPlace(false);
    } else {
      setIsTypingPlace(true);
      const result = await sendPlaceApi(e);
      console.log(result)
      

    }
  };

  const sendPlaceApi = async (input: string) => {
    if (!input.trim()) return []; // ignore empty input

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          input
        )}&types=geocode&key=AIzaSyA4E38-I1WN53Oq2eyQNIcOGV-MScpXqME`
      );

      const data = await response.json();

      if (data.status !== 'OK') {
        console.log('Google Places API error:', data.status, data.error_message);
        return [];
      }

      // Return predictions
      return data.predictions.map((p: any) => ({
        placeId: p.place_id,
        description: p.description,
      }));
    } catch (err) {
      console.log('Places API fetch error:', err);
      return [];
    }
  };

  return (
    <View className="flex-1">
      <MapView
        provider="google"
        style={{ flex: 1, zIndex: 1 }}
        initialRegion={{
          latitude: location?.latitude || 0,
          longitude: location?.longitude || 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
      />
      <View
        style={{
          zIndex: 2,
          position: 'absolute',
          width: '100%',
          backgroundColor: 'red',
          bottom: 0,
        }}>
        <Text>show be up</Text>
      </View>
      <View style={{ zIndex: 2, position: 'absolute', width: '100%', top: 0 }} className="p-2">
        <View className="flex flex-row items-center">
          <Input placeholder="Where to go ?" onChangeText={handleOnChangeText} />
          <Icon as={Search} className="absolute right-5" size={20} />
        </View>
        {isTypingPlace && <ScrollView className="max-h-40 rounded-b-lg bg-white p-2"></ScrollView>}
      </View>
    </View>
  );
}
