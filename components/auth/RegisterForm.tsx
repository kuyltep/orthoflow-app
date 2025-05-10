import { Link } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { AuthInput } from "@/components/auth/AuthInput";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/AuthContext";
import { useAppTheme } from "@/context/ThemeContext";
import { showErrorToast } from "@/utils/toastConfig";

export function RegisterForm() {
  const { theme } = useAppTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isLoading } = useAuth();

  const buttonScale = useRef(new Animated.Value(1)).current;

  const handleButtonHoverIn = () => {
    if (Platform.OS === 'web') {
      Animated.spring(buttonScale, {
        toValue: 1.05,
        friction: 3,
        tension: 40,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleButtonHoverOut = () => {
    if (Platform.OS === 'web') {
      Animated.spring(buttonScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      showErrorToast('Ошибка регистрации', 'Пожалуйста, заполните все обязательные поля.');
      return;
    }
    
    if (password.length < 6) {
      showErrorToast('Ошибка регистрации', 'Пароль должен содержать не менее 6 символов.');
      return;
    }

    const success = await register("Пользователь", email, password, "patient");
    
    if (!success) {
      showErrorToast('Ошибка регистрации', 'Регистрация не удалась. Пользователь уже существует или произошла ошибка.');
    }
    // Successful registration will be handled by navigation
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContent}>
        <AuthInput
          label="Введите e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        <AuthInput
          label="Пароль"
          value={password}
          onChangeText={setPassword}
          isPassword
          autoComplete="password"
        />
      </View>
      
      <View style={styles.bottomActions}>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.primary} style={styles.registerButton} />
        ) : (
          <Animated.View 
            style={{ transform: [{ scale: buttonScale }], width: '100%' }}
            onPointerEnter={handleButtonHoverIn}
            onPointerLeave={handleButtonHoverOut}
          >
            <TouchableOpacity onPress={handleRegister} activeOpacity={0.8} style={styles.buttonContainer}>
              <ThemedText
                style={[
                  styles.registerButton,
                  { 
                    borderColor: theme.primary,
                    color: theme.buttonTextColor,
                    backgroundColor: theme.background,
                  },
                ]}
              >
                Регистрация
              </ThemedText>
            </TouchableOpacity>
          </Animated.View>
        )}
        
        <Link href="/(auth)/login" asChild>
          <TouchableOpacity activeOpacity={0.6}>
            <ThemedText
              style={[styles.loginText, { color: theme.primary }]}
            >
              Уже есть аккаунт? Войти
            </ThemedText>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 22,
    justifyContent: "space-around",
  },
  formContent: {
    width: "100%",
    alignItems: "center",
    marginTop: 20, // Add some margin to push inputs down a bit
  },
  bottomActions: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center", // Ensure button text is centered if button itself is smaller
  },
  registerButton: {
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 15,
    paddingVertical: 15,
    fontSize: 16,
    letterSpacing: 1.6,
    textAlign: "center",
    width: "100%",
    fontFamily: "DolamanPavljenko",
  },
  loginText: {
    marginTop: 28,
    fontSize: 16,
    textDecorationLine: "underline",
    fontFamily: "DolamanPavljenko",
    textAlign: "center",
  },
}); 