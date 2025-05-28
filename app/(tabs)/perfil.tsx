import { Image, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";

export default function Index() {
  return (
    <View className="w-full h-full justify-center items-center bg-[#121212]">
      <View className="block-1 justify-center items-center">

        <View className=" flex-row justify-end w-full ml-28 relative">
          <TouchableOpacity
              className="w-9 h-9 rounded-full absolute top-0 right-0"
              onPress={() => router.push("/login")}
            >
              <Image source={require("./../../assets/images/imagens/logout.svg")} />
            </TouchableOpacity>
        </View>


        <View className="flex-col justify-center items-center gap-3">
          <Text className="text-3xl text-white font-bold">MENU</Text>
          
          <Text className="text-xs text-white mb-4">
            Edite seu perfil e mude as configurações
          </Text>
        </View>

        <View className="w-full justify-between  items-center">
    
          <View className="w-24 h-24">
            <Image
              className="w-full h-full rounded-full"
              source={require("./../../assets/images/imagens/perfilimage.png")}
            />
          </View>
        </View>

        <View className="w-72 gap-5">
          <View>
            <Text className="text-sm font-medium text-white mb-1">Nome</Text>
            <TextInput
              className="w-full border border-gray-300 rounded-xl px-3 py-3 text-base text-white placeholder-white/50"
              placeholder="Digite o seu nome"
            //   value={nome}
            //   onChangeText={setNome}
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-white mb-1">Email</Text>
            <TextInput
              className="w-full border border-gray-300 rounded-xl px-3 py-3 text-base text-white placeholder-white/50"
              placeholder="Digite o seu email"
            //   value={email}
            //   onChangeText={setEmail}
            //   keyboardType="email-address"
            //   autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-white mb-1">Senha</Text>
            <TextInput
              className="w-full border border-gray-300 rounded-xl px-3 py-3 text-base text-white placeholder-white/50"
              placeholder="Digite a sua senha"
            //   value={senha}
            //   onChangeText={setSenha}
            //   secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity
          className="w-52 h-12 bg-[#6589E5] rounded-xl flex justify-center items-center mt-5 border-[0.5px] border-white"
        //   onPress={handleSave}
        >
          <Text className="text-white font-semibold text-base">Salvar</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity className="w-48 h-10 bg-[#6589E5] rounded-xl flex justify-center items-center mt-5 border-[0.5px] border-white" 
        onPress={() => router.push("/login")}>
          <Text className="text-white font-semibold text-base">Sair</Text>
        </TouchableOpacity> */}

        <View className="flex-row justify-between w-72 mt-10 bg-[#1F1F1F] rounded-xl gap-x-3">
          <View className="flex-1 bg-[#2C2C2C] rounded-xl py-3 w-32">
            <Text className="text-white text-center text-base">Acertos</Text>
            <View className="w-16 h-[1px] bg-white my-1 self-center" />
            <Text className="text-green-500 text-center text-xl">0</Text>
          </View>

          <View className="flex-1 bg-[#2C2C2C] rounded-xl py-3 w-32">
            <Text className="text-white text-center text-base">Erros</Text>
            <View className="w-16 h-[1px] bg-white my-1 self-center" />
            <Text className="text-red-600 text-center text-xl">0</Text>
          </View>
        </View>
        
      </View>
    </View> 
  );
}