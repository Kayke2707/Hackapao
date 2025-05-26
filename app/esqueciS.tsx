import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { router } from "expo-router";

interface EsqueciSenhaFormProps {
  onNavigateToLogin: () => void;
}

export default function EsqueciSenhaForm({ onNavigateToLogin }: EsqueciSenhaFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value: string) => {
    return /\S+@\S+\.\S+/.test(value);
  };

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setError("Digite um email válido.");
      return;
    }

    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      console.log("Recuperação de senha para:", email);
      setIsLoading(false);
      alert("Instruções de recuperação enviadas para " + email);
      router.push("/login");
    }, 1000);
  };

  return (
    <View className="flex-1 justify-center px-5 bg-white">
      <View className="w-full max-w-[300px] mx-auto">
        <Text className="text-2xl font-bold text-center text-gray-800 mb-1">Recuperar Senha</Text>
        <Text className="text-sm text-center text-gray-500 mb-6">
          Digite seu email para receber instruções de recuperação
        </Text>

        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1 uppercase">Email</Text>
          <TextInput
            className={`w-full border ${error ? "border-red-500" : "border-gray-300"} rounded-lg px-3 py-3 text-base placeholder-gray-400`}
            placeholder="Digite o seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {error && <Text className="text-xs text-red-500 mt-1">{error}</Text>}
        </View>

        <TouchableOpacity
          className={`w-full py-3 rounded-full flex items-center justify-center ${isLoading ? "bg-blue-400" : "bg-blue-500"}`}
          disabled={isLoading}
          onPress={handleSubmit}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white font-semibold text-base">Enviar</Text>
          )}
        </TouchableOpacity>

        <View className="mt-8 items-center space-y-2">
          <Text className="text-sm text-gray-500">Lembrou sua senha?</Text>
          <TouchableOpacity
            className="w-full border border-gray-300 py-3 rounded-full flex items-center justify-center"
            onPress={() => router.push("/login")}
          >
            <Text className="text-gray-700 font-semibold text-base">Voltar para o login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}