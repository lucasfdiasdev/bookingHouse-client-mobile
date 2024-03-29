import React, { useState } from 'react';
import { 
  View, 
  Animated,
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
  availableProperties,
}: {
  location: string;
  mapShown: boolean;
  availableProperties?: number;
  scrollAnimation: Animated.Value;
  setMapShown: (bool: boolean) => void;
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

      <HeaderLogistics 
        mapShown={mapShown}
        setMapShown={setMapShown}
        availableProperties={availableProperties} 
      />
    </Animated.View>
  );
};

export default HeaderAnimatedList;