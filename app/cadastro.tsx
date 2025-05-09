import React, { useState, useEffect } from "react";
import { 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
  Animated,
  Dimensions
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Cadastro() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [isFocused, setIsFocused] = useState({
    username: false,
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  // Animações simples
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpar erro quando o usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validação de usuário
    if (!formData.username.trim()) {
      newErrors.username = "Usuário é obrigatório";
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = "Usuário deve ter pelo menos 3 caracteres";
      isValid = false;
    }

    // Validação de nome
    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
      isValid = false;
    }

    // Validação de email
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
      isValid = false;
    }

    // Validação de senha
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
      isValid = false;
    }

    // Validação de confirmação de senha
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCadastro = () => {
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulando uma chamada de API
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert(
          "Cadastro Realizado",
          "Sua conta foi criada com sucesso!",
          [
            { 
              text: "Entrar", 
              onPress: () => router.push("/home") 
            }
          ]
        );
      }, 1500);
    }
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
          className="flex-1 px-5 py-8"
          style={{ opacity: fadeAnim }}
        >
          {/* Cabeçalho */}
          <View className="flex-row items-center mb-6">
            <TouchableOpacity 
              className="p-2 -ml-2" 
              onPress={() => router.back()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color="#4f46e5" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-800 ml-2">Criar Conta</Text>
          </View>

          <View className="space-y-4 mb-6">
            {/* Campo de Usuário */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1 ml-1">
                Nome de usuário
              </Text>
              <View className={`flex-row items-center bg-gray-50 rounded-xl px-3 border ${
                isFocused.username 
                  ? "border-indigo-500" 
                  : errors.username 
                    ? "border-red-300" 
                    : "border-gray-200"
              }`}>
                <Ionicons 
                  name="at" 
                  size={18} 
                  color={isFocused.username ? "#4f46e5" : "#6366f1"} 
                />
                <TextInput 
                  placeholder="Seu nome de usuário" 
                  className="py-3 px-2 flex-1 text-gray-700"
                  value={formData.username}
                  onChangeText={(text) => handleChange("username", text)}
                  autoCapitalize="none"
                  onFocus={() => setIsFocused(prev => ({ ...prev, username: true }))}
                  onBlur={() => setIsFocused(prev => ({ ...prev, username: false }))}
                />
                {formData.username.length > 0 && (
                  <TouchableOpacity 
                    onPress={() => handleChange("username", "")}
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

            {/* Campo de Nome */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1 ml-1">
                Nome completo
              </Text>
              <View className={`flex-row items-center bg-gray-50 rounded-xl px-3 border ${
                isFocused.name 
                  ? "border-indigo-500" 
                  : errors.name 
                    ? "border-red-300" 
                    : "border-gray-200"
              }`}>
                <Ionicons 
                  name="person" 
                  size={18} 
                  color={isFocused.name ? "#4f46e5" : "#6366f1"} 
                />
                <TextInput 
                  placeholder="Seu nome completo" 
                  className="py-3 px-2 flex-1 text-gray-700"
                  value={formData.name}
                  onChangeText={(text) => handleChange("name", text)}
                  onFocus={() => setIsFocused(prev => ({ ...prev, name: true }))}
                  onBlur={() => setIsFocused(prev => ({ ...prev, name: false }))}
                />
                {formData.name.length > 0 && (
                  <TouchableOpacity 
                    onPress={() => handleChange("name", "")}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons name="close-circle" size={18} color="#9ca3af" />
                  </TouchableOpacity>
                )}
              </View>
              {errors.name ? (
                <Text className="text-red-500 text-xs mt-1 ml-2">{errors.name}</Text>
              ) : null}
            </View>

            {/* Campo de Email */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1 ml-1">
                Email
              </Text>
              <View className={`flex-row items-center bg-gray-50 rounded-xl px-3 border ${
                isFocused.email 
                  ? "border-indigo-500" 
                  : errors.email 
                    ? "border-red-300" 
                    : "border-gray-200"
              }`}>
                <Ionicons 
                  name="mail" 
                  size={18} 
                  color={isFocused.email ? "#4f46e5" : "#6366f1"} 
                />
                <TextInput 
                  placeholder="seu@email.com" 
                  className="py-3 px-2 flex-1 text-gray-700"
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setIsFocused(prev => ({ ...prev, email: true }))}
                  onBlur={() => setIsFocused(prev => ({ ...prev, email: false }))}
                />
                {formData.email.length > 0 && (
                  <TouchableOpacity 
                    onPress={() => handleChange("email", "")}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons name="close-circle" size={18} color="#9ca3af" />
                  </TouchableOpacity>
                )}
              </View>
              {errors.email ? (
                <Text className="text-red-500 text-xs mt-1 ml-2">{errors.email}</Text>
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
                  placeholder="Crie uma senha forte" 
                  secureTextEntry={!showPassword}
                  className="py-3 px-2 flex-1 text-gray-700"
                  value={formData.password}
                  onChangeText={(text) => handleChange("password", text)}
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

            {/* Campo de Confirmação de Senha */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1 ml-1">
                Confirmar senha
              </Text>
              <View className={`flex-row items-center bg-gray-50 rounded-xl px-3 border ${
                isFocused.confirmPassword 
                  ? "border-indigo-500" 
                  : errors.confirmPassword 
                    ? "border-red-300" 
                    : "border-gray-200"
              }`}>
                <Ionicons 
                  name="lock-closed" 
                  size={18} 
                  color={isFocused.confirmPassword ? "#4f46e5" : "#6366f1"} 
                />
                <TextInput 
                  placeholder="Confirme sua senha" 
                  secureTextEntry={!showPassword}
                  className="py-3 px-2 flex-1 text-gray-700"
                  value={formData.confirmPassword}
                  onChangeText={(text) => handleChange("confirmPassword", text)}
                  onFocus={() => setIsFocused(prev => ({ ...prev, confirmPassword: true }))}
                  onBlur={() => setIsFocused(prev => ({ ...prev, confirmPassword: false }))}
                />
              </View>
              {errors.confirmPassword ? (
                <Text className="text-red-500 text-xs mt-1 ml-2">{errors.confirmPassword}</Text>
              ) : null}
            </View>
          </View>

          {/* Botão de Cadastrar */}
          <View className="mt-2">
            <TouchableOpacity 
              className={`${isLoading ? 'bg-indigo-400' : 'bg-indigo-600'} py-3.5 rounded-xl`} 
              onPress={handleCadastro}
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
                <Text className="text-white text-center font-semibold text-base">
                  Criar Conta
                </Text>
              )}
            </TouchableOpacity>
            
            {/* Termos e Condições */}
            <Text className="text-gray-500 text-xs text-center mt-4">
              Ao criar uma conta, você concorda com nossos{" "}
              <Text className="text-indigo-600">Termos de Serviço</Text> e{" "}
              <Text className="text-indigo-600">Política de Privacidade</Text>
            </Text>
            
            {/* Voltar para login */}
            <View className="flex-row justify-center items-center mt-6">
              <Text className="text-gray-600">Já tem uma conta? </Text>
              <TouchableOpacity onPress={() => router.push("/")}>
                <Text className="text-indigo-600 font-semibold">Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}