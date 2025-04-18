import { PaperProvider } from 'react-native-paper';
import {RootNavigation} from '../src/navigation';

export default function Index() {
  return (
    <PaperProvider>
      <RootNavigation />
    </PaperProvider>
  );
}
