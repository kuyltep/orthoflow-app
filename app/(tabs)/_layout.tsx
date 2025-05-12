import { useAppTheme } from '@/context/ThemeContext';
import { Image } from 'expo-image';
import { Tabs } from 'expo-router';
import React, { useRef } from 'react';
import { Animated, Easing, Platform, ViewStyle } from 'react-native';

// Import SVG icons
// For Expo Router, it's often easier to use require for static assets like icons in the tab bar
const homeIcon = require('@/assets/images/sidebar/home.svg');
const messageIcon = require('@/assets/images/sidebar/message.svg');
const calendarIcon = require('@/assets/images/sidebar/calendar.svg');
const userIcon = require('@/assets/images/sidebar/user.svg');

interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
  source: any; // Adjust type if using a library for SVGs that provides better typing
}

function TabBarIcon({ focused, color, size, source }: TabBarIconProps) {
  const { theme } = useAppTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const handleHoverIn = () => {
    if (Platform.OS === 'web') {
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false, // Animated.View style 'transform' is not supported by native animated module
      }).start();
    }
  };

  const handleHoverOut = () => {
    if (Platform.OS === 'web') {
      Animated.timing(scale, {
        toValue: 1,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <Animated.View 
      style={{ transform: [{ scale }] }} 
      //@ts-ignore - onPointerEnter and onPointerLeave are web-specific but work
      onPointerEnter={handleHoverIn} 
      onPointerLeave={handleHoverOut}
    >
      <Image 
        source={source} 
        style={{
          width: size,
          height: size,
          tintColor: focused ? color : theme.secondaryText 
        }} 
        contentFit="contain" 
      />
    </Animated.View>
  );
}

export default function TabLayout() {
  const { theme } = useAppTheme();

  const tabBarStyle: ViewStyle = {
    backgroundColor: theme.background,
    borderTopColor: theme.background, 
    height: Platform.select({ ios: 80, default: 60 }), // Adjusted height for icon-only
    paddingBottom: Platform.select({ ios: 20, default: 5 }), // Adjusted padding
    paddingTop: 5, // Adjusted padding
  };

  if (Platform.OS === 'web') {
    Object.assign(tabBarStyle, {
      position: 'fixed' as const, 
      bottom: 0, // Kept at bottom
      left: '50%', // Centering the tab bar itself for web aesthetic
      transform: 'translateX(-50%)' as any, // TS workaround for transform string
      width: '70%', // Auto width based on content
      maxWidth: '500px', // Max width for the tab bar on web
      paddingHorizontal: 20, // Padding inside the tab bar
      borderRadius: 30, // Rounded corners for the tab bar on web
      marginBottom: 20, // Margin at the bottom for web
      borderTopWidth: Platform.OS ==='web' ? 1 : 0,
      borderColor: theme.secondaryText,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 10,
    });
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.secondaryText,
        tabBarStyle: tabBarStyle,
        tabBarShowLabel: false, // Hide labels
      }}
    >
      <Tabs.Screen
        name="main"
        options={{
          // title: 'Main', // Label removed
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarIcon source={homeIcon} color={theme.primary} focused={focused} size={focused ? size + 2 : size} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          // title: 'Chat', // Label removed
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarIcon source={messageIcon} color={theme.primary} focused={focused} size={focused ? size + 2 : size} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          // title: 'Calendar', // Label removed
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarIcon source={calendarIcon} color={theme.primary} focused={focused} size={focused ? size + 2 : size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          // title: 'Profile', // Label removed
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarIcon source={userIcon} color={theme.primary} focused={focused} size={focused ? size + 2 : size} />
          ),
        }}
      />
    </Tabs>
  );
}
