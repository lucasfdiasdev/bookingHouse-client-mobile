import React, { useState } from 'react';
import { 
  Text, 
  View, 
  Animated, 
  FlatList, 
  Platform, 
  Pressable, 
  StyleSheet, 
  TouchableOpacity, 
  LayoutChangeEvent, 
} from 'react-native';

import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from '../constants/Colors';
import { globalStyles } from '../lib/stylesGlobal';
import { HEADERHEIGHT, LISTMARGIN } from '../constants/Constants';

import Row from './layout/Row';

const HeaderAnimatedList = ({
  scrollAnimation
}: {
  scrollAnimation: Animated.Value;
}) => {

  const [ offsetAnimation ] = useState(new Animated.Value(0));

  const [ clampedScroll, setClampedScroll ] = useState(
    Animated.diffClamp(
      Animated.add(
        scrollAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: 'clamp'
        }),
        offsetAnimation
      ),
      0,
      1
    )
  );

  const navbarTransplate = clampedScroll.interpolate({
    inputRange: [0, HEADERHEIGHT],
    outputRange: [0, -HEADERHEIGHT],
    extrapolate: 'clamp',
  });

  const filterButtons = [
    {
      iconName: 'filter-variant',
      onPress: () => console.log('filter all')
    },
    {
      label: 'Price',
      onPress: () => console.log('Price'),
    },
    {
      label: 'Move-In Date',
      onPress: () => console.log('Move in date'),
    },
    {
      label: 'Pets',
      onPress: () => console.log('Pets'),
    },
  ];

  const onLayout = (event: LayoutChangeEvent) => {
    let { height} = event.nativeEvent.layout;
    setClampedScroll(
      Animated.diffClamp(
        Animated.add(
          scrollAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp'
          }),
          offsetAnimation
        ),
        0,
        height
      )
    )
  };

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
        height: HEADERHEIGHT,
        backgroundColor: colors.white,
        transform: [{ translateY: navbarTransplate }],
      }}
      onLayout={onLayout}
    >
      <View style={{ marginHorizontal: LISTMARGIN}}>
        <TouchableOpacity
          style={{ 
            marginTop: Platform.OS === 'ios' ? 50 : 30,
            borderWidth: 1,
            borderColor: '#d3d3d3',
            borderRadius: 30,
            padding: 10,
          }}
          onPress={() => console.log('input header')}
        >
          <Row style={styles.alignDefault}>
            <AntDesign name="search1" size={20} color={colors.primary} />
            <Text style={{ marginLeft: 10 }}>Find a Location</Text>
          </Row>
        </TouchableOpacity>
        <FlatList
          data={filterButtons}
          horizontal
          style={{ marginTop: 10 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            if(item.iconName) {
              return (
                <Pressable
                  onPress={() => console.log('Filter all')}
                  style={[styles.button, { width: 40, padding: 6 }]}
                >
                  <Text style={styles.text}>
                    <MaterialCommunityIcons 
                      name={item.iconName as any} 
                      size={24} 
                      color={colors.primary}
                    />
                  </Text>
                </Pressable>
              )
            }
            return (
              <Pressable
                onPress={() => console.log(`${item.label}`)}
                style={[styles.button, { paddingVertical: 6, paddingHorizontal: 10 }]}
              >
                <Text style={styles.text}>
                  {item.label}
                </Text>
              </Pressable>
            )
          }}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>

      <View style={globalStyles.divider}></View>

      <Row style={styles.containerLogistics}>
        <Row style={styles.alignDefault}>
          <MaterialCommunityIcons name="map-marker" size={18} color={colors.primary} />
          <Text style={{ marginHorizontal: 6, fontSize: 15 }}>12 available</Text>
          <TouchableOpacity
            onPress={() => console.log('save')}
          >
            <Text style={styles.labelBtn}>Save</Text>
          </TouchableOpacity>
        </Row>

        <Row style={{ marginLeft: 20 }}>
          <TouchableOpacity
            onPress={() => console.log('Sort')}
          >
            <Row style={styles.alignDefault}>
              <MaterialCommunityIcons name="sort" size={18} color={colors.info}/>
              <Text style={[styles.labelBtn, { marginLeft: 10 }]}>
                Sort
              </Text>
            </Row>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => console.log('Map')}
            style={{ marginLeft: 20}}
          >
            <Row style={styles.alignDefault}>
              <MaterialCommunityIcons name="map-outline" size={18} color={colors.info}/>
              <Text style={[styles.labelBtn, { marginLeft: 10 }]}>
                Map
              </Text>
            </Row>
          </TouchableOpacity>
        </Row>
      </Row>
    </Animated.View>
  );
};

export default HeaderAnimatedList;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#d3d3d3',
    marginHorizontal: 3
  },
  text: {
    textAlign: 'center',
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16
  },
  labelBtn: {
    color: colors.info, 
    fontWeight: 'bold',
    fontSize: 15
  },
  containerLogistics: { 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginHorizontal: LISTMARGIN,
    marginVertical: 5
  },
  alignDefault: {
    alignItems: 'center'
  }
})