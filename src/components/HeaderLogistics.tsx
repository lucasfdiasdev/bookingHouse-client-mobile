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

const HeaderLogistics = () => {
  return (
    <Row style={styles.containerLogistics}>
      <Row style={globalStyles.alignDefault}>
        <MaterialCommunityIcons name="map-marker" size={18} color={colors.primary} />
        <Text style={{ marginHorizontal: 6, fontSize: 15 }}>12 available</Text>
        
        <LogisticsButton label='Save' onPress={() => console.log('Save')}/>
      </Row>

      <Row style={{ marginLeft: 20 }}>
        <LogisticsButton 
          label='Sort'
          iconName='sort'
          onPress={() => console.log('Sort')}
        />
        <LogisticsButton 
          style={{ marginLeft: 20 }} 
          label='Map'
          iconName='map-outline'
          onPress={() => console.log('Map')}
        />
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