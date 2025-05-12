import { useAppTheme } from '@/context/ThemeContext';
import { Image } from 'expo-image';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const footLogo = require('@/assets/images/foot-logo.svg');

export function MainHeader() {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <View 
      style={[
        styles.container,
        { 
          backgroundColor: theme.background, 
          paddingTop: Platform.OS === 'ios' ? insets.top : insets.top + 10, 
          paddingBottom: 10 
        }
      ]}
    >
      <Text style={[styles.title, { color: theme.text }]}>Наступи, чтобы начать</Text>
      <Image source={footLogo} style={styles.logo} contentFit="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
    // Shadow for elevation - might need adjustment per platform
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5, // For Android
  },
  title: {
    fontSize: Platform.select({ web: 24, default: 20 }),
    fontWeight: 'bold',
    // fontFamily: 'DolomanPavljenko', // Uncomment when font is integrated
  },
  logo: {
    width: Platform.select({ web: 40, default: 30 }),
    height: Platform.select({ web: 40, default: 30 }),
  },
}); 