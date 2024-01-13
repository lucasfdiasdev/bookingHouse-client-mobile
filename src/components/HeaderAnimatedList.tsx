import React, { useState } from 'react';
import { 
  View, 
  Animated, 
  StyleSheet, 
  LayoutChangeEvent, 
} from 'react-native';

import { colors } from '../constants/Colors';
import { globalStyles } from '../lib/stylesGlobal';
import { HEADERHEIGHT, LISTMARGIN } from '../constants/Constants';

import HeaderInput from './HeaderInput';
import HeaderLogistics from './HeaderLogistics';
import HeaderFilterButtons from './HeaderFilterButtons';

const HeaderAnimatedList = ({
  location,
  mapShown,
  setMapShown,
  scrollAnimation,
}: {
  location: string;
  mapShown: boolean;
  setMapShown: (bool: boolean) => void;
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
        <HeaderInput location={location}/>
        <HeaderFilterButtons/>
      </View>

      {/* divider */}
      <View style={globalStyles.divider}></View>

      <HeaderLogistics setMapShown={setMapShown} mapShown={mapShown}/>
    </Animated.View>
  );
};

export default HeaderAnimatedList;

const styles = StyleSheet.create({

})