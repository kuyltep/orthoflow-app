import { useAppTheme } from '@/context/ThemeContext';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';

export function ConnectionStatus() {
  const { theme } = useAppTheme();
  const [isConnected, setIsConnected] = useState(true); // Default to connected for now

  const toggleConnection = () => {
    setIsConnected(previousState => !previousState);
    // Here you would add logic to actually connect/disconnect
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background, shadowColor: theme.text }]}>
      <View style={styles.statusIndicatorContainer}>
        <View 
          style={[
            styles.statusIndicator,
            { backgroundColor: isConnected ? theme.success : theme.error } // Green for connected, red for disconnected
          ]}
        />
        <Text style={[styles.statusText, { color: theme.text }]}>
          {isConnected ? 'Подключено' : 'Отключено'}
        </Text>
      </View>
      <ToggleSwitch
  isOn={isConnected}
  onColor={theme.primary}
  offColor={theme.text}
  size="small"
  onToggle={toggleConnection}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: '100%',
    marginBottom: 20,
    // Adding a bit of elevation/shadow for a card-like feel
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 10,
    backgroundColor: '#4CAF50', // Default to green, will be overridden by theme logic
  },
  statusText: {
    fontSize: Platform.select({ web: 18, default: 16 }),
    fontWeight: '500',
    // fontFamily: 'DolomanPavljenko', // Uncomment when font is integrated
  },
  switch: {
    // transform: Platform.OS === 'ios' ? [{ scaleX: 0.9 }, { scaleY: 0.9 }] : [], // Slightly smaller switch on iOS. Removed for now to check default rendering. 
    // To make track wider than thumb is platform specific and often not directly controllable with basic props.
    // We ensure thumb is white and track has primary color.
  },
}); 