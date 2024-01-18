import { QueryClient, QueryClientProvider } from 'react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import StackNavigation from './src/navigation/StackNavigation';
import useCachedResources from './src/hooks/useCachedResources';

import * as SecureStore from 'expo-secure-store';

import * as eva from '@eva-design/eva';
import { theme } from "./src/constants/theme";
import { ApplicationProvider } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import { User } from './src/types/user';
import { AuthContext } from './src/context/context';

export default function App() {
  const queryClient = new QueryClient();
  const isLoadingComplete = useCachedResources();

  const [ user, setUser ] = useState<User | null>(null);
  useEffect(() => {
    async function getUser() {
      const user = await SecureStore.getItemAsync("user");
      if (user) setUser(JSON.parse(user));
    }
    getUser();
  }, [])


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        <ApplicationProvider {...eva} theme={theme}>
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
              <StackNavigation />
            </SafeAreaProvider>
          </QueryClientProvider>
        </ApplicationProvider>
      </AuthContext.Provider>
    );
  }
}
