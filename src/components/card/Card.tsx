import {
  View,
  ViewStyle,
} from 'react-native';

import CardInfo from './CardInfo';
import ImageCarousel from '../ImageCarousel';

import { Property } from '../../types/types';

const Card = ({
  style,
  property,
}: {
  style?: ViewStyle;
  property: Property;
}) => {
  
  return (
    <View style={style}>
      <ImageCarousel images={property.images}/>
      <CardInfo property={property}/>
    </View>
  );
};

export default Card;