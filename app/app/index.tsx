import { PaperProvider } from 'react-native-paper';
import {RootNavigation} from '../src/navigation';
import {AuthProvider} from "../src/contexts"
import { RootSiblingParent } from 'react-native-root-siblings';

export default function Index() {
  return (
    <AuthProvider>
      <PaperProvider>
        <RootSiblingParent>
          <RootNavigation />
        </RootSiblingParent>
      </PaperProvider>
    </AuthProvider>
  );
}
