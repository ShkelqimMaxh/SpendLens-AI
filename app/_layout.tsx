import { Stack } from 'expo-router';
import { useCallback } from 'react';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { COLORS } from '../constants/theme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="onboarding" 
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="(dashboard)" 
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="chat" 
          options={{
            headerTitle: "SpendLens AI",
            headerStyle: {
              backgroundColor: COLORS.background.primary,
            },
            headerShadowVisible: false,
            headerTintColor: COLORS.text.primary,
          }}
        />
        <Stack.Screen 
          name="goals" 
          options={{
            headerTitle: "Financial Goals",
            headerStyle: {
              backgroundColor: COLORS.background.primary,
            },
            headerShadowVisible: false,
            headerTintColor: COLORS.text.primary,
          }}
        />
        <Stack.Screen 
          name="income" 
          options={{
            headerTitle: "Income & Spending",
            headerStyle: {
              backgroundColor: COLORS.background.primary,
            },
            headerShadowVisible: false,
            headerTintColor: COLORS.text.primary,
          }}
        />
      </Stack>
    </View>
  );
}
