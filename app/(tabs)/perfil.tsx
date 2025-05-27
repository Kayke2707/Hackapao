import { Image, Text, View, TouchableOpacity, TextInput, ScrollView} from "react-native";
import { useState, useEffect } from "react";
 
export default function Index() {

    return (
        <View className="w-full h-full justify-center items-center bg-[#121212]">
          <View className="block-1 justify-center items-center">
            <View className="flex-col justify-center items-center gap-3">
              <Text className="text-3xl text-white font-bold">MENU</Text>
              <Text className="text-xs text-white">
                Edite seu perfil e mude as configurações
              </Text>
            </View>
    
            <View className="w-full flex-row justify-between mx-7 items-center">
              <TouchableOpacity className="w-9 h-9 rounded-full">
                <Image source={require("./../../assets/images/imagens/dark_mode.png")} />
              </TouchableOpacity>
    
              <View className="w-24 h-24">
                <Image
                  className="w-full h-full rounded-full"
                  source={require("./../../assets/images/imagens/perfilimage.png")}
                />
              </View>
    
              <TouchableOpacity className="w-9 h-9 rounded-full">
                <Image source={require("./../../assets/images/imagens/logout.png")} />
              </TouchableOpacity>
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
    
            <View className="flex-row justify-between w-52 mt-5">
              <TouchableOpacity className="flex-1 bg-gray-700 rounded-xl py-2 mx-1">
                <Text className="text-white text-center">Acertos</Text>
                {/* <Text className="text-white text-center text-xl">{acertos}</Text> */}
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-gray-700 rounded-xl py-2 mx-1">
                <Text className="text-white text-center">Erros</Text>
                {/* <Text className="text-white text-center text-xl">{erros}</Text> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }

 