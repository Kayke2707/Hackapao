import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:3000"; // Ajuste para a URL do seu backend

interface Pergunta {
  id: number;
  pergunta: string;
  respostas: {
    id: number;
    texto: string;
    resposta: boolean;
  }[];
}

export default function Index() {
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [fim, setFim] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPerguntas();
  }, []);

  const carregarPerguntas = async () => {
    try {
      const response = await axios.get(`${API_URL}/perguntas`);
      setPerguntas(response.data);
    } catch (error) {
      console.error("Erro ao carregar perguntas:", error);
    } finally {
      setLoading(false);
    }
  };

  const verificarResposta = async (idResposta: number) => {
    if (!perguntas[perguntaAtual]) return;

    setRespostaSelecionada(idResposta);

    try {
      const response = await axios.post(`${API_URL}/verificar-resposta`, {
        id_pergunta: perguntas[perguntaAtual].id,
        id_resposta: idResposta
      });

      if (response.data.correta) {
        setAcertos(acertos + 1);
      } else {
        setErros(erros + 1);
      }

      // Atualiza a pontuação do usuário
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const { id } = JSON.parse(userData);
        await axios.put(`${API_URL}/usuarios/${id}/pontuacao`, {
          acertos: response.data.correta ? 1 : 0,
          erros: response.data.correta ? 0 : 1
        });
      }

      setTimeout(() => {
        const proximaPergunta = perguntaAtual + 1;
        if (proximaPergunta < perguntas.length) {
          setPerguntaAtual(proximaPergunta);
          setRespostaSelecionada(null);
        } else {
          setFim(true);
        }
      }, 1000);
    } catch (error) {
      console.error("Erro ao verificar resposta:", error);
    }
  };

  if (loading) {
    return (
      <View className="w-full h-full justify-center items-center bg-[#121212]">
        <ActivityIndicator size="large" color="#6589E5" />
      </View>
    );
  }

  if (fim) {
    return (
      <View className="w-full h-full justify-center items-center bg-[#121212] px-4">
        <View className="items-center">
          <Text className="text-white text-3xl font-bold mb-4">
            Quiz Finalizado!
          </Text>
          <Text className="text-white text-lg mb-2">Acertos: {acertos}</Text>
          <Text className="text-white text-lg">Erros: {erros}</Text>
          <TouchableOpacity 
            className="flex justify-center items-center h-8 w-20 mt-5 text-white font-bold rounded-xl bg-blue-600"
            onPress={() => router.push("/(tabs)/home")}
          >
            Voltar
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const perguntaAtualData = perguntas[perguntaAtual];

  if (!perguntaAtualData) {
    return (
      <View className="w-full h-full justify-center items-center bg-[#121212]">
        <Text className="text-white text-xl">Nenhuma pergunta disponível</Text>
      </View>
    );
  }

  return (
    <View className="w-full h-full justify-center items-center bg-[#121212] px-4">
      <View className="w-full flex justify-center items-center">
        <Text className="text-white text-xl font-bold mb-4 text-center">
          Pergunta {perguntaAtual + 1} de {perguntas.length}
        </Text>
        <Text className="text-white text-2xl font-bold mb-6 text-center">
          {perguntaAtualData.pergunta}
        </Text>

        {perguntaAtualData.respostas.map((resposta) => {
          const isSelected = respostaSelecionada === resposta.id;
          const isCorrect = resposta.resposta;
          const bgColor = isSelected
            ? isCorrect
              ? "bg-[#0FB40F]"
              : "bg-[#B40F0F]"
            : "bg-[#2C2C2C]";

          return (
            <TouchableOpacity
              key={resposta.id}
              onPress={() => verificarResposta(resposta.id)}
              className={`w-80 flex justify-center items-center ${bgColor} h-16 rounded-xl mb-4`}
            >
              <Text className="text-white text-3xl text-center">{resposta.texto}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
