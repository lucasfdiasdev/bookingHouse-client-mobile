import * as Location from 'expo-location';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ViewStyle 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../constants/Colors';

import { FontAwesome } from '@expo/vector-icons';

import Row from './layout/Row';

const CurrentLocationButton = ({
  style
}: {
  style?: ViewStyle | ViewStyle[];
}) => {
  
  const navigation = useNavigation() as any;

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if( status != 'granted') {
      alert("Permisson to access location was denied");
      return;
    };

    let location = await Location.getCurrentPositionAsync({});
    handleNavigation(location);

  };

  const handleNavigation = (location: Location.LocationObject) => {
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;

    let boundingbox = [
      (lat - 0.048).toString(),
      (lat + 0.048).toString(),
      (lon - 0.041).toString(),
      (lon + 0.041).toString(),
    ];

    navigation.navigate('tabs', {
      screen: 'search',
      params: {
        location: 'Your current location',
        boundingbox,
        lat: lat.toString(),
        lon: lon.toString(),
      },
    })
  };

  return (
    <Row style={[ styles.container, style as ViewStyle]}>
      <FontAwesome
        name='location-arrow'
        size={24}
        style={styles.icon}
        color={colors.primary}
      />
      <TouchableOpacity
        onPress={async () => await getLocation()}
      >
        <Text style={styles.text}>Use my current location</Text>
      </TouchableOpacity>
    </Row>
  )
}

export default CurrentLocationButton

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  icon: {
    marginLeft: 5,
  },
  text: {
    fontSize: 16,
    color: colors.info,
    marginLeft: 10,
    fontWeight: '600'
  }
})