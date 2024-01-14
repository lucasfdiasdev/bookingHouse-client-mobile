import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';

import StackNavigation from './src/navigation/StackNavigation';
import useCachedResources from './src/hooks/useCachedResources';

export default function App() {
  const queryCleint = new QueryClient();
  const isLoadingComplete = useCachedResources();

  if(!isLoadingComplete) {
    return null;

  } else {

    return (
      <QueryClientProvider client={queryCleint}>
        <SafeAreaProvider>
          <StackNavigation/>
        </SafeAreaProvider>
      </QueryClientProvider>
    );
  }

};
