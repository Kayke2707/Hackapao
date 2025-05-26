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
    <View className="flex-1 justify-center px-5 bg-[#121212]">
      <View className="w-full max-w-[300px] mx-auto">
        <Text className="text-2xl font-bold text-center text-white mb-1">Recuperar Senha</Text>
        <Text className="text-sm text-center text-gray-400 mb-6">
          Digite seu email para receber instruções de recuperação
        </Text>

        <View className="mb-4">
          <Text className="text-sm font-medium text-white mb-1 uppercase">Email</Text>
          <TextInput
            className={`w-full border ${error ? "border-red-500" : "border-gray-300"} rounded-lg px-3 py-3 text-base text-white placeholder-gray-400 bg-[#2C2C2C]`}
            placeholder="Digite o seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {error && <Text className="text-xs text-red-500 mt-1">{error}</Text>}
        </View>

        <TouchableOpacity
          className={`w-full py-3 rounded-xl flex items-center justify-center ${isLoading ? "bg-[#6589E5]/50" : "bg-[#6589E5]"}`}
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
          <Text className="text-sm text-gray-400">Lembrou sua senha?</Text>
          <TouchableOpacity
            className="w-full border border-gray-300 py-3 rounded-xl flex items-center justify-center"
            onPress={() => router.push("/login")}
          >
            <Text className="text-white font-semibold text-base">Voltar para o login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}