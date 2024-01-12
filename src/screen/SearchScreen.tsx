import { useState } from 'react';
import { Animated, LayoutChangeEvent } from 'react-native';

import Card from '../components/card/Card';
import Screen from '../components/layout/Screen';

import { colors } from '../constants/Colors';
import { properties } from '../data/properties';
import { HEADERHEIGHT, LISTMARGIN } from '../constants/Constants';


const SearchScreen = () => {

  const [ scrollAnimation ] = useState(new Animated.Value(0));
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

  }


  return (
    <Screen>
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

      </Animated.View>
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
        style={{ marginHorizontal: LISTMARGIN }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginVertical: 5 }} property={item}/>
        )}
      />
    </Screen>
  );
};

export default SearchScreen;