import 
  React, 
  { 
    useEffect,
    useState 
  } from 'react';
import { 
  View, 
  Platform, 
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Region } from 'react-native-maps';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Property } from '../../types/types';
import { colors } from '../../constants/Colors';

import Card from '../card/Card';
import MapMarker from './MapMarker';
import { getPropertiesInArea } from '../../data/properties';

// used to persist the region if search area from the map
let mapRegion: Region | undefined = undefined;

const Map = ({
  mapRef,
  properties,
  initialRegion,
  location,
  setLocation,
  setProperties,
}: {
  properties: Property[];
  initialRegion?: Region | undefined;
  mapRef: React.MutableRefObject<MapView | null>;
  location: string;
  setLocation: (location: string) => void;
  setProperties: (properties: Property[]) => void;
}) => {
  const navigation = useNavigation() as any;

  useEffect(() => {
    if (location === 'Map Area') return;

    if (initialRegion) {
      setShowSearchAreaButton(false);
      setRegion(initialRegion);
    }
  }, [initialRegion])

  
  const [ activeIndex, setActiveIndex ] = useState(-1);
  const [ showSearchAreaButton, setShowSearchAreaButton ] = useState(false);
  const [ boundingbox, setBoundingbox ] = useState<number[]>([]) // used for searching properties in the region
  const [ region, setRegion ] = useState<Region | undefined>(
    mapRegion ? mapRegion : undefined
  );

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
    setTimeout(() => {
      mapRef.current?.animateCamera({
        center: {
          latitude: properties[index].lat,
          longitude: properties[index].lng,
        },
      });
    }, 100);

    setTimeout(() => {
      const newRegion: Region ={
        latitude: properties[index].lat,
        latitudeDelta: region?.latitudeDelta ? region.latitudeDelta : 0.4,
        longitude: properties[index].lng,
        longitudeDelta: region?.longitudeDelta ? region.longitudeDelta : 0.4,
      };

      setRegion(newRegion);
    }, 600)

    setActiveIndex(index);
    navigation.setOptions({ tabBarStyle: { display: 'none' }});
  };

  const handleSearchAreaButtonPress = () => {
    setProperties(getPropertiesInArea(boundingbox));
    setLocation("Map Area");
    mapRegion = region
    setShowSearchAreaButton(false);
  }

  return (
    <View style={styles.container}>
      <MapView 
        provider={'google'}
        style={styles.map} 
        userInterfaceStyle='light' 
        ref={mapRef}
        onPress={handleMapPress}
        initialRegion={initialRegion ? initialRegion : undefined }
        onRegionChangeComplete={(region, isGuesture) => {
          if(isGuesture?.isGesture) {
            if (!showSearchAreaButton)  setShowSearchAreaButton(true);

            const newBoundingbox = [
              region.latitude - region.latitudeDelta / 2,
              region.latitude + region.latitudeDelta / 2,
              region.longitude - region.longitudeDelta / 2,
              region.longitude + region.longitudeDelta / 2
            ];
            setRegion(region);
            setBoundingbox(newBoundingbox);
          }
        }}
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

      {showSearchAreaButton && activeIndex === -1 && (
        <Pressable 
          style={styles.searchAreaButton}
          onPress={handleSearchAreaButtonPress}
        >
          <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: colors.primary}}>Search Area</Text>
        </Pressable>
      )}
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
  },
  searchAreaButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderColor: colors.gray_light,
    borderWidth: 1,
    backgroundColor: colors.white,

    position: 'absolute',
    bottom: 30,
    zIndex: 100,
    alignSelf: 'center',
    borderRadius: 30
  }
});