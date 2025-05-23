import React, { useState } from "react"
import {View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator} 
from "react-native"

interface CadastroFormProps {
  onCadastro: () => void
  onNavigateToLogin: () => void
}

export default function CadastroForm({ onCadastro, onNavigateToLogin }: CadastroFormProps) {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [errors, setErrors] = useState<{ nome?: string; email?: string; senha?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const validar = () => {
    const newErrors: typeof errors = {}

    if (!nome || nome.length < 2) newErrors.nome = "Nome deve ter pelo menos 2 caracteres."
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Email inválido."
    if (!senha || senha.length < 6) newErrors.senha = "Senha deve ter pelo menos 6 caracteres."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validar()) return

    setIsLoading(true)
    console.log("Cadastro com:", { nome, email, senha })

    setTimeout(() => {
      setIsLoading(false)
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!")
      onCadastro()
    }, 1000)
  }

  return (
    <View className="flex-1 justify-center items-center px-4 bg-white">
      <View className="w-full max-w-sm p-6 rounded-2xl bg-white shadow-md">
        <Text className="text-xl font-bold text-center mb-1">CADASTRO</Text>
        <Text className="text-sm text-gray-500 text-center mb-4">Crie uma conta</Text>

        <Text className="text-sm">Nome</Text>
        <TextInput
          className="border border-gray-300 rounded-md h-10 px-3 mb-1"
          placeholder="Digite o seu nome"
          value={nome}
          onChangeText={setNome}
        />
        {errors.nome && <Text className="text-xs text-red-500 mb-2">{errors.nome}</Text>}

        <Text className="text-sm">Email</Text>
        <TextInput
          className="border border-gray-300 rounded-md h-10 px-3 mb-1"
          placeholder="Digite o seu email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text className="text-xs text-red-500 mb-2">{errors.email}</Text>}

        <Text className="text-sm">Senha</Text>
        <TextInput
          className="border border-gray-300 rounded-md h-10 px-3 mb-1"
          placeholder="Digite a sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        {errors.senha && <Text className="text-xs text-red-500 mb-2">{errors.senha}</Text>}

        <TouchableOpacity
          className="bg-blue-500 rounded-md h-10 justify-center items-center mt-2"
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold">Cadastrar</Text>
          )}
        </TouchableOpacity>

        <View className="mt-4 items-center">
          <Text className="text-xs text-gray-500">Já tem uma conta?</Text>
          <TouchableOpacity
            className="border border-gray-300 rounded-md h-10 w-full justify-center items-center mt-2"
            onPress={onNavigateToLogin}
          >
            <Text className="text-sm text-gray-700">Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
