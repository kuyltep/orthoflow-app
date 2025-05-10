import Toast, { ToastShowParams } from 'react-native-toast-message';

interface CustomToastProps {
  text1: string;
  text2: string;
  type?: 'success' | 'error' | 'info';
}

const defaultToastOptions: Omit<ToastShowParams, 'text1' | 'text2' | 'type'> = {
  position: 'top',
  visibilityTime: 3000,
  autoHide: true,
  topOffset: 60, // Adjusted for better visibility from the top right
  // You can add more default options here if needed
  // e.g., specific styles for onShow, onHide, onPress
};


export function showToast({
  text1,
  text2,
  type = 'info', // Default to info if no type is provided
}: CustomToastProps) {
  Toast.show({
    ...defaultToastOptions,
    type,
    text1,
    text2,
  });
}

export function showErrorToast(text1: string, text2: string) {
  showToast({ type: 'error', text1, text2 });
}

export function showSuccessToast(text1: string, text2: string) {
  showToast({ type: 'success', text1, text2 });
}

export function showInfoToast(text1: string, text2: string) {
  showToast({ type: 'info', text1, text2 });
} 