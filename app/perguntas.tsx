import { Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function Index() {
  const Perguntas = [
 
        {
            pergunta: "Em “God of War” (2018), qual é o nome do filho de Kratos?",
            opcoes: ["Atreus", "Loki", "Baldur", "Thor"],
            resposta: "Atreus",
        },
        {
            pergunta: "Qual desses jogos é um battle royale?",
            opcoes: ["Elden Ring", "Fortnite", "The Sims", "Hollow Knight"],
            resposta: "Fortnite",
        },
        {
            pergunta: "Qual desses jogos é conhecido por seu estilo sombrio e dificuldade elevada?",
            opcoes: ["Stardew Valley", "Dark Souls", "Rocket League", "Animal Crossing"],
            resposta: "Dark Souls",
        },
        {
            pergunta: "Em qual jogo o protagonista usa uma lâmina escondida chamada \"hidden blade\"?",
            opcoes: ["Devil May Cry", "Metal Gear Solid", "Assassin’s Creed", "Prince of Persia"],
            resposta: "Assassin’s Creed",
        },
        {
            pergunta: "Qual é o objetivo principal do jogo “Among Us”?",
            opcoes: [
            "Construir uma nave",
            "Sobreviver a uma ilha",
            "Eliminar impostores (ou ser um)",
            "Capturar criaturas"
            ],
            resposta: "Eliminar impostores (ou ser um)",
        },
 
       
        {
            pergunta: "Em qual filme os personagens vivem em uma simulação digital controlada por máquinas?",
            opcoes: ["Tron", "Matrix", "Inception", "Blade Runner"],
            resposta: "Matrix",
        },
        {
            pergunta: "Qual super-herói da Marvel usa um escudo como arma principal?",
            opcoes: ["Homem de Ferro", "Thor", "Capitão América", "Gavião Arqueiro"],
            resposta: "Capitão América",
        },
        {
            pergunta: "Qual filme ganhou o Oscar de Melhor Filme em 2020?",
            opcoes: ["1917", "Coringa", "Parasita", "Era Uma Vez em... Hollywood"],
            resposta: "Parasita",
        },
        {
            pergunta: "Qual personagem é conhecido por dizer “Eu sou o seu pai” em Star Wars?",
            opcoes: ["Luke Skywalker", "Obi-Wan Kenobi", "Darth Vader", "Han Solo"],
            resposta: "Darth Vader",
        },
        {
            pergunta: "Qual filme animado tem personagens chamados Woody e Buzz Lightyear?",
            opcoes: ["Os Incríveis", "Toy Story", "Divertida Mente", "Carros"],
            resposta: "Toy Story",
        },
 
       
        {
            pergunta: "Quem escreveu a saga “Harry Potter”?",
            opcoes: ["Rick Riordan", "J.K. Rowling", "C.S. Lewis", "Suzanne Collins"],
            resposta: "J.K. Rowling",
        },
        {
            pergunta: "Em “O Senhor dos Anéis”, qual objeto deve ser destruído para derrotar Sauron?",
            opcoes: ["A espada de Aragorn", "A pedra de Arken", "O Um Anel", "O cajado de Gandalf"],
            resposta: "O Um Anel",
        },
        {
            pergunta: "Qual livro começa com a frase “No meio do caminho tinha uma pedra”?",
            opcoes: [
            "Dom Casmurro",
            "A Rosa do Povo",
            "Alguma Poesia",
            "Nenhum — é um poema de Carlos Drummond de Andrade"
            ],
            resposta: "Nenhum — é um poema de Carlos Drummond de Andrade",
        },
        {
            pergunta: "Qual personagem vive numa toca no começo do livro “O Hobbit”?",
            opcoes: ["Frodo", "Gandalf", "Bilbo Bolseiro", "Thorin"],
            resposta: "Bilbo Bolseiro",
        },
        {
            pergunta: "Qual dessas obras foi escrita por George Orwell?",
            opcoes: ["Admirável Mundo Novo", "Fahrenheit 451", "1984", "O Apanhador no Campo de Centeio"],
            resposta: "1984",
        },
        ];
 

  const [perguntt, setperguntt] = useState(0);
  const [respostt, setrespostt] = useState<string | null>(null);
  const [acertos, setacertos] = useState(0);
  const [erros, seterros] = useState(0);
  const [fim, setfim] = useState(false);

  const pergunt = Perguntas[perguntt];

  const respostacerta = (opcoes: string) => {
    setrespostt(opcoes);

    if (opcoes === pergunt.resposta) {
      setacertos(acertos + 1);
    } else {
      seterros(erros + 1);
    }

    
    setTimeout(() => {
      const proximapergunta = perguntt + 1;
      if (proximapergunta < Perguntas.length) {
        setperguntt(proximapergunta);
        setrespostt(null);
      } else {
        setfim(true);
      }
    }, 100);
  };

  return (
    <View className="w-full h-full justify-center items-center bg-[#121212] px-4">

      {fim ? (
        <View className="items-center">
          <Text className="text-white text-3xl font-bold mb-4">
            Quiz Finalizado!
          </Text>
          <Text className="text-white text-lg mb-2">Acertos: {acertos}</Text>
          <Text className="text-white text-lg">Erros: {erros}</Text>
          <TouchableOpacity className=" flex justify-center items-center h-8 w-20 mt-5 text-white font-bold rounded-xl bg-blue-600"
          onPress={() => router.push("/(tabs)/home")}>Voltar</TouchableOpacity>
        </View>
      ) : (

        <View className="w-full flex justify-center items-center">
          <Text className="text-white text-xl font-bold mb-4 text-center">
            Pergunta {perguntt + 1} de {Perguntas.length}
          </Text>
          <Text className="text-white text-2xl font-bold mb-6 text-center">
            {pergunt.pergunta}
          </Text>

          {pergunt.opcoes.map((opcao) => {
            const isSelected = respostt === opcao;
            const isCorrect = pergunt.resposta === opcao;
            const bgColor = isSelected
              ? isCorrect
                ? "bg-[#0FB40F]"
                : "bg-[#B40F0F]"
              : "bg-[#2C2C2C]";

            return (
              <TouchableOpacity
                key={opcao}
                onPress={() => respostacerta(opcao)}
                className={`w-80 flex justify-center items-center ${bgColor} h-16 rounded-xl mb-4`}
              >
                <Text className="text-white text-3xl text-center">{opcao}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}
