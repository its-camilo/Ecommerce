import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigation } from './TabNavigation';
import { screensName } from '../utils';

const Stack = createNativeStackNavigator();

export function AppNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screensName.tab} component={TabNavigation} />
    </Stack.Navigator>
  );
}
