import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react"; // Added useRef for consistency, though not used here
import {
  Animated,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity
} from "react-native";

// Removed direct Colors import, will use theme from context
import { useAppTheme } from "@/context/ThemeContext"; // Import useAppTheme

interface AuthInputProps extends TextInputProps {
  label: string;
  isPassword?: boolean;
}

export function AuthInput({ label, isPassword, ...props }: AuthInputProps) {
  const { theme } = useAppTheme(); // Use our custom theme
  
  const [isFocused, setIsFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);
  const animatedScale = useState(new Animated.Value(1))[0];

  const handleFocus = () => {
    setIsFocused(true);
    Animated.spring(animatedScale, {
      toValue: 1.03,
      friction: 3,
      tension: 40,
      useNativeDriver: true, // Keep true if not affecting layout properties like width/height
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.spring(animatedScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <Animated.View 
      style={[
        styles.inputContainer,
        { transform: [{ scale: animatedScale }] }
      ]}
    >
      <TextInput
        style={[
          styles.input,
          { 
            borderColor: theme.inputBorderColor, // Use theme color
            color: theme.inputTextColor, // Use theme color
            backgroundColor: theme.inputBackground, // Use theme color
          },
          isFocused && { borderColor: theme.primary } // Example: change border on focus using theme
        ]}
        placeholderTextColor={theme.inputPlaceholderColor} // Use theme color
        placeholder={label}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={secureTextEntry}
        {...props}
      />
      {isPassword && (
        <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeIcon}>
          <Ionicons 
            name={secureTextEntry ? "eye-off-outline" : "eye-outline"} 
            size={24} 
            color={theme.inputPlaceholderColor} // Use theme color for icon too
          />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    position: "relative", 
  },
  input: {
    width: "100%", 
    height: 60, 
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 15, // Adjusted for vertical centering
    fontSize: 16,
    fontFamily: "DolamanPavljenko",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 0, 
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5, 
  },
});
