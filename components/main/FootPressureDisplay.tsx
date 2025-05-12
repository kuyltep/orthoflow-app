import { useAppTheme } from '@/context/ThemeContext';
import React from 'react'; // Removed useEffect, useState, axios
import { Platform, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
// Removed Svg and Path from react-native-svg as we're using expo-image for SVGs
import { Image } from 'expo-image'; // Using expo-image for SVGs

// Removed PressureZone and FootData interfaces
// Removed InsoleSVG component and insolePathData constant

const leftFootImage = require('@/assets/images/left-foot.svg');
const rightFootImage = require('@/assets/images/right-foot.svg');

export function FootPressureDisplay() {
  const { theme } = useAppTheme();
  const { width } = useWindowDimensions();
  // Removed footData, isLoading, error states and useEffect

  const isWeb = Platform.OS === 'web';
  const containerContentWidth = width * (isWeb ? 0.5 : 0.8);
  
  // Assuming the SVGs have an aspect ratio similar to the previous path data for now.
  // This might need adjustment based on the actual SVG dimensions.
  const footAspectRatio = 2.5; // Example: height is 2.5 times width
  const footWidth = containerContentWidth * 0.6; // Each foot takes about 40% of the content width
  const footHeight = footWidth * footAspectRatio;

  const legendCircleSize = Math.max(12, containerContentWidth * 0.045);
  const legendFontSize = Math.max(12, containerContentWidth * 0.025);

  
  // Removed isLoading and error checks

  return (
    <View style={[styles.container, { backgroundColor: theme.secondaryBackground, borderColor: theme.primary }]}>
      <View style={[styles.feetContainer, { width: containerContentWidth }]}>
        <Image 
          source={leftFootImage} 
          style={{ width: footWidth, height: footHeight }}
          contentFit="contain" // Ensures the SVG scales correctly within bounds
        />
        <Image 
          source={rightFootImage} 
          style={{ width: footWidth, height: footHeight }}
          contentFit="contain"
        />
      </View>
      <Text style={[styles.title, { color: theme.text }]}>Уровень нагрузки</Text>

      <View style={[styles.legendContainer, { width: containerContentWidth }]}>
        <Text style={[styles.legendLabel, { color: theme.secondaryText, fontSize: legendFontSize }]}>Низкий</Text>
        <View style={[styles.legendCircle, { backgroundColor: theme.loadLowColor, width: legendCircleSize, height: legendCircleSize, borderRadius: legendCircleSize / 2 }]} />
        <View style={[styles.legendCircle, { backgroundColor: theme.loadMediumLowColor, width: legendCircleSize, height: legendCircleSize, borderRadius: legendCircleSize / 2 }]} />
        <View style={[styles.legendCircle, { backgroundColor: theme.loadMediumHighColor, width: legendCircleSize, height: legendCircleSize, borderRadius: legendCircleSize / 2 }]} />
        <View style={[styles.legendCircle, { backgroundColor: theme.loadHighColor, width: legendCircleSize, height: legendCircleSize, borderRadius: legendCircleSize / 2 }]} />
        <Text style={[styles.legendLabel, { color: theme.secondaryText, fontSize: legendFontSize }]}>Высокий</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '95%',
    maxWidth: 1000,
    padding: Platform.select({web: 25, default: 15}),
    borderRadius: 15,
    borderWidth: 3,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 'auto',
  },
  // Removed centered style as loading/error states are removed
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Platform.select({web: 20, default: 15}),
    marginTop: Platform.select({web: 10, default: 5}), // Keep title below feet
  },
  feetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: Platform.select({web: 25, default: 20}),
  },
  // Removed footSvg style as it's not directly applicable to expo-image in this way
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    marginTop: Platform.select({web: 15, default: 10}),
  },
  legendLabel: {
    marginHorizontal: 5,
    fontWeight: '500',
    textAlign: 'center',
  },
  legendCircle: {
    marginHorizontal: Platform.select({web: 10, default: 5}),
  },
  // Removed footContainer and footLabel from previous version as they are not used
}); 