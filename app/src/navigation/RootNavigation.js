import { AuthScreen } from '../screens/Auth';
import { AppNavigation } from './AppNavigation';
import { useAuth } from '../hooks';

export function RootNavigation() {
  const { user } = useAuth(); // Assuming you have a user state in your AuthContext

  //const user = null // Replace with actual user state management
  return user ? <AppNavigation /> : <AuthScreen />;
}
