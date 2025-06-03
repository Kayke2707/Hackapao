import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { router } from "expo-router";

interface CadastroFormProps {
  onCadastro: () => void;
  onNavigateToLogin: () => void;
}

export default function CadastroForm({ onCadastro, onNavigateToLogin }: CadastroFormProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ nome?: string; email?: string; senha?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (nome.trim().length < 2) newErrors.nome = "Nome deve ter pelo menos 2 caracteres.";
    if (!email.includes("@") || !email.includes(".")) newErrors.email = "Digite um email válido.";
    if (senha.length < 6) newErrors.senha = "Senha deve ter pelo menos 6 caracteres.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      alert("Cadastro realizado com sucesso!");
      router.push("/home");
    }, 1000);
  };

  return (
    <View className="flex-1 justify-center px-5 bg-[#121212]">
      <View className="w-full max-w-[300px] mx-auto">
        <Text className="text-2xl font-bold text-center text-white mb-1">CADASTRO</Text>
        <Text className="text-sm text-center text-white mb-6">Crie uma conta</Text>

        <View className="mb-4">
          <Text className="text-sm font-medium text-white mb-1">Nome</Text>
          <TextInput
            className={`w-full border ${errors.nome ? "border-red-500" : "border-gray-300"} rounded-xl px-3 py-3 text-base text-white placeholder-white/50`}
            placeholder="Digite o seu nome"
            value={nome}
            onChangeText={setNome}
          />
          {errors.nome && <Text className="text-xs text-red-500 mt-1">{errors.nome}</Text>}
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium text-white mb-1">Email</Text>
          <TextInput
            className={`w-full border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-xl px-3 py-3 text-base text-white placeholder-white/50`}
            placeholder="Digite o seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text className="text-xs text-red-500 mt-1">{errors.email}</Text>}
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium text-white mb-1">Senha</Text>
          <TextInput
            className={`w-full border ${errors.senha ? "border-red-500" : "border-gray-300"} rounded-xl px-3 py-3 text-base text-white placeholder-white/50 `}
            placeholder="Digite o seu senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
          {errors.senha && <Text className="text-xs text-red-500 mt-1">{errors.senha}</Text>}
        </View>

        <TouchableOpacity
          className={`w-full py-2 rounded-xl flex items-center justify-center ${isLoading ? "bg-[#6589E5]/50" : "bg-[#6589E5]"}`}
          disabled={isLoading}
          onPress={handleSubmit}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white font-semibold text-base">Cadastrar</Text>
          )}
        </TouchableOpacity>

        <View className="mt-4 items-center">
          <Text className="text-sm text-white mb-2">Já tem uma conta?</Text>
          <TouchableOpacity
            className="w-full border border-white py-2.5 rounded-xl flex items-center justify-center"
            onPress={() => router.push("/login")}
          >
            <Text className="text-white font-semibold text-base">Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}