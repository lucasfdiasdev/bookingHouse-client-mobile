import {
  View,
  ViewStyle,
  StyleSheet,
} from 'react-native';

import CardInfo from './CardInfo';
import ImageCarousel from '../ImageCarousel';

import { Property } from '../../types/types';
import { colors } from '../../constants/Colors';
import { LISTMARGIN } from '../../constants/Constants';

const Card = ({
  style,
  property,
}: {
  style?: ViewStyle;
  property: Property;
}) => {
  
  return (
    <View style={[ style, styles.container ]}>
      <ImageCarousel images={property.images}/>
      <CardInfo property={property}/>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: { 
    borderRadius: 5, 
    backgroundColor: colors.white,
  },
});