import { useState } from 'react';
import { Animated } from 'react-native';

import { properties } from '../data/properties';
import { HEADERHEIGHT, LISTMARGIN } from '../constants/Constants';

import Card from '../components/card/Card';
import Screen from '../components/layout/Screen';
import HeaderAnimatedList from '../components/HeaderAnimatedList';

const SearchScreen = () => {

  const [ scrollAnimation ] = useState(new Animated.Value(0));

  return (
    <Screen>
     <HeaderAnimatedList scrollAnimation={scrollAnimation} />
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