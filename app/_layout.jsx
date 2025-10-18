import "../global.css";
import { Stack } from 'expo-router';
import { GlobalProvider } from '../contexts/GlobalContext';

export default function RootLayout() {
    return (
        <GlobalProvider>
            <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}/>
        </GlobalProvider>
    );
}