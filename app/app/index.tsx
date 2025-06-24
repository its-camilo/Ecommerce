import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { RootNavigation } from '../src/navigation';
import { AuthProvider, SearchProvider, CartProvider } from '../src/contexts';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function Index() {
  return (
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <PaperProvider>
            <RootSiblingParent>
              <RootNavigation />
            </RootSiblingParent>
          </PaperProvider>
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  );
}
