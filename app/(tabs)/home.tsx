import { Image, Text, View, TouchableOpacity, TextInput, ScrollView} from "react-native";

import { useState, useEffect } from "react";
 
export default function Index() {

    return(


    <View className="w-full h-full justify-center flex items-center bg-[#121212]">

        <View className="block-1 justify-center items-center">

            <View className="flex-collum justify-center items-center gap-3">

                <Text className="text-3xl text-white font-bold">
                    QUIZ
                </Text>

                <Text className="text-xs text-white">
                    inicie o quiz
                </Text>

            </View>

            <View className="w-80 flex justify-center items-center m-6">

                <Image source={require("./../../assets/images/imagens/image1.png")} />

            </View>

            
            <TouchableOpacity className="w-52 h-14 bg-[#6589E5] rounded-xl flex justify-center items-center border-[0.5px] border-white">

                <Text className="text-4xl text-white">Começar</Text>

            </TouchableOpacity>

            <View className="w-48 h-[0.1] bg-gray-500 m-7"/>

            <View className="w-80 h-48 bg-[#2C2C2C] rounded-xl gap-3 ">

                <Text className="text-xl text-white">
                    Regras
                </Text>

                <Text className="text-sm text-white">
                    -Cada pergunta tem 1 enunciado e 4 alternativas (A, B, C, D).
                </Text>

                <Text className="text-sm text-white">
                    -Apenas uma alternativa correta.
                </Text>

                <Text className="text-sm text-white">
                    -Resposta correta: +10 pontos
                </Text>

                <Text className="text-sm text-white">
                    -Resposta errada ou em branco: 0 pontos
                </Text>

            </View>
            
            

       </View>

    </View>
        
    )

}

 