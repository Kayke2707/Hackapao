import React, { useState, useEffect } from "react";
import { 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  ScrollView, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Animated,
  StatusBar
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function Index() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [isFocused, setIsFocused] = useState({ username: false, password: false });
  
  // Animação simples
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: "", password: "" };

    if (!username.trim()) {
      newErrors.username = "Usuário é obrigatório";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulando uma chamada de API
      setTimeout(() => {
        setIsLoading(false);
        router.push("/home");
      }, 1500);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      "Recuperar Senha",
      "Um link de recuperação será enviado para seu email.",
      [{ text: "OK" }]
    );
  };

  const navigateToCadastro = () => {
    router.push("/cadastro");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView 
        className="flex-1 bg-white" 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          className="flex-1 justify-center px-5 py-8"
          style={{ opacity: fadeAnim }}
        >
          {/* Logo ou Ícone */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-indigo-600 rounded-full items-center justify-center">
              <Ionicons name="person-outline" size={40} color="white" />
            </View>
            <Text className="text-2xl font-bold text-center text-gray-800 mt-4">Bem-vindo</Text>
            <Text className="text-gray-500 text-center mt-1">Faça login para continuar</Text>
          </View>

          <View className="space-y-4">
            {/* Campo de Usuário */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1 ml-1">
                Usuário ou Email
              </Text>
              <View className={`flex-row items-center bg-gray-50 rounded-xl px-3 border ${
                isFocused.username 
                  ? "border-indigo-500" 
                  : errors.username 
                    ? "border-red-300" 
                    : "border-gray-200"
              }`}>
                <Ionicons 
                  name="person" 
                  size={18} 
                  color={isFocused.username ? "#4f46e5" : "#6366f1"} 
                />
                <TextInput
                  placeholder="Digite seu usuário"
                  className="py-3 px-2 flex-1 text-gray-700"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  onFocus={() => setIsFocused(prev => ({ ...prev, username: true }))}
                  onBlur={() => setIsFocused(prev => ({ ...prev, username: false }))}
                />
                {username.length > 0 && (
                  <TouchableOpacity 
                    onPress={() => setUsername("")}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons name="close-circle" size={18} color="#9ca3af" />
                  </TouchableOpacity>
                )}
              </View>
              {errors.username ? (
                <Text className="text-red-500 text-xs mt-1 ml-2">{errors.username}</Text>
              ) : null}
            </View>

            {/* Campo de Senha */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1 ml-1">
                Senha
              </Text>
              <View className={`flex-row items-center bg-gray-50 rounded-xl px-3 border ${
                isFocused.password 
                  ? "border-indigo-500" 
                  : errors.password 
                    ? "border-red-300" 
                    : "border-gray-200"
              }`}>
                <Ionicons 
                  name="lock-closed" 
                  size={18} 
                  color={isFocused.password ? "#4f46e5" : "#6366f1"} 
                />
                <TextInput
                  placeholder="Digite sua senha"
                  secureTextEntry={!showPassword}
                  className="py-3 px-2 flex-1 text-gray-700"
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setIsFocused(prev => ({ ...prev, password: true }))}
                  onBlur={() => setIsFocused(prev => ({ ...prev, password: false }))}
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={18}
                    color="#6366f1"
                  />
                </TouchableOpacity>
              </View>
              {errors.password ? (
                <Text className="text-red-500 text-xs mt-1 ml-2">{errors.password}</Text>
              ) : null}
            </View>

            <TouchableOpacity 
              onPress={handleForgotPassword} 
              className="self-end"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text className="text-indigo-600 text-sm font-medium">Esqueceu sua senha?</Text>
            </TouchableOpacity>
            
            {/* Botão de Login */}
            <TouchableOpacity
              className={`${isLoading ? 'bg-indigo-400' : 'bg-indigo-600'} py-3.5 rounded-xl mt-4`}
              onPress={handleLogin}
              disabled={isLoading}
              style={{
                shadowColor: "#4f46e5",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 5,
                elevation: 2
              }}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-center font-semibold text-base">Entrar</Text>
              )}
            </TouchableOpacity>

            <View className="flex-row justify-center items-center mt-6">
              <Text className="text-gray-600">Não tem uma conta? </Text>
              <TouchableOpacity 
                onPress={navigateToCadastro}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text className="text-indigo-600 font-semibold">Criar conta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}