import {
    DefaultTheme as NavigationDefaultTheme,
    ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import "react-native-reanimated";
import Toast from 'react-native-toast-message';

import { AuthProvider, useAuth } from "@/context/AuthContext";
import { QueryProvider } from "@/context/QueryProvider";
import { AppThemeProvider, useAppTheme } from "@/context/ThemeContext";

// Protected route component
function ProtectedRouteGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading: isAuthLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isRouterReady, setIsRouterReady] = useState(false);

  useEffect(() => {
    // Wait for the router to be ready before performing navigation.
    // This can help prevent navigation actions before the router has fully initialized.
    if (router) setIsRouterReady(true);
  }, [router]);

  useEffect(() => {
    if (isAuthLoading || !isRouterReady) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)/main");
    }
  }, [user, segments, isAuthLoading, router, isRouterReady]);
  
  // Render children only when auth state is resolved and router is ready, 
  // and navigation logic has had a chance to run.
  // Or if we are in an auth route and no user (e.g. on login page)
  // Or if we have a user and are not in an auth route (e.g. on main page)
  if (isAuthLoading || !isRouterReady) {
    return null; // Loader is handled by RootLayoutContent now
  }

  return <>{children}</>;
}

function RootLayoutContent() {
  const { theme: appTheme, isDarkMode } = useAppTheme();
  const { isLoading: isAuthLoading, user } = useAuth();
  
  const [loaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    DolamanPavljenko: require("../assets/fonts/DolomanPavljenko.otf"),
  });

  // It might take a frame or two for router to be ready and navigation to occur.
  // The loader handles AuthLoading and font loading.
  if (isAuthLoading || (!loaded && !fontError)) {
    return (
      <View style={[styles.loaderContainer, { backgroundColor: appTheme.background }]}>
        <ActivityIndicator size="large" color={appTheme.primary} />
      </View>
    );
  }
  
  // If font fails to load, you might want to throw an error or use a fallback
  if (fontError) {
    console.error("Font loading error: ", fontError);
    // Optionally return a fallback UI or throw error
  }

  // Adapt React Navigation's theme to our custom app theme
  const navigationTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      background: appTheme.background,
      text: appTheme.text,
      primary: appTheme.primary,
    },
  };

  return (
    <NavigationThemeProvider value={navigationTheme}>
      <ProtectedRouteGuard>
        <Stack 
          initialRouteName="(auth)"
          screenOptions={{
            headerStyle: {
              backgroundColor: appTheme.background,
            },
            headerTintColor: appTheme.text,
            headerTitleStyle: {
              fontFamily: 'DolamanPavljenko',
              color: appTheme.text,
            },
          }}
        >
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ProtectedRouteGuard>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <QueryProvider>
      <AuthProvider>
        <AppThemeProvider>
          <RootLayoutContent />
          <Toast />
        </AppThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

