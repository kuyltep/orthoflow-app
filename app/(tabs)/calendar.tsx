import { useAppTheme } from '@/context/ThemeContext';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

const newBackgroundColor = '#EEFBFF';

export default function CalendarScreen() {
  const { theme } = useAppTheme();
  const isWeb = Platform.OS === 'web';

  return (
    <View style={[
      styles.container,
      { backgroundColor: newBackgroundColor },
      isWeb && styles.webContainer
    ]}>
      <View style={isWeb ? styles.webContent : {flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text style={[styles.text, { color: theme.text }]}>Calendar Screen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webContainer: {
    paddingHorizontal: '10%',
  },
  webContent: {
    maxWidth: 1200,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
}); 