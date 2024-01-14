import { 
  useRef, 
  useState, 
  useEffect, 
} from 'react';
import { 
  View, 
  Text, 
  Animated, 
  StyleSheet, 
} from 'react-native';
import MapView from 'react-native-maps';

import { FontAwesome5 } from '@expo/vector-icons';

import { Property } from '../types/types';
import { colors } from '../constants/Colors';
import { HEADERHEIGHT } from '../constants/Constants';
import { getPropertiesInArea } from '../data/properties';

import Map from '../components/map/Map';
import Card from '../components/card/Card';
import Screen from '../components/layout/Screen';
import HeaderAnimatedList from '../components/HeaderAnimatedList';

const SearchScreen = ({
    route,
  } : {
    route: { params: any; }
  }) => {
  
  const mapRef = useRef<MapView | null>(null);

  const [ mapShown, setMapShown ] = useState<boolean>(false);
  const [ scrollAnimation ] = useState(new Animated.Value(0));
  const [ properties, setProperties ] = useState<Property[]>([]);
  const [ location, setLocation ] = useState<string | undefined>(undefined);


  useEffect(() => {
    if(route.params) {
      
      const { boundingbox, location, lat, lon, } = route.params;
      console.log(location, lat, lon, boundingbox);

      const numBoudingbox = [
        Number(route.params.boundingbox[0]),
        Number(route.params.boundingbox[1]),
        Number(route.params.boundingbox[2]),
        Number(route.params.boundingbox[3]),
      ]

      setLocation(route.params.location);
      setProperties(getPropertiesInArea(numBoudingbox));

      mapRef?.current?.animateCamera({
        center: {
          latitude: Number(route.params.lat),
          longitude: Number(route.params.lon)
        }
      });
      
    }
  }, [route]);

  return (
    <Screen>
      <HeaderAnimatedList 
        mapShown={mapShown} 
        setMapShown={setMapShown}
        scrollAnimation={scrollAnimation} 
        location={location ? location : 'Find a Location'}
        availableProperties={properties ? properties.length : undefined }
      />
      {
        mapShown ? (
          <Map 
            properties={properties}
            mapRef={mapRef}
            location={location ? location : 'Find a Location'}
            setLocation={setLocation}
            setProperties={setProperties}
            initialRegion={
              route.params
              ? {
                  latitude: Number(route.params.lat),
                  longitude: Number(route.params.lon),
                  latitudeDelta: 0.4,
                  longitudeDelta: 0.4,
                }
              : undefined
            }
          />
        ) : (
          <>
            {properties.length > 0 ? (
              <Animated.FlatList
                onScroll={Animated.event([
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnimation,
                      }
                    }
                  }
                ], {useNativeDriver: true })}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingTop: HEADERHEIGHT - 20 }}
                bounces={false}
                data={properties}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Card style={{ marginVertical: 5 }} property={item}/>
                )}
              />
            ) : (
              <>
                {route.params ? (
                  <View style={styles.lottieContainer}>
                  <Text 
                    style={{ 
                      textAlign: 'center', 
                      fontSize: 24, 
                      fontWeight: 'bold' 
                    }}
                  >
                    No Properties found
                  </Text>
                  <Text 
                    style={{ 
                      fontWeight: 'bold', 
                      textAlign: 'center',
                      fontSize: 20, 
                      color: colors.gray_light
                    }}
                  >
                   Please search in a diferent location
                  </Text>
                </View>
                ): (
                  <View style={styles.lottieContainer}>
                    <FontAwesome5 name="globe-americas" size={200} color={colors.primary} />

                    <Text 
                      style={{ 
                        textAlign: 'center', 
                        fontSize: 24, 
                        fontWeight: 'bold' 
                      }}
                    >
                      Something search
                    </Text>
                    <Text 
                      style={{ 
                        fontWeight: 'bold', 
                        textAlign: 'center',
                        fontSize: 20, 
                        color: colors.gray_light
                      }}
                    >
                      Find aparments anytime nd anywhere
                    </Text>
                  </View>
                )}
              </>
            )}
          </>
        )
      }
    </Screen>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  lottieContainer: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  lottie: {
    height: 200,
    width: 200,
  }
})