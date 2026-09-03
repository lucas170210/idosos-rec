// --- BLOCO JS 1: SISTEMA DE ACESSIBILIDADE DE FONTES ---
function alterarTamanhoFonte(tamanho) {
    const corpo = document.getElementById('corpo-aplicativo');
    
    // Remove classes anteriores
    corpo.classList.remove('fonte-normal', 'fonte-grande', 'fonte-muito-grande');
    
    // Reseta estilo dos botões indicadores
    document.getElementById('botao-fonte-normal').style.backgroundColor = "transparent";
    document.getElementById('botao-fonte-normal').style.color = "#cbd5e1";
    document.getElementById('botao-fonte-grande').style.backgroundColor = "transparent";
    document.getElementById('botao-fonte-grande').style.color = "#cbd5e1";
    document.getElementById('botao-fonte-muito-grande').style.backgroundColor = "transparent";
    document.getElementById('botao-fonte-muito-grande').style.color = "#cbd5e1";

    const botaoSelecionado = document.getElementById('botao-fonte-' + tamanho);

    if (tamanho === 'normal') {
        corpo.classList.add('fonte-normal');
        botaoSelecionado.style.backgroundColor = "var(--marca-primaria)";
        botaoSelecionado.style.color = "#ffffff";
    } else if (tamanho === 'grande') {
        corpo.classList.add('fonte-grande');
        botaoSelecionado.style.backgroundColor = "var(--marca-primaria)";
        botaoSelecionado.style.color = "#ffffff";
    } else if (tamanho === 'muito-grande') {
        corpo.classList.add('fonte-muito-grande');
        botaoSelecionado.style.backgroundColor = "var(--marca-primaria)";
        botaoSelecionado.style.color = "#ffffff";
    }
}

// --- BLOCO JS 2: SISTEMA DE ALTO CONTRASTE (PRETO E BRANCO) ---
function alternarContraste() {
    const corpo = document.getElementById('corpo-aplicativo');
    corpo.classList.toggle('alto-contraste');
}

// --- BLOCO JS 3: SELEÇÃO DE ABAS DE NAVEGAÇÃO ---
function mudarAba(idAba) {
    // Oculta todas as seções
    const secoes = document.querySelectorAll('.conteudo-secao');
    secoes.forEach(secao => secao.classList.remove('ativo'));
    
    // Exibe a seção ativa correspondente
    document.getElementById('secao-' + idAba).classList.add('ativo');

    // Retira o destaque visual de todos os botões de abas
    const botoesAbas = document.querySelectorAll('.botao-aba');
    botoesAbas.forEach(botao => botao.classList.remove('aba-ativa'));

    // Aplica destaque ao botão da aba que foi clicado
    const botaoAtivo = document.getElementById('aba-' + idAba);
    botaoAtivo.classList.add('aba-ativa');
}

// --- BLOCO JS 4: CONTROLO DO COMPONENTE SANFONA (ACCORDION) ---
function alternarSanfona(idSanfona) {
    const painel = document.getElementById(idSanfona);
    const icone = document.getElementById('icone-' + idSanfona);
    
    if (painel.classList.contains('exibir')) {
        painel.classList.remove('exibir');
        icone.textContent = '▲';
    } else {
        painel.classList.add('exibir');
        icone.textContent = '▼';
    }
}

// --- BLOCO JS 5: SIMULADOR DETETIVE DE GOLPES ---
function revelarPista(numeroPista) {
    const explicacao = document.getElementById('texto-explicacao-pista');
    let mensagemPista = "";

    if (numeroPista === 1) {
        mensagemPista = "🚨 <strong>ALERTA 1 (Contacto Desconhecido):</strong> Burlões usam desculpas como 'o ecrã do telemóvel avariou' para justificar o contacto por um número novo. Desconfie imediatamente e confirme ligando para o contacto antigo!";
    } else if (numeroPista === 2) {
        mensagemPista = "🚨 <strong>ALERTA 2 (Pedido Urgente):</strong> A pressa e a urgência são táticas comuns para fazer com que aja por impulso, sem pensar ou avaliar o perigo.";
    } else if (numeroPista === 3) {
        mensagemPista = "🚨 <strong>ALERTA 3 (Solicitação de Dinheiro/MB Way):</strong> Nunca transfira valores a pedido de um novo número de WhatsApp. Faça uma chamada convencional para ouvir a voz ou faça perguntas pessoais!";
    }

    explicacao.innerHTML = mensagemPista;
}

// --- BLOCO JS 6: JOGO DE PERGUNTAS (QUIZ) ---
const dadosQuiz = [
    {
        emoticon: "🏦",
        pergunta: "O gestor do seu banco liga a dizer que a sua conta foi bloqueada por uma atividade suspeita e pede-lhe para digitar a sua palavra-passe no teclado numérico do telefone. O que faz?",
        respostaSegura: false, // É PERIGO
        explicacao: "Exatamente! <strong>É um perigo!</strong> Bancos e funcionários reais nunca entram em contacto a pedir palavras-passe ou códigos secretos de acesso."
    },
    {
        emoticon: "📞",
        pergunta: "O seu neto liga de um número desconhecido a chorar e a alegar que sofreu um acidente grave de viação, exigindo envio de dinheiro imediato para a reparação do carro. O que faz?",
        respostaSegura: false, // É PERIGO
        explicacao: "Perfeito! <strong>É um perigo!</strong> Desligue o telefone imediatamente e faça contacto com o número oficial do seu neto ou dos pais dele para certificar-se do ocorrido."
    },
    {
        emoticon: "🔐",
        pergunta: "Um amigo de confiança envia, num grupo de conversas, uma mensagem de promoção que oferece brindes grátis numa loja famosa. Antes de clicar no endereço web, pesquisa no site oficial da marca para conferir. Isto é:",
        respostaSegura: true, // É SEGURO
        explicacao: "Muito bem! <strong>Isto é seguro!</strong> Confirmar notícias e links de promoções diretamente nos canais de comunicação oficiais antes de os abrir impede a maioria das infeções por vírus e roubo de dados."
    }
];

let indexQuestaoAtual = 0;
let pontuacaoJogador = 0;

function atualizarPainelQuiz() {
    const questaoAtual = dadosQuiz[indexQuestaoAtual];
    document.getElementById('progresso-etapa').textContent = `Situação ${indexQuestaoAtual + 1} de ${dadosQuiz.length}`;
    document.getElementById('pontuacao-atual').textContent = `Pontuação: ${pontuacaoJogador}`;
    
    // Atualiza barra de progresso horizontal
    const porcentagemProgresso = ((indexQuestaoAtual + 1) / dadosQuiz.length) * 100;
    document.getElementById('barra-indicadora').style.width = porcentagemProgresso + '%';
    
    document.getElementById('quiz-emoticon').textContent = questaoAtual.emoticon;
    document.getElementById('texto-pergunta-quiz').innerHTML = questaoAtual.pergunta;
}

function avaliarEscolhaQuiz(opcaoUsuario) {
    const questaoAtual = dadosQuiz[indexQuestaoAtual];
    const acertou = (opcaoUsuario === questaoAtual.respostaSegura);

    const painelFeedback = document.getElementById('painel-feedback');
    const emoticonFeedback = document.getElementById('feedback-emoticon');
    const tituloFeedback = document.getElementById('feedback-titulo');
    const descFeedback = document.getElementById('feedback-mensagem');

    if (acertou) {
        pontuacaoJogador += 1;
        emoticonFeedback.textContent = "🎉";
        tituloFeedback.innerHTML = "Excelente! Acertou! 🌟";
        tituloFeedback.style.color = "var(--marca-sucesso)";
    } else {
        emoticonFeedback.textContent = "💡";
        tituloFeedback.innerHTML = "Atenção a este detalhe!";
        tituloFeedback.style.color = "var(--marca-destaque)";
    }

    descFeedback.innerHTML = questaoAtual.explicacao;
    painelFeedback.style.display = 'flex';
}

function carregarProximaQuestao() {
    document.getElementById('painel-feedback').style.display = 'none';
    
    if (indexQuestaoAtual < dadosQuiz.length - 1) {
        indexQuestaoAtual++;
        atualizarPainelQuiz();
    } else {
        // Fim das etapas do jogo
        document.getElementById('bloco-interacao-pergunta').classList.add('escondido');
        document.getElementById('progresso-etapa').classList.add('escondido');
        document.getElementById('painel-final').classList.remove('escondido');
        document.getElementById('resultado-final-pontos').textContent = `${pontuacaoJogador} de ${dadosQuiz.length} acertos!`;
    }
}

function reiniciarJogo() {
    indexQuestaoAtual = 0;
    pontuacaoJogador = 0;
    document.getElementById('bloco-interacao-pergunta').classList.remove('escondido');
    document.getElementById('progresso-etapa').classList.remove('escondido');
    document.getElementById('painel-final').classList.add('escondido');
    atualizarPainelQuiz();
}

// Inicializa o jogo ao carregar a página
window.onload = function() {
    atualizarPainelQuiz();
}
