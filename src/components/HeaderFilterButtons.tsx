import React from 'react';
import { 
  Text, 
  FlatList, 
  Pressable, 
  StyleSheet, 
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from '../constants/Colors'
import { filterButtons } from '../data/filter-buttons';

const HeaderFilterButtons = () => {
  return (
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
  )
}

export default HeaderFilterButtons

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
})