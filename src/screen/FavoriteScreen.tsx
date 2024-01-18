import React, { useContext, useState } from 'react';
import { 
  Text, 
  Pressable, 
  ViewStyle, 
  StyleSheet,
  View,
  FlatList, 
} from 'react-native';

import { 
  AntDesign, 
  FontAwesome5, 
  MaterialCommunityIcons, 
} from '@expo/vector-icons';

import { Property } from '../types/types';
import { colors } from '../constants/Colors';
import { AuthContext } from '../context/context';
import { LISTMARGIN } from '../constants/Constants';

import Row from '../components/layout/Row';
import Card from '../components/card/Card';
import Screen from '../components/layout/Screen';
import AuthButton from '../components/auth/AuthButton';

// buttons group
const ButtonHeader = ({
  label,
  style,
  ghost,
  onPress,
}: {
  label?: string;
  ghost?: boolean;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
}) => {
  return (
    <Pressable 
      onPress={onPress} 
      style={[
        styles.button, 
        { backgroundColor:
            ghost ? "transparent" : colors.primary,
        }, 

        style
      ]}
    >
      <Text 
        style={[
          styles.text, 
          {
            color: ghost ? colors.primary : colors.white
          }
        ]}
      >
        {label}
        </Text>
    </Pressable>
  );
};

const FavoriteScreen = () => {

  const { user } = useContext(AuthContext); 
  
  const likedProperties = undefined;
  const contactedProperties = undefined;
  const applicationProperties = undefined;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  
  const getButtonAppearance = (buttonIndex: number) => {
    if (activeIndex === buttonIndex) return 'filled';
    return 'ghost';
  };

  const handleButtonPress = (index: number) => {
    setActiveIndex(index);

  };

  const getBodyText = (heading: string, subHeading: string) => {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.textHeading}>
          {heading}
        </Text>
        <Text style={styles.textSubHeading}>
          {subHeading}
        </Text>
      </View>
    )
  }

  const getPropertiesFlatList = (properties: Property[]) => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={properties}
        style={{ marginTop: 10 }}
        renderItem={({ item }) => <Card property={item} style={styles.card}/>}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  };

  const getBody = () => {
    if(activeIndex === 0) {
      if (likedProperties) return getPropertiesFlatList(likedProperties);
      return (
        <>
          <AntDesign name="heart" size={180} color={colors.primary} />
          {getBodyText(
            "You do not have any favorites saved",
            "Tap the heart icon on rentals to add favorites"
          )}
          {!user && 
            <AuthButton 
              style={styles.signInAndSignUpButtonContainer}
            />
          }
        </>
      );
    };

    if(activeIndex === 1) {
      if (contactedProperties) return getPropertiesFlatList(contactedProperties);

      return (
        <>
          <MaterialCommunityIcons name="email-alert" size={180} color={colors.primary} />
          {getBodyText(
            "You have not contacted any properties yet",
            "Your contacted properties will show here"
          )}

          {!user && 
            <AuthButton 
              style={styles.signInAndSignUpButtonContainer}
            />
          }
        </>
      );
    };

    if(applicationProperties) 
      return getPropertiesFlatList(applicationProperties);
    return (
      <>
        <FontAwesome5 name="clipboard-list" size={180} color={colors.primary} />
        {getBodyText(
          "Check the status of your rental applications here",
          "Any properties that you have applied to will show here"
        )}

        {!user && 
          <AuthButton 
            style={styles.signInAndSignUpButtonContainer}
          />
        }
      </>
    );
  };

  return (
    <Screen style={styles.screen}>
      <Row style={styles.buttonContainer}>
        <ButtonHeader
          ghost={getButtonAppearance(0) === 'ghost'}
          onPress={() => handleButtonPress(0)}
          style={[styles.favoritesButton]}
          label='Favorites'
        />
        <ButtonHeader
          ghost={getButtonAppearance(1) === 'ghost'}
          onPress={() => handleButtonPress(1)}
          style={[styles.contactedButton]}
          label='Contacted'
        />
        <ButtonHeader
          ghost={getButtonAppearance(2) === 'ghost'}
          onPress={() => handleButtonPress(2)} 
          style={[styles.applicationButton]}
          label='Applications'
        />
      </Row>
      <View style={styles.container}>{getBody()}</View>
    </Screen>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: LISTMARGIN,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    padding: 10,
    width: '33%',
    borderWidth: 1,
    borderColor: colors.primary
  },
  text: {
    fontSize: 16, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: colors.white
  },
  applicationButton: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  favoritesButton: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  contactedButton: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  lottie: {
    height: 180,
    width: 180,
    marginBottom: 20,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginVertical: 15,
  },
  textHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textSubHeading: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: 'bold',
    color: '#808080',
    textAlign: 'center',
  },
  signInAndSignUpButtonContainer: {
    marginTop: 15,
  },
  card: {
    marginVertical: 0,
    marginHorizontal: 0,
  }
});