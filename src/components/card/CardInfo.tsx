import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import Button from '../Button';
import Row from '../layout/Row';

import { Property } from '../../types/types';
import { colors } from '../../constants/Colors';

const CardInfo = ({property} : { property: Property; }) => {
  return (
    <View 
        style={styles.containerInfo}
      >
        <Row style={{ justifyContent: 'space-between' }}>
          <Text style={styles.h1}>R$ {property.rentLow.toLocaleString()} - {property.rentHigh.toLocaleString()} </Text>
          <MaterialCommunityIcons name="cards-heart-outline" size={32} color="black"/>
        </Row>

        <Text style={styles.p}>
          {property.bedroomLow} -{" "} 
          {property.bedroomHigh} Beds
        </Text>
        <Text  style={[styles.p, { marginTop: 5 }]}>
          {property.name}
        </Text>
        <Text style={styles.p}>
          {property.street}
        </Text>
        <Text style={styles.p}>
          {property.city},{" "}
          {property.state} -{" "}
          {property.zip}
        </Text>

        <Text style={[styles.p, { marginTop: 5 }]}>
          {property.tags.map((tag, index) => (
            <React.Fragment key={index}>
              <Text style={{ marginLeft: 5, color: colors.info }}>#{tag}</Text>
              {index !== property.tags.length - 1 && <Text> </Text>}
            </React.Fragment>
          ))}
        </Text>

        <Row style={{ marginTop: 10, justifyContent: 'space-between' }}>
          <Button onPress={() => console.log('Call')}>Call</Button>
          <Button onPress={() => console.log('Email')} ghost >Email</Button>
        </Row>
      </View>
  );
};

export default CardInfo;

const styles = StyleSheet.create({
  h1: {
    fontSize: 20, 
    fontWeight: 'bold'
  },
  p: {
    fontSize: 16, 
    fontWeight: '400'
  },
  containerInfo: {
    paddingVertical: 10, 
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: colors.gray_light,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});