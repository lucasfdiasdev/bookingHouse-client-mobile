import { 
  useContext, 
  useEffect 
} from "react";
import { useQueryClient } from "react-query";
import { useNavigation } from "@react-navigation/native";

import * as SecureStore from 'expo-secure-store';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as AppleAuthentication from "expo-apple-authentication";

import { useUser } from "./useUser";
import { User } from "../types/user";
import { useLoading } from "./useLoading";
import { AuthContext } from "../context/context"
import { 
  appleLoginOrRegister, 
  googleLoginOrRegister, 
  facebookLoginOrRegister, 
} from "../services/user";

export const useAuth = () => {

  const [___, googleResponse, googleAuth ] = Google.useAuthRequest({
    expoClientId: "611513721528-6t92tdms9vhv6lp1sssq8nurt5kt79te.apps.googleusercontent.com",
    iosClientId: "611513721528-b42ufbk870qtgtdjtqkmhd4trqrlp6qq.apps.googleusercontent.com",
    androidClientId: "611513721528-kkg3f4glsmevg21e0mpq4m2ibmv80lpk.apps.googleusercontent.com",
    webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    selectAccount: true,
  });

  const [ _, __, fbPromptAsync ] = Facebook.useAuthRequest({
    clientId: "249249161545512"
  });

  useEffect(() => {
    async function loginUserWithGoogle(access_token: string) {
      try {
        setLoading(true);
        const user = await googleLoginOrRegister(access_token);
        handleSignInUser(user);

      } catch (error) {
        handleAuthError();
      } finally {
        setLoading(false);
      }
    }

    if (googleResponse?.type === "success") {
      const { access_token } = googleResponse.params;
      loginUserWithGoogle(access_token);
    }
  }, [googleResponse]);

  const queryClient = useQueryClient();
  const { user, setUser } = useContext(AuthContext);
  
  
  const { setLoading } = useLoading();
  const { goBack } = useNavigation() as any;
  const handleAuthError = () => alert("Unable to authorize");

  const login = (user: User) => {
    let stringUser = JSON.stringify(user);
    setUser(user);
    SecureStore.setItemAsync("user", stringUser);
    queryClient.removeQueries();
  };

  const handleSignInUser = (user?: User | null) => {
    if(user) {
      login(user);
      goBack();
    };
  };

  const facebookAuth = async () => {
    try {
      const response = await fbPromptAsync();
      if(response.type === 'success') {
        const { access_token } = response.params;
        setLoading(true);
  
       const user = await facebookLoginOrRegister(access_token);
       handleSignInUser(user);
  
      };
      
    } catch (error) {
      handleAuthError();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    SecureStore.deleteItemAsync("user");
    queryClient.clear();
  };

  const appleAuth = async () => {
    try {
      const { identityToken } = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      });

      if (identityToken) {
        setLoading(true);

        const user = await appleLoginOrRegister(identityToken);
        handleSignInUser(user);
      }
    } catch (error) {
      handleAuthError();
    } finally {
      setLoading(false);
    }
  };
  
  return { user, login, logout, googleAuth, appleAuth, facebookAuth };

}