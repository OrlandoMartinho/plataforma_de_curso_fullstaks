import nltk
from nltk.chat.util import Chat, reflections

# Pares de padrões e respostas para o assistente virtual do médico
pares_medico = [
    ['oi', ['Olá! Como posso ajudar você?', 'Oi! Em que posso ser útil?']],
    ['bom dia', ['Bom dia! Como posso ajudar você?', 'Olá! Como posso ser útil hoje?']],
    ['qual é o seu nome?', ['Eu sou o Assistente Médico. Em que posso ajudar?', 'Meu nome é Assistente Médico. Como posso ajudar?']],
    ['adeus', ['Até logo! Se precisar de mais alguma coisa, estarei aqui.', 'Tchau! Cuide-se.']],
    ['como você está?', ['Estou aqui para ajudar você. Como posso ser útil?', 'Estou bem, obrigado. Em que posso ajudar?']],
    ['tenho uma dor de cabeça', ['Sinto muito ouvir isso. Você já tomou algum medicamento?', 'Recomendo descanso e beber água. Se a dor persistir, consulte um médico.']],
    ['estou me sentindo cansado', ['Você está dormindo o suficiente? A alimentação está balanceada?']],
    ['tenho uma consulta médica', ['Ótimo! Consultas regulares são importantes para sua saúde.']],
    ['tenho uma pergunta sobre minha medicação', ['Por favor, me diga qual é sua dúvida.']],
    ['preciso de uma receita médica', ['Você gostaria de agendar uma consulta para receber uma receita médica?']],
    ['obrigado', ['De nada! Se precisar de mais alguma coisa, estarei aqui para ajudar.']],
    ['sair', ['Obrigado por usar o Assistente Médico. Até mais!']]
]

# Crie o chatbot com os pares de padrões definidos para o médico
chatbot_medico = Chat(pares_medico, reflections)

def assistente_medico():
    print("Bem-vindo! Eu sou o Assistente Médico. Como posso ajudar você hoje?")
    while True:
        pergunta = input("Você: ").lower()
        resposta = chatbot_medico.respond(pergunta)
        print("Assistente Médico:", resposta)

if __name__ == "__main__":
    assistente_medico()
