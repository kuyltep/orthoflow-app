export interface AppTheme {
  // Colors
  primary: string;
  background: string;
  text: string;
  secondaryText: string;
  placeholderText: string;
  error: string;
  // Components specific colors or styles could also go here
  buttonTextColor: string;
  inputBackground: string;
  inputTextColor: string;
  inputPlaceholderColor: string;
  inputBorderColor: string; // For focused/unfocused states if needed
}

export const lightTheme: AppTheme = {
  primary: "#579AE2",
  background: "#FFFFFF",
  text: "#1F2937", // Dark gray for primary text
  secondaryText: "#6B7280", // Medium gray for secondary text
  placeholderText: "#9CA3AF", // Lighter gray for placeholders
  error: "#EF4444", // Red for errors

  buttonTextColor: "#579AE2", // Primary color for text on white button
  inputBackground: "#579AE2", // Primary color for input background
  inputTextColor: "#FFFFFF", // White text for input
  inputPlaceholderColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent white for input placeholder
  inputBorderColor: "transparent", // Default input border
};

export const darkTheme: AppTheme = {
  // Define your dark theme colors here later
  // For now, it can be a copy of lightTheme or adjusted values
  primary: "#579AE2", // Keep primary accent the same, or adjust
  background: "#1F2937", // Dark background
  text: "#F9FAFB", // Light gray / white for text
  secondaryText: "#D1D5DB",
  placeholderText: "#9CA3AF",
  error: "#F87171", // Lighter red for dark mode

  buttonTextColor: "#1F2937", // Dark text for button on light primary background or white
  inputBackground: "#374151", // Darker input background
  inputTextColor: "#F9FAFB",
  inputPlaceholderColor: "#9CA3AF",
  inputBorderColor: "#4B5563",
};

// Initially, we can just export the lightTheme as the default
// Later, ThemeContext will manage which theme is active. 