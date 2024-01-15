import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { colors } from '../constants/Colors';

const ButtonList = ({
  data,
  style,
  header,
  borderTop,
  marginTop,

}: {
  header?: string;
  borderTop?: boolean;
  marginTop?: boolean;
  style?: ViewStyle | ViewStyle[];
  data: { label: string; onPress: () => void;}[];

}) => {

  const getListHeaderComponent = () => {
    if(!header) return null;
    return (
      <View style={[
        styles.headerContainer,
        { marginTop: marginTop ? 35 : 0}
      ]}>
        <Text style={styles.headerText}>{header}</Text>
      </View>
    )
  }

  return (
    <View style={[
      styles.container,
      style, 
      { borderTopWidth: borderTop ? 1 : 0 }
    ]}>
      {getListHeaderComponent()}
      {data.map((item, index) => (
        <Pressable 
          key={item.label} 
          onPress={item.onPress}
          style={({ pressed }) => {
            let arr: any[] = [
              styles.option,
              {
                backgroundColor: pressed ? colors.gray_light : '#f2f2f2',
              }
            ];
            if (index !== data.length -1) arr.push(styles.container);

            return arr;
          }}
        >
          <Text>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default ButtonList;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: colors.gray_light,
  },
  headerContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    backgroundColor: '#f1f7e5',
    borderBottomColor: colors.gray_light,
  },
  headerText: {
    marginLeft: 18,
    fontWeight: '600',
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  }
});