import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { router } from "expo-router";

interface LoginFormProps {
  onLogin: () => void;
  onNavigateToCadastro: () => void;
  onNavigateToEsqueciSenha: () => void;
}

export default function LoginForm({ onLogin, onNavigateToCadastro, onNavigateToEsqueciSenha }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; senha?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!email.includes("@") || !email.includes(".")) newErrors.email = "Digite um email válido.";
    if (!senha) newErrors.senha = "Digite sua senha.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      console.log("Login com:", { email, senha });
      alert("Login realizado com sucesso!");
      onLogin();
    }, 1000);
  };

  return (
    <View className="flex-1 justify-center px-5 bg-white">
      <View className="w-full max-w-[300px] mx-auto">
        <Text className="text-2xl font-bold text-center text-gray-800 mb-1">LOGIN</Text>
        <Text className="text-sm text-center text-gray-500 mb-6">Acesse sua conta</Text>

        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1 uppercase">Email</Text>
          <TextInput
            className={`w-full border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg px-3 py-3 text-base placeholder-gray-400`}
            placeholder="Digite o seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text className="text-xs text-red-500 mt-1">{errors.email}</Text>}
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1 uppercase">Senha</Text>
          <TextInput
            className={`w-full border ${errors.senha ? "border-red-500" : "border-gray-300"} rounded-lg px-3 py-3 text-base placeholder-gray-400`}
            placeholder="Digite o seu senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
          {errors.senha && <Text className="text-xs text-red-500 mt-1">{errors.senha}</Text>}
        </View>

        <TouchableOpacity className="self-end mb-4" onPress={() => router.push("/esqueciS")}>
          <Text className="text-sm text-blue-500">Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`w-full py-3 rounded-full flex items-center justify-center ${isLoading ? "bg-blue-400" : "bg-blue-500"}`}
          disabled={isLoading}
          onPress={handleSubmit}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white font-semibold text-base">Entrar</Text>
          )}
        </TouchableOpacity>

        <View className="mt-8 items-center space-y-2">
          <Text className="text-sm text-gray-500">Não tem uma conta?</Text>
            <TouchableOpacity
            className="w-full border border-gray-300 py-3 rounded-full flex items-center justify-center"
            onPress={() => router.push("/cadastro")}
            >
            <Text className="text-gray-700 font-semibold text-base">Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}