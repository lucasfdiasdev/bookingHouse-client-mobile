import { Dimensions, Platform, StatusBar } from "react-native";

export const LISTMARGIN = 10;
export const WIDTH = Dimensions.get('screen').width - LISTMARGIN * 2;

const baseHeight = 160;
const iosNotch = 40;
const iosHeight = baseHeight + iosNotch;
let androidHeight = baseHeight;
let androidNotch = 0;
if (StatusBar.currentHeight) androidNotch = StatusBar.currentHeight;
androidHeight += androidNotch;

export const HEADERHEIGHT = Platform.OS === "ios" ? iosHeight : androidHeight;

const serverUrl = 'http://192.168.0.107:4000/api';
const location = '/location';
const user = '/user';
const locationEndpoint = serverUrl + location;
const userEndpoint = serverUrl + user;

export const endpoints = {
  login: userEndpoint + '/login',
  apple: userEndpoint + '/apple',
  google: userEndpoint + '/google',
  register: userEndpoint + '/register',
  facebook: userEndpoint + '/facebook',
  search: locationEndpoint + '/search',
  autoComplete: locationEndpoint + '/autocomplete',
};