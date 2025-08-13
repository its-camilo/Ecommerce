import { Stack } from 'expo-router';
// Import config (basePath + history patch) early for web
import '../web-config';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
