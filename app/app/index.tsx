import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { RootNavigation } from '../src/navigation';
import { AuthProvider, SearchProvider } from '../src/contexts';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function Index() {
  return (
    <AuthProvider>
      <SearchProvider>
        <PaperProvider>
          <RootSiblingParent>
            <RootNavigation />
          </RootSiblingParent>
        </PaperProvider>
      </SearchProvider>
    </AuthProvider>
  );
}
