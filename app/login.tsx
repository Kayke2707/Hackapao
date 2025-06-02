import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.100:3000/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !senha) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        senha,
      });

      // Salva os dados do usuário
      await AsyncStorage.setItem("userData", JSON.stringify(response.data));
      
      // Navega para a tela de perguntas
      router.push("/perguntas");
    } catch (err: any) {
      if (err.response) {
        // Erro retornado pelo servidor
        setError(err.response.data.error || "Erro ao fazer login");
      } else if (err.request) {
        // Erro de conexão
        setError("Não foi possível conectar ao servidor. Verifique sua conexão.");
      } else {
        // Outros erros
        setError("Ocorreu um erro inesperado. Tente novamente.");
      }
      console.error("Erro no login:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-5 bg-[#121212]">
      <View className="w-full max-w-[300px] mx-auto">
        <Text className="text-2xl font-bold text-center text-white mb-1">Login</Text>
        <Text className="text-sm text-center text-white mb-6">Entre com suas credenciais</Text>

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

        <View className="mb-4">
          <Text className="text-sm font-medium text-white mb-1">Senha</Text>
          <TextInput
            className="w-full border border-gray-300 rounded-xl px-3 py-3 text-base text-white placeholder-white/50"
            placeholder="Digite a sua senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        </View>

        {error && <Text className="text-xs text-red-500 mb-2">{error}</Text>}

        <TouchableOpacity
          className={`w-full py-2 rounded-xl flex items-center justify-center ${isLoading ? "bg-[#6589E5]/50" : "bg-[#6589E5]"}`}
          disabled={isLoading}
          onPress={handleLogin}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white font-semibold text-base">Entrar</Text>
          )}
        </TouchableOpacity>

        <View className="mt-4 items-center">
          <TouchableOpacity
            className="w-full border border-white py-2.5 rounded-xl flex items-center justify-center"
            onPress={() => router.push("/cadastro")}
          >
            <Text className="text-white font-semibold text-base">Criar Conta</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="mt-4"
          onPress={() => router.push("/esqueciS")}
        >
          <Text className="text-white text-center">Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}