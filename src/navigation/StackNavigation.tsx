import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';

import { colors } from '../constants/Colors';

import HomeScreen from '../screen/HomeScreen';
import ChatScreen from '../screen/ChatScreen';
import LoginScreen from '../screen/LoginScreen';
import SearchScreen from '../screen/SearchScreen';
import ProfileScreen from '../screen/ProfileScreen';
import ResetPassword from '../screen/ResetPassword';
import FavoriteScreen from '../screen/FavoriteScreen';
import RegisterScreen from '../screen/RegisterScreen';
import ForgoutPassword from '../screen/ForgoutPassword';
import FindLocationScreen from '../screen/FindLocationScreen';

const StackNavigation = () => {

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function BottomTabs() {
    return(
      <Tab.Navigator
        initialRouteName='home'
      >
        <Tab.Screen
          name='home'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: {color: '#008e97'},
            headerShown: false,
            tabBarIcon: ({ focused}) => 
            focused ? (
              <Entypo name="home" size={24} color={colors.color_stack} />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            )
          }}
        />
        <Tab.Screen
          name='search'
          component={SearchScreen}
          options={{
            tabBarLabel: 'Buscar',
            tabBarLabelStyle: {color: '#008e97'},
            headerShown: false,
            tabBarIcon: ({ focused}) => 
            focused ? (
              <AntDesign name="search1" size={24} color={colors.color_stack} />
            ) : (
              <AntDesign name="search1" size={24} color="black" />
            )
          }}
        />
        <Tab.Screen
          name='favorite'
          component={FavoriteScreen}
          options={{
            tabBarLabel: 'Favoritos',
            tabBarLabelStyle: {color: '#008e97'},
            headerShown: false,
            tabBarIcon: ({ focused }) => 
            focused ? (
              <AntDesign name="heart" size={24} color={colors.color_stack} />
            ) : (
              <AntDesign name="hearto" size={24} color="black" />
            )
          }}
        />
        <Tab.Screen
          name='chat'
          component={ChatScreen}
          options={{
            tabBarLabel: 'Chat',
            tabBarLabelStyle: {color: '#008e97'},
            headerShown: false,
            tabBarIcon: ({ focused }) => 
            focused ? (
              <Ionicons name="chatbox-ellipses" size={24} color={colors.color_stack} />
            ) : (
              <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
            )
          }}
        />
        <Tab.Screen
          name='profile'
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Perfil',
            tabBarLabelStyle: {color: '#008e97'},
            headerShown: false,
            tabBarIcon: ({ focused}) => 
            focused ? (
              <Ionicons name="person" size={24} color={colors.color_stack} />
            ) : (
              <Ionicons name="person-outline" size={24} color="black" />
            )
          }}
        />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name='tabs'
          component={BottomTabs}
        />
        <Stack.Screen
          name='findLocation'
          component={FindLocationScreen}
        />
        <Stack.Screen
          name='resetPassword'
          component={ResetPassword}
        />
        <Stack.Screen
          name='forgoutPassword'
          component={ForgoutPassword}
        />
        <Stack.Screen
          name='login'
          component={LoginScreen}
        />
        <Stack.Screen
          name='register'
          component={RegisterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;