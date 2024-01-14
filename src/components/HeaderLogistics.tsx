import { 
  Text, 
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from '../constants/Colors';
import { LISTMARGIN } from '../constants/Constants';

import Row from './layout/Row';
import { globalStyles } from '../lib/stylesGlobal';

const LogisticsButton = ({
    style,
    label,
    onPress,
    iconName,
  }: { 
    style?: any;
    label: string;
    iconName?: any;
    onPress: () => void;
  }) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
    >
      <Row style={globalStyles.alignDefault}>
        {iconName ? (
          <MaterialCommunityIcons name={iconName as any} size={18} color={colors.info}/>
        ) : null }
        <Text style={[styles.labelBtn, { marginLeft: 5 }]}>
          {label}
        </Text>
      </Row>
    </TouchableOpacity>
  );
};

const HeaderLogistics = ({
    mapShown,
    setMapShown,
    availableProperties
  }: {
    mapShown: boolean;
    availableProperties?: number;
    setMapShown: (bool: boolean) => void;
  }) => {

  const handleMapPress = () => {
    if(mapShown) return setMapShown(false);
    setMapShown(true);
  }

  return (
    <Row style={styles.containerLogistics}>
      <Row style={globalStyles.alignDefault}>
        <MaterialCommunityIcons name="map-marker" size={18} color={colors.primary} />
        <Text style={{ marginHorizontal: 6, fontSize: 15 }}>{
          availableProperties
          ? `${availableProperties} propriedades`
          : `Search Spaces`
        }</Text>
        
        <LogisticsButton label='Save' onPress={() => console.log('Save')}/>
      </Row>

      <Row style={{ marginLeft: 20 }}>
        <LogisticsButton 
          label='Sort'
          iconName='sort'
          onPress={() => console.log('Sort')}
        />
        {
          mapShown ? (
            <LogisticsButton 
              style={{ marginLeft: 20 }} 
              label='List'
              iconName='format-list-bulleted'
              onPress={handleMapPress}
            />
          ) : (
            <LogisticsButton 
              style={{ marginLeft: 20 }} 
              label='Map'
              iconName='map-outline'
              onPress={handleMapPress}
            />

          )
        }
      </Row>
    </Row>
  );
};

export default HeaderLogistics;

const styles = StyleSheet.create({
  labelBtn: {
    color: colors.info, 
    fontWeight: 'bold',
    fontSize: 15
  },
  containerLogistics: { 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginHorizontal: LISTMARGIN,
    marginVertical: 5
  },
});