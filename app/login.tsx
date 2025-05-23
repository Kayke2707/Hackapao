import React, { useState } from "react"
import {View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator} 
from "react-native"

interface LoginFormProps {
  onLogin: () => void
  onNavigateToCadastro: () => void
  onNavigateToEsqueciSenha: () => void
}

export default function LoginForm({
  onLogin,
  onNavigateToCadastro,
  onNavigateToEsqueciSenha,
}: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [errors, setErrors] = useState<{ email?: string; senha?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const validar = () => {
    const newErrors: typeof errors = {}

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Digite um email válido."
    }

    if (!senha) {
      newErrors.senha = "Digite sua senha."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validar()) return

    setIsLoading(true)
    console.log("Login com:", { email, senha })

    setTimeout(() => {
      setIsLoading(false)
      onLogin()
    }, 1000)
  }

  return (
    <View className="flex-1 justify-center items-center px-4 bg-white">
      <View className="w-full max-w-sm p-6 rounded-2xl bg-white shadow-md">
        <Text className="text-xl font-bold text-center mb-1">LOGIN</Text>
        <Text className="text-sm text-gray-500 text-center mb-4">Acesse a sua conta</Text>

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
          className="mt-1 mb-2 self-end"
          onPress={onNavigateToEsqueciSenha}
        >
          <Text className="text-xs text-blue-500">Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-blue-500 rounded-md h-10 justify-center items-center"
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold">Entrar</Text>
          )}
        </TouchableOpacity>

        <View className="mt-4 items-center">
          <Text className="text-xs text-gray-500">Não tem uma conta?</Text>
          <TouchableOpacity
            className="border border-gray-300 rounded-md h-10 w-full justify-center items-center mt-2"
            onPress={onNavigateToCadastro}
          >
            <Text className="text-sm text-gray-700">Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
