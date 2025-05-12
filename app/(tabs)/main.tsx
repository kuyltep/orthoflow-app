import { ConnectionStatus } from '@/components/main/ConnectionStatus';
import { FootPressureDisplay } from '@/components/main/FootPressureDisplay';
import { MainHeader } from '@/components/main/MainHeader';
import { WalkingIntensityGraph } from '@/components/main/WalkingIntensityGraph';
import { useAppTheme } from '@/context/ThemeContext';
import { Stack } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';

export default function MainScreen() {
  const { theme } = useAppTheme();
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';

  // Determine if the screen is large enough for centered content
  const useCenteredLayout = isWeb && width > 1024; // Updated breakpoint

  return (
    <View style={[styles.fullScreenContainer, { backgroundColor: theme.secondaryBackground }, useCenteredLayout && styles.contentWrapperWebContainer]}>
      <Stack.Screen options={{ headerShown: false }} />
        <MainHeader />
      <View style={[styles.contentWrapper, useCenteredLayout && styles.contentWrapperWeb]}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollViewContent,
            // useCenteredLayout && styles.scrollViewContentWeb // Not needed if parent centers
          ]}
          showsVerticalScrollIndicator={false}
        >
          <ConnectionStatus />
          <FootPressureDisplay />
          <WalkingIntensityGraph />
          {/* Add WalkingIntensityGraph placeholder here later if needed */}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
  },
  contentWrapperWebContainer: { // New style to center the contentWrapperWeb
    alignItems: 'center', // This will center the contentWrapperWeb
  },
  contentWrapper: { // New wrapper for the scroll view
    flex: 1,
    width: '100%', // Default full width
    paddingHorizontal: 20, // Optional: if you want padding *around* the max-width box. Let's keep it for now.

  },
  contentWrapperWeb: { // Styles for centering content on web
    // alignSelf: 'center', // Removed as parent will center it
    maxWidth: 1024, // Max width for content area on web
    width: '100%', // Ensures it takes up to 1024px but can be smaller
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: Platform.select({ web: 100, default: 120 }),
  },
  // scrollViewContentWeb: { // If specific styling for scroll content on web needed
  //   maxWidth: '100%', // Ensure it takes up the centered wrapper's width
  // },
}); 