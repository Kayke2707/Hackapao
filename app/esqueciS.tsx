import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { router } from "expo-router";
import axios from "axios";

const API_URL = "http://localhost:3000"; // Ajuste para o IP do seu backend

export default function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Aqui você pode chamar uma rota do backend para enviar o e-mail de recuperação
      await axios.post(`${API_URL}/esqueci-senha`, { email });
      Alert.alert("Verifique seu e-mail", "Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.");
      router.push("/login");
    } catch (err) {
      setError("Erro ao enviar solicitação. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-5 bg-[#121212]">
      <View className="w-full max-w-[300px] mx-auto">
        <Text className="text-2xl font-bold text-center text-white mb-1">Recuperar Senha</Text>
        <Text className="text-sm text-center text-white mb-6">Informe seu e-mail para redefinir a senha</Text>

        <View className="mb-4">
          <Text className="text-sm font-medium text-white mb-1">Email</Text>
          <TextInput
            className="w-full border border-gray-300 rounded-xl px-3 py-3 text-base text-white placeholder-white/50"
            placeholder="Digite o seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {error && <Text className="text-xs text-red-500 mb-2">{error}</Text>}

        <TouchableOpacity
          className={`w-full py-2 rounded-xl flex items-center justify-center ${isLoading ? "bg-[#6589E5]/50" : "bg-[#6589E5]"}`}
          disabled={isLoading}
          onPress={handleSubmit}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white font-semibold text-base">Enviar</Text>
          )}
        </TouchableOpacity>

        <View className="mt-4 items-center">
          <TouchableOpacity
            className="w-full border border-white py-2.5 rounded-xl flex items-center justify-center"
            onPress={() => router.push("/login")}
          >
            <Text className="text-white font-semibold text-base">Voltar ao Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}