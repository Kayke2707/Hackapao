import React, { useState } from "react"
import {View, Text, TextInput, TouchableOpacity, ActivityIndicator} 
from "react-native"

interface EsqueciSenhaFormProps {
  onNavigateToLogin: () => void
}

export default function EsqueciSenhaForm({ onNavigateToLogin }: EsqueciSenhaFormProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const validar = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Digite um email válido.")
      return false
    }
    setError("")
    return true
  }

  const handleSubmit = () => {
    if (!validar()) return

    setIsLoading(true)
    console.log("Recuperação de senha para:", email)

    setTimeout(() => {
      setIsLoading(false)
      setEnviado(true)
    }, 1000)
  }

  const voltar = () => {
    setEnviado(false)
    setEmail("")
    setError("")
    onNavigateToLogin()
  }

  return (
    <View className="flex-1 justify-center items-center px-4 bg-white">
      <View className="w-full max-w-sm p-6 rounded-2xl bg-white shadow-md">
        <Text className="text-xl font-bold text-center mb-1">Recuperar Senha</Text>
        <Text className="text-sm text-gray-500 text-center mb-4">
          Digite seu email para receber instruções de recuperação
        </Text>

        {!enviado ? (
          <>
            <Text className="text-sm">Email</Text>
            <TextInput
              className="border border-gray-300 rounded-md h-10 px-3 mb-1"
              placeholder="Digite o seu email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            {error ? <Text className="text-xs text-red-500 mb-2">{error}</Text> : null}

            <TouchableOpacity
              className="bg-blue-500 rounded-md h-10 justify-center items-center"
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-semibold">Enviar</Text>
              )}
            </TouchableOpacity>

            <View className="mt-4 items-center">
              <Text className="text-xs text-gray-500">Lembrou sua senha?</Text>
              <TouchableOpacity
                className="border border-gray-300 rounded-md h-10 w-full justify-center items-center mt-2"
                onPress={onNavigateToLogin}
              >
                <Text className="text-sm text-gray-700">Voltar para o login</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View className="bg-blue-50 p-4 rounded-md mb-4">
              <Text className="text-blue-700 text-sm">
                Email enviado com sucesso! Verifique sua caixa de entrada.
              </Text>
            </View>

            <TouchableOpacity
              className="border border-gray-300 rounded-md h-10 w-full justify-center items-center"
              onPress={voltar}
            >
              <Text className="text-sm text-gray-700">Voltar para o login</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  )
}
