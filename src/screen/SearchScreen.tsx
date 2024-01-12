import React, { useRef, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';

import Screen from '../components/layout/Screen';
import { LISTMARGIN, WIDTH } from '../constants/Constants';

import Button from '../components/Button';
import { colors } from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { properties } from '../data/properties';

const SearchScreen = () => {

  const property = {
    id: 1,
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    rentLow: 3750,
    rentHigh: 31054,
    bedroomLow: 1,
    bedroomHigh: 5,
    name: 'The Hamilton',
    street: '555 NE 34th St',
    city: 'Maiami',
    state: 'Florida',
    zip: 33137,
    tags: [
      'Parking',
      'Parking1',
      'Parking2',
      'Parking3',
    ],
  };

  const flatListRef = useRef<FlatList | null>(null);
  const viewConfig = { viewAreaCoveragePercentThreshold: 95}
  const [ activeIndex, setActiveIndex ] = useState(0);
  const onViewRef = useRef(({ changed }: { changed: any }) => {
    if(changed[0].isViewable) {
      setActiveIndex(changed[0].index);
    };
  });

  const handlePressLeft = () => {
    if(activeIndex === 0) 
    return flatListRef.current?.scrollToIndex({
      animated: false,
      index: property.images.length - 1,
    });

    flatListRef.current?.scrollToIndex({
      index: activeIndex - 1,
    });
  };

  const handlePressRight = () => {
    if(activeIndex === property.images.length - 1)
    return flatListRef.current?.scrollToIndex({
      animated: false,
      index: 0
    });

    flatListRef.current?.scrollToIndex({
      index: activeIndex + 1,
    });
  };
  return (
    <Screen style={{ marginHorizontal: LISTMARGIN }}>
      <FlatList
        data={properties}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <FlatList
              data={property.images}
              horizontal
              ref={(ref) => (flatListRef.current = ref)}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              snapToAlignment='center'
              pagingEnabled
              onViewableItemsChanged={onViewRef.current}
              viewabilityConfig={viewConfig}
              renderItem={({item, index}) => (
                <Image 
                  source={{ uri: item}}
                  style={{ 
                    height: 250, 
                    width: WIDTH, 
                    borderTopLeftRadius: 5, 
                    borderTopRightRadius: 5, 
                  }}  
                />
              )}
            />
            <Pressable
              onPress={handlePressLeft}
              style={{
                position: 'absolute',
                top: 95,
                left: 5
              }}
            >
              <MaterialCommunityIcons
                name='chevron-left' 
                size={42}
                color={colors.gray_light} 
              />
            </Pressable>
            <Pressable
              onPress={handlePressRight}
              style={{
                position: 'absolute',
                top: 95,
                right: 5
              }}
            >
              <MaterialCommunityIcons
                name='chevron-right' 
                size={42}
                color={colors.gray_light} 
              />
            </Pressable>
            <View 
              style={styles.containerInfo}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.h1}>R$ {property.rentLow.toLocaleString()} - {property.rentHigh.toLocaleString()} </Text>
                <MaterialCommunityIcons name="cards-heart-outline" size={32} color="black"/>
              </View>

              <Text style={styles.p}>
                {property.bedroomLow} -{" "} 
                {property.bedroomHigh} Beds
              </Text>
              <Text  style={[styles.p, { marginTop: 5 }]}>
                {property.name}
              </Text>
              <Text style={styles.p}>
                {property.street}
              </Text>
              <Text style={styles.p}>
                {property.city},{" "}
                {property.state} -{" "}
                {property.zip}
              </Text>

              <Text style={[styles.p, { marginTop: 5 }]}>
                {property.tags.map((tag, index) => (
                  <React.Fragment key={index}>
                    <Text style={{ marginLeft: 5, color: colors.info }}>#{tag}</Text>
                    {index !== property.tags.length - 1 && <Text> </Text>}
                  </React.Fragment>
                ))}
              </Text>

              <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                <Button onPress={() => console.log('Call')}>Call</Button>
                <Button onPress={() => console.log('Email')} ghost >Email</Button>
              </View>
            </View>
          </View>
        )}
      />
    </Screen>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  h1: {
    fontSize: 20, 
    fontWeight: 'bold'
  },
  p: {
    fontSize: 16, 
    fontWeight: '400'
  },
  containerInfo: {
    paddingVertical: 10, 
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: colors.gray_light,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});