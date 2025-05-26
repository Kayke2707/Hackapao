import { Image, Text, View, TouchableOpacity, TextInput, ScrollView} from "react-native";

import { useState, useEffect } from "react";
 
export default function Index() {

    return(


    <View className="w-full h-full justify-center flex items-center bg-[#121212]">

        <View className="block-1 justify-center items-center">

                <View className="flex-collum justify-center items-center gap-3">

                    <Text className="text-3xl text-white font-bold">
                        MENU
                    </Text>

                    <Text className="text-xs text-white">
                        Edite seu perfil e mude as configurações
                    </Text>

                </View>

                <View className="w-full flex-row justify-between m-7 items-center">

                    <TouchableOpacity className="w-9 h-9 rounded-full">
                            <Image source={require("./../../assets/images/imagens/dark_mode.png")} />
                    </TouchableOpacity>

                    <View className="w-24 h-24">
                        <Image className="w-full h-full rounded-full" source={require("./../../assets/images/imagens/perfilimage.png")}/ >
                    </View>

                    <TouchableOpacity className="w-9 h-9 rounded-ful">
                            <Image source={require("./../../assets/images/imagens/logout.png")} />
                    </TouchableOpacity>

                </View>

                <View className="w-72 gap-5">
                            <View>
                             <Text className="text-sm font-medium text-white mb-1">Nome</Text>
                             <TextInput
                               className={`w-full border rounded-xl px-3 py-3 text-base text-white placeholder-white/50`}
                            //    placeholder="Digite o seu nome"
                            //    value={nome}
                            //    onChangeText={setNome}
                             />
                             </View>
                            
                            <View>
                             <Text className="text-sm font-medium text-white mb-1">Email</Text>
                             <TextInput
                               className={`w-full border rounded-xl px-3 py-3 text-base text-white placeholder-white/50`}
                            //    placeholder="Digite o seu nome"
                            //    value={nome}
                            //    onChangeText={setNome}
                             />
                             </View>
                            
                            <View>
                             <Text className="text-sm font-medium text-white mb-1">Senha</Text>
                             <TextInput
                               className={`w-full border rounded-xl px-3 py-3 text-base text-white placeholder-white/50`}
                            //    placeholder="Digite o seu nome"
                            //    value={nome}
                            //    onChangeText={setNome}
                             />
                             </View>
                </View>
       </View>

    </View>
        
    )

}

 