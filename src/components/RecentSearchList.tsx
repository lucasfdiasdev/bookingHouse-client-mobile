import 
  React, 
  { 
    useState 
  } from 'react';
import { 
  View,
  ViewStyle,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Location } from '../types/locationIQ';
import { getFormattedLocationText } from '../utils/getFormattedLocationText';

import RecentSearchButton from './RecentSearchButton';

const RecentSearchList = ({
  style,
  recentSearches
}: {
  recentSearches?: Location[]
  style?: ViewStyle;
}) => {

  const navigation = useNavigation() as any;

  const [ showMore, setShowMore ] = useState(false);

  const handleButtonPress = () => setShowMore(!showMore);

  const handleRecentSearchButtonPress = (location: Location) => {
    navigation.navigate('tabs', {
      screen: 'search',
      params: {
        location: getFormattedLocationText(location),
        lat: location.lat,
        lon: location.lon,
        boundingbox: location.boundingbox,
      }
    })
  };

  const ShowButton = ({ text}: {text: string}) => {
    return (
      <Pressable
        style={{ alignSelf: 'flex-start', padding: 10, backgroundColor: 'transparent', borderWidth: 1, borderColor: '#a4a4a4'}}
        onPress={handleButtonPress}
      >
        <Text>{text}</Text>
      </Pressable>
    )
  }


  const getList = () => {
    if (!recentSearches || recentSearches.length === 0) return;

    if (recentSearches.length > 2 && !showMore)
      return (
        <>
          {
            recentSearches.map((i, index) => (
              index < 2 ? (
                <RecentSearchButton
                  key={i.display_name + index}
                  name={getFormattedLocationText(i)}
                  style={styles.recentSearchButton}
                  onPress={() => handleRecentSearchButtonPress(i)}
                />
              ) : null
            )
          )}
          <ShowButton text="See More"/>
        </>
      );

    return (
      <>
        {
          recentSearches.map((i, index) => (
            index < 2 ? (
              <RecentSearchButton
                key={i.display_name + index}
                name={getFormattedLocationText(i)}
                style={styles.recentSearchButton}
                onPress={() => handleRecentSearchButtonPress(i)}
              />
            ) : null
          ))
        }
        { recentSearches.length > 2 ? (
            <ShowButton text='See Less'/>
          ) : null }
      </>
    )
  }

  return (
    <View style={style}>{getList()}</View>
  )
}

export default RecentSearchList

const styles = StyleSheet.create({
  recentSearchButton: {
    marginVertical: 5,
  }
})