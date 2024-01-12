import { FlatList } from 'react-native';

import Card from '../components/card/Card';
import Screen from '../components/layout/Screen';

import { properties } from '../data/properties';
import { LISTMARGIN } from '../constants/Constants';

const SearchScreen = () => {

  return (
    <Screen style={{ marginHorizontal: LISTMARGIN }}>
      <FlatList
        data={properties}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginVertical: 5 }} property={item}/>
        )}
      />
    </Screen>
  );
};

export default SearchScreen;