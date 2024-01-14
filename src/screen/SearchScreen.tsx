import { 
  useRef, 
  useState, 
  useEffect, 
} from 'react';
import MapView from 'react-native-maps';
import { Animated } from 'react-native';

import { properties } from '../data/properties';
import { HEADERHEIGHT } from '../constants/Constants';

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
  
  useEffect(() => {
    if(route.params) {
      const { location, lat, lon, } = route.params;
      
      console.log(location, lat, lon);
      mapRef?.current?.animateCamera({
        center: {
          latitude: Number(route.params.lat),
          longitude: Number(route.params.lon)
        }
      });
      
    }
  }, [route])

  return (
    <Screen>
      <HeaderAnimatedList 
        mapShown={mapShown} 
        setMapShown={setMapShown}
        scrollAnimation={scrollAnimation} 
        location={route.params ? route.params.location : 'Find a Location'}
      />
      {
        mapShown ? (
          <Map 
            properties={properties}
            mapRef={mapRef}
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
        )
      }
    </Screen>
  );
};

export default SearchScreen;