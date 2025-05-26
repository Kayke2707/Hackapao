import { Stack, Tabs } from "expo-router";
import {MaterialIcons, Feather} from "@expo/vector-icons"
import './../globals.css';
import { View } from "react-native";
export default function RootLayout() {
  return(
        <Tabs
        screenOptions={{headerShown:false,
            tabBarActiveTintColor:"white",
            tabBarInactiveTintColor:"gray",
            tabBarStyle :{
                backgroundColor: "#121212",
                height: 60,
                borderColor: "black",

                
            }
        }}

        >


            <Tabs.Screen
            name="home"
            options={{title:"início",

            tabBarIcon: ({color}) =>(

               <View>
                    <MaterialIcons name="home" size={30} color={color}>

                    </MaterialIcons>
               </View> 

            )
            
            }}
            />


            <Tabs.Screen
            name="perfil"
            options={{title:"user",

                tabBarIcon: ({color}) =>(
    
                   <View>
                        <Feather name="user" size={30} color={color}>
    
                        </Feather>
                   </View> 
    
                )
                
                }}
            />

        </Tabs>
  )
}
