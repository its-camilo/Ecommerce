import { AuthScreen } from "../screens/Auth"
import { AppNavigation } from "./AppNavigation"

export function RootNavigation() {
    const user = "Camilo" // Replace with actual user state management
    return user ? <AppNavigation /> : <AuthScreen />
}