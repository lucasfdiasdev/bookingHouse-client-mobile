import 
  React, 
  { 
    useState 
  } from 'react';
import { 
  View, 
  Platform, 
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Region } from 'react-native-maps';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Property } from '../../types/types';
import { colors } from '../../constants/Colors';

import Card from '../card/Card';
import MapMarker from './MapMarker';

const Map = ({
  mapRef,
  properties,
  initialRegion,
}: {
  properties: Property[];
  initialRegion?: Region | undefined;
  mapRef: React.MutableRefObject<MapView | null>;
}) => {
  const navigation = useNavigation() as any;
  
  const [ activeIndex, setActiveIndex ] = useState(-1);

  const unFocusProperty = () => {
    setActiveIndex(-1);
    navigation.setOptions({ tabBarStyle: { display: 'flex' }});
  };

  const handleMapPress = () => {
    if (Platform.OS === 'android') {
      unFocusProperty(); 
    };
  };

  const handleMarkerPress = (index: number) => {
    if (Platform.OS === 'ios') {
      setTimeout(() => {
        mapRef.current?.animateCamera({
          center: {
            latitude: properties[index].lat,
            longitude: properties[index].lng,
          },
        });
      }, 100);
    };

    setActiveIndex(index);
    navigation.setOptions({ tabBarStyle: { display: 'none' }});
  };

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        userInterfaceStyle='light' 
        ref={mapRef}
        onPress={handleMapPress}
        initialRegion={initialRegion ? initialRegion : undefined }
      >
        {properties.map((i, index) => (
          <MapMarker
            key={i.id}
            onPress={() => handleMarkerPress(index)}
            lat={i.lat}
            lng={i.lng}
            color={
              activeIndex === index
              ? colors.info
              : colors.primary
            }
          />
        ))}
      </MapView>
      {
        activeIndex > -1 && ( 

          <>
            {Platform.OS === 'ios' && (
              <TouchableOpacity
                style={styles.exit}
                onPress={unFocusProperty}
              >
                <MaterialCommunityIcons 
                  name="close" 
                  size={24} 
                  color="black" 
                />
              </TouchableOpacity>
            )}
            <Card property={properties[activeIndex]} style={styles.card}/>
          </>
        )
      }
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    overflow: 'hidden',
  },
  map: {  
    width: '100%',
    height: '100%',
  },
  card: {
    position: 'absolute',
    bottom: 10,
    height: 360
  },
  exit: {
    left: 5,
    top: 170,
    padding: 10,
    borderRadius: 30,
    position: 'absolute',
    backgroundColor: colors.white,
  }
});