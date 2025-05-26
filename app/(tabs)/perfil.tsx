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

                <View className="w-full flex justify-center">

                    <TouchableOpacity></TouchableOpacity>

                    <View>
                        
                    </View>

                    <TouchableOpacity></TouchableOpacity>

                </View>
       </View>

    </View>
        
    )

}

 