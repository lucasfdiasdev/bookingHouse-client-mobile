import { QueryClient, QueryClientProvider } from 'react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import StackNavigation from './src/navigation/StackNavigation';
import useCachedResources from './src/hooks/useCachedResources';

import * as eva from '@eva-design/eva';
import { theme } from "./src/constants/theme";
import { ApplicationProvider } from '@ui-kitten/components';

export default function App() {
  const queryClient = new QueryClient();
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApplicationProvider {...eva} theme={theme}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <StackNavigation />
          </SafeAreaProvider>
        </QueryClientProvider>
      </ApplicationProvider>
    );
  }
}
