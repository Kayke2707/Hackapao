import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { router } from "expo-router";
import axios from "axios";

const API_URL = "http://192.168.1.100:3000/api";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    if (senha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await axios.post(`${API_URL}/registro`, {
        nome,
        email,
        senha,
      });

      Alert.alert(
        "Sucesso",
        "Conta criada com sucesso! Faça login para continuar.",
        [{ text: "OK", onPress: () => router.push("/login") }]
      );
    } catch (err: any) {
      if (err.response) {
        // Erro retornado pelo servidor
        setError(err.response.data.error || "Erro ao criar conta");
      } else if (err.request) {
        // Erro de conexão
        setError("Não foi possível conectar ao servidor. Verifique sua conexão.");
      } else {
        // Outros erros
        setError("Ocorreu um erro inesperado. Tente novamente.");
      }
      console.error("Erro no cadastro:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-5 bg-[#121212]">
      <View className="w-full max-w-[300px] mx-auto">
        <Text className="text-2xl font-bold text-center text-white mb-1">Cadastro</Text>
        <Text className="text-sm text-center text-white mb-6">Crie sua conta</Text>

        <View className="mb-4">
          <Text className="text-sm font-medium text-white mb-1">Nome</Text>
          <TextInput
            className="w-full border border-gray-300 rounded-xl px-3 py-3 text-base text-white placeholder-white/50"
            placeholder="Digite seu nome"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium text-white mb-1">Email</Text>
          <TextInput
            className="w-full border border-gray-300 rounded-xl px-3 py-3 text-base text-white placeholder-white/50"
            placeholder="Digite seu email"
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
            placeholder="Digite sua senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        </View>

        {error && <Text className="text-xs text-red-500 mb-2">{error}</Text>}

        <TouchableOpacity
          className={`w-full py-2 rounded-xl flex items-center justify-center ${isLoading ? "bg-[#6589E5]/50" : "bg-[#6589E5]"}`}
          disabled={isLoading}
          onPress={handleCadastro}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white font-semibold text-base">Cadastrar</Text>
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