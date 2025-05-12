import { Image } from "expo-image";
import { Stack } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View, useWindowDimensions } from "react-native";

import { RegisterForm } from "@/components/auth/RegisterForm";
import { useAppTheme } from "@/context/ThemeContext";

export default function RegisterScreen() {
  const { width } = useWindowDimensions();
  const { theme } = useAppTheme();
  const isLargeScreen = Platform.OS === 'web' && width > 768; // Example breakpoint

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View 
        style={[
          styles.contentContainer,
          isLargeScreen && styles.contentContainerLarge
        ]}
      >
        <Image
          source={require("@/assets/images/logo.svg")}
          style={styles.logo}
          contentFit="contain"
        />
        <RegisterForm />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20, // Add some horizontal padding for smaller screens
    paddingVertical: Platform.select({ web: 50, default: 79 }),
    width: '100%', // Default to 100% width
    alignSelf: 'center',
  },
  contentContainerLarge: { // Styles for large web screens
    width: '60%',
    maxWidth: 600, // Add a max width for very large screens
  },
  logo: {
    width: "80%",
    maxWidth: 300, // Max width for logo
    height: 80,
    marginBottom: Platform.select({ web: 40, default: 60 }), // Adjusted marginBottom
  },
}); 