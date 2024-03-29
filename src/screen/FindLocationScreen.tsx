import React, 
  { 
    useState 
  } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Platform, 
  TextInput, 
  Pressable, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView, 
} from 'react-native';
import { useQueryClient } from 'react-query';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../constants/Colors';
import { Location } from '../types/locationIQ';
import { globalStyles } from '../lib/stylesGlobal';
import { LISTMARGIN } from '../constants/Constants';
import { getSuggestedLoction } from '../services/location';

import Row from '../components/layout/Row';
import Screen from '../components/layout/Screen';
import HeaderModal from '../components/layout/HeaderModal';
import RecentSearchList from '../components/RecentSearchList';
import CurrentLocationButton from '../components/CurrentLocationButton';
import {  getFormattedLocationText } from '../utils/getFormattedLocationText';

const FindLocationScreen = () => {

  const [ value, setValue ] = useState('');
  const [ suggestions, setSuggestions ] = useState<Location[]>([]);
  
  const navigation = useNavigation() as any;
  
  const queryClient = useQueryClient();
  const recentSearches: Location[] | undefined = queryClient.getQueryData('recentSearches');

  const setRecentSearch = (location: Location) => {
    queryClient.setQueryData('recentSearches', () => {
      if (recentSearches) {
        let included = false;
        for (let i of recentSearches) {
          if (
            i.display_name === location.display_name && i.lon === location.lon && i.lat === location.lat
          ) {
            included = true;
            break;
          }
        } 
        if (!included) return [location, ...recentSearches];
        return recentSearches;
      };

      return [location];
    });
  };

  const handleChange = async (val:string) => {
    setValue(val);

    if(val.length > 2) {
      const locations = await getSuggestedLoction(val);

      if( locations.length > 0 ) {
        setSuggestions(locations);
      };

    } else {

      if (val.length === 0) {
        setSuggestions([]);
      };

    };
  };

  const handleNavigation = (location: Location) => {
    setRecentSearch(location);
    navigation.navigate('tabs', {
      screen: 'search',
      params: {
        location: getFormattedLocationText(location),
        lat: location.lat,
        lon: location.lon,
        boundingbox: location.boundingbox,
      },
    });
  };

  const handleSubmitEditing = async () => {
    const locations = await getSuggestedLoction(value);

    if (locations.length > 0) {
      handleNavigation(locations[0]);

    };
  };

  const getInput = () => {
    if(Platform.OS === 'ios')
    return (
      <TextInput
        keyboardType='default'
        autoFocus
        selectionColor={colors.primary}
        placeholder='Enter Location'
        style={{
          padding: 10,
          fontSize: 20,
          marginTop: 10,
          borderWidth: 1,
          borderRadius: 5,
        }}
        onChangeText={handleChange}
        onSubmitEditing={handleSubmitEditing}
      />
    );

    return (
      <Row 
        style={{ 
          alignItems: 'center', 
          justifyContent: 'center',
          paddingHorizontal: 10
        }}
      >
        <TextInput
          keyboardType='default'
          autoFocus
          selectionColor={colors.primary}
          placeholder='Enter Location'
          placeholderTextColor='#d3d3d3'
          style={[
            globalStyles.marginTopDefault,
            {
              width: '80%',
              padding: 10,
              fontSize: 20,
              borderWidth: 1,
              borderRadius: 5,
            }
          ]}
          onChangeText={handleChange}
          onSubmitEditing={handleSubmitEditing}
        />
        <Pressable
          style={{ paddingHorizontal: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Text 
            style={{ 
              fontSize: 20,
              padding: 8,
              color: colors.info,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Cancel
          </Text>
        </Pressable>
      </Row>
    )
  };

  const SuggestedText = ({
    locationItem
  }: {
    locationItem: Location
  }) => {

    const location = getFormattedLocationText(locationItem);

    return (
      <Row style={styles.suggestedContainer}>
        <Text>{location}</Text>
      </Row>
    );
  };

  return (
    <Screen>
      {Platform.OS === 'ios' ? <HeaderModal/> : null}
      <View style={styles.screenContent}>
        {getInput()}
        {
          suggestions.length > 0 
          ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={suggestions}
              keyExtractor={(item, index) => item.place_id + index }
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    handleNavigation(item)
                  }}
                >
                  <SuggestedText locationItem={item}/>
                </TouchableOpacity>
              )}
            />
          ) : (
            <ScrollView bounces={false}>
              <CurrentLocationButton style={styles.locationBtn}/>
              <RecentSearchList 
                style={styles.recentSearchContainer}
                recentSearches={recentSearches}  
              />
            </ScrollView>
          )
        }
      </View>
    </Screen>
  );
};

export default FindLocationScreen;

const styles = StyleSheet.create({
  screenContent: {
    marginHorizontal: LISTMARGIN,
  },
  suggestedContainer: {
    padding: 15,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderBottomColor: colors.gray_light,
  },
  locationBtn: {
    marginTop: 40
  },
  recentSearchContainer: {
    marginTop: 30,
  }
});