import { 
  View,
  ScrollView,
  StyleSheet,
  Text,
  Pressable, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


import { colors } from '../constants/Colors';
import { globalStyles } from '../lib/stylesGlobal';
import { LISTMARGIN } from '../constants/Constants';

import Screen from '../components/layout/Screen';
import ButtonList from '../components/ButtonList';
import AuthButton from '../components/auth/AuthButton';

const ProfileScreen = () => {
  const user = undefined;
  const navigation = useNavigation() as any;

  const firstSignedOutButtos = [
    {
      label: 'Add a Property',
      onPress: () => console.log('navigate to AddProperty'),
    },
    {
      label: 'View My Properties',
      onPress: () => console.log('navigate to view my properties'),
    },
  ];
  
  const supportButtons = [
    {
      label: 'Help Center',
      onPress: () => console.log('navigate to Help Center'),
    },
    {
      label: 'Terms and Conditions',
      onPress: () => console.log('navigate to Terms and Conditions'),
    },
  ];
  
  const rentingButtons = [
    {
      label: 'Favorite Properties',
      onPress: () => navigation.navigate('tabs',
      {
        screen: 'favorite'
      }),
    },
    {
      label: 'Rental Applications',
      onPress: () => console.log('navigate to Rental Applications'), 
    },
    {
      label: 'My Residences',
      onPress: () => console.log('navigate to My Residences'),
    },
    {
      label: 'Rent Payments',
      onPress: () => console.log('navigate to Rent Payments'),
    },
  ];
  
  const accountButtons = [
    {
      label: 'Account Settings',
      onPress: () => console.log('navigate to Account Settings'),
    },
    {
      label: 'Billing History',
      onPress: () => console.log('navigate to Billing History'),
    },
    {
      label: 'Banks and Cards',
      onPress: () => console.log('navigate to Banks and Cards'),
    },
  ];
  
  const rentalManagementButtons = [
    {
      label: 'Add a Property',
      onPress: () => console.log('navigate to AddProperty'),
    },
    {
      label: 'Add Apartment to Property',
      onPress: () => console.log('navigate to MyProperties'),
    },
    {
      label: 'View My Properties',
      onPress: () => console.log('navigate to MyProperties'),
    }
  ];

  return (
    <Screen>
      <ScrollView style={styles.container}>
        <View style={styles.defaultMarginHorizontal}>
          {user 
            ? (
              <>
                <Text style={[styles.userName, globalStyles.h4]}>
                  Welcome, User's FirstName
                </Text>
                <Text style={[styles.email, globalStyles.h6]}>
                  user@exemple.com
                </Text>
              </>
            ) : (
              <>
                <Text style={[styles.header, globalStyles.h5]}>
                  Renting has never been easier!
                </Text>
                <AuthButton/>
                <View style={styles.middleContainer}>
                  <Text style={[styles.subheader, globalStyles.s1]}>
                    Are you a property owner or manager
                  </Text>
                  <Text style={styles.bodyText}>
                    Visit our website to access our full suite of rental management tools and start receiving applications in minutes!
                  </Text>
                </View>
              </>
            )}
        </View>

        {user ? (
          <>
            <ButtonList data={rentingButtons} header='Renting made easy'/>
            <ButtonList data={accountButtons} header='My Account'/>
            <ButtonList data={rentalManagementButtons} header='Rental Manager Tools'/>
            <ButtonList data={supportButtons} header='Support'/>
            <View
              style={[
                styles.specialMarginVertical,
                styles.defaultMarginHorizontal
              ]}
            >
              <Pressable
                style={styles.button}
                onPress={() => console.log('log users out')}
              >
                <Text style={styles.textButton}>Sign Out</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <ButtonList data={firstSignedOutButtos} borderTop/>
            <ButtonList header="Support" data={supportButtons} marginTop/>
            <Text 
              style={[
                styles.brandText, 
                styles.specialMarginVertical
              ]}
            >
              BookingHouse version 1.0.0
            </Text>
          </>
        )}
      </ScrollView>
      
      <Pressable
        onPress={() => navigation.navigate('forgoutPassword')}
      >
        <Text>Forgot Password</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('resetPassword', {
          token: 'agnoiueaegrioaeoirn'
        })}
      >
        <Text>Reset Password</Text>
      </Pressable>
    </Screen>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultMarginHorizontal: {
    marginHorizontal: LISTMARGIN,
  },
  userName: {
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  email: {
    marginBottom: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  header: {
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 25,
    marginHorizontal: 70,
  },
  middleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 50,
    borderTopWidth: 2,
    marginTop: 10,
    borderColor: colors.gray_light,
  },
  subheader: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  bodyText: {
    marginTop: 10,
    textAlign: 'center',
    marginHorizontal: 15,
  },
  specialMarginVertical: {
    marginTop: 30,
    marginBottom: 20,
  },
  button: {
    padding: 12,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.primary,
    marginBottom: 15
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.primary,
  },
  brandText: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.gray_light,
  },
});