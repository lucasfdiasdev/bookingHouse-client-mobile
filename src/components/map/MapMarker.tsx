import { Marker } from 'react-native-maps';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const MapMarker = ({
    lat,
    lng,
    color, 
    onPress,
  }: {
    lat: number;
    lng: number;
    onPress: () => void;
    color: string;
  }) => {
  return (
    <Marker coordinate={{ latitude: lat, longitude: lng }} onPress={onPress}>
     <MaterialCommunityIcons name="map-marker" size={32} color={color} />
    </Marker>
  );
};

export default MapMarker;