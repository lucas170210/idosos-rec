const dadosDicas = {
    senhas: {
        etiqueta: 'Proteção de contas',
        titulo: 'Como criar palavras-passe fortes',
        conteudo: `
            <p>Uma boa palavra-passe é longa, única e não revela informações óbvias sobre você.</p>
            <p><strong>Uma técnica simples:</strong> escolha uma frase de que gosta e use a primeira letra de cada palavra, misturando números e símbolos.</p>
            <p>Por exemplo, <em>“A Minha Filha Amada Tem 2 Gatos!”</em> pode transformar-se em <strong>AMFAT2G!</strong></p>
            <div class="modal-alerta"><strong>Evite:</strong> seu nome completo, data de nascimento, número de telefone e sequências como 123456.</div>
            <p>Se precisar, anote suas palavras-passe em um caderno guardado em casa. Nunca as compartilhe por telefone ou mensagem.</p>
        `
    },
    'falso-familiar': {
        etiqueta: 'WhatsApp',
        titulo: 'Golpe do falso familiar',
        conteudo: `
            <p>O criminoso cria uma conta nova usando a foto de um filho, neto ou outra pessoa conhecida. Em seguida, diz que trocou de número e pede dinheiro com urgência.</p>
            <p><strong>Antes de fazer qualquer pagamento:</strong></p>
            <ol>
                <li>Ligue para o número antigo que já está salvo nos seus contatos.</li>
                <li>Faça uma pergunta pessoal que somente o familiar verdadeiro saberia responder.</li>
                <li>Nunca transfira dinheiro para um número novo sem confirmar a história.</li>
            </ol>
            <div class="modal-alerta"><strong>Regra de ouro:</strong> uma mensagem urgente não precisa de uma resposta imediata. Pare e confirme.</div>
        `
    },
    banco: {
        etiqueta: 'Banco e pagamentos',
        titulo: 'Cuidados com o banco e pagamentos',
        conteudo: `
            <p><strong>Nenhum banco liga pedindo sua palavra-passe, código de segurança ou uma transferência para “proteger” sua conta.</strong></p>
            <p>Se receber uma chamada suspeita, desligue. Não use o número que apareceu na mensagem ou que a pessoa ditou.</p>
            <ul>
                <li>Use o aplicativo oficial que você já conhece.</li>
                <li>Procure o número no verso do cartão ou no site oficial do banco.</li>
                <li>Em caso de dúvida, vá pessoalmente à agência e peça ajuda.</li>
            </ul>
        `
    },
    'avisar-banco': {
        etiqueta: 'Primeiro passo',
        titulo: 'Avise seu banco imediatamente',
        conteudo: `
            <p>Se você informou dados, fez um pagamento ou percebeu uma movimentação estranha, entre em contato com seu banco o quanto antes.</p>
            <ol>
                <li>Ligue para o número oficial que está no verso do cartão ou no aplicativo.</li>
                <li>Peça o bloqueio do cartão, da conta ou do acesso que possa ter sido comprometido.</li>
                <li>Conteste pagamentos desconhecidos e anote o protocolo do atendimento.</li>
                <li>Troque suas palavras-passe usando um dispositivo seguro.</li>
            </ol>
            <div class="modal-alerta"><strong>Importante:</strong> não aceite ajuda de quem ligar dizendo ser do banco depois do golpe. Faça você mesmo o contato pelo canal oficial.</div>
        `
    },
    familiares: {
        etiqueta: 'Segundo passo',
        titulo: 'Avise seus familiares',
        conteudo: `
            <p>Conte o que aconteceu a uma pessoa de confiança. Pedir ajuda não é motivo de vergonha: golpes são feitos para enganar qualquer pessoa.</p>
            <ol>
                <li>Peça a um familiar para avisar outros contatos próximos.</li>
                <li>Se sua conta de mensagens foi invadida, avise nos grupos por outro canal.</li>
                <li>Peça que ninguém deposite dinheiro em seu nome até a situação ser resolvida.</li>
                <li>Guarde as mensagens, números, comprovantes e horários envolvidos.</li>
            </ol>
        `
    },
    queixa: {
        etiqueta: 'Terceiro passo',
        titulo: 'Registre a ocorrência',
        conteudo: `
            <p>Faça uma denúncia às autoridades. O registro documenta a fraude e pode ajudar a identificar os responsáveis.</p>
            <p>Antes de registrar, reúna:</p>
            <ul>
                <li>capturas de tela das mensagens e dos perfis;</li>
                <li>números de telefone, nomes de usuário e links;</li>
                <li>comprovantes de transferências e protocolos do banco;</li>
                <li>data, horário e uma descrição do que aconteceu.</li>
            </ul>
            <div class="modal-alerta"><strong>Não apague as provas.</strong> Mesmo que o criminoso exclua a conversa, seus registros podem ser importantes.</div>
        `
    }
};

function alterarTamanhoFonte(tamanho) {
    const corpo = document.getElementById('corpo-aplicativo');
    if (!corpo) return;

    corpo.classList.remove('fonte-normal', 'fonte-grande', 'fonte-muito-grande');
    corpo.classList.add(`fonte-${tamanho}`);

    document.querySelectorAll('.botao-controle').forEach((botao) => botao.classList.remove('botao-controle--ativo'));
    const botaoSelecionado = document.getElementById(`botao-fonte-${tamanho}`);
    if (botaoSelecionado) botaoSelecionado.classList.add('botao-controle--ativo');
}

function alternarContraste() {
    const corpo = document.getElementById('corpo-aplicativo');
    if (corpo) corpo.classList.toggle('alto-contraste');
}

function mudarAba(idAba) {
    document.querySelectorAll('.conteudo-secao').forEach((secao) => secao.classList.remove('ativo'));
    document.querySelectorAll('.botao-aba').forEach((botao) => {
        botao.classList.remove('aba-ativa');
        botao.removeAttribute('aria-current');
    });

    const secao = document.getElementById(`secao-${idAba}`);
    const botaoAtivo = document.getElementById(`aba-${idAba}`);
    if (!secao || !botaoAtivo) return;

    secao.classList.add('ativo');
    botaoAtivo.classList.add('aba-ativa');
    botaoAtivo.setAttribute('aria-current', 'page');
}

let ultimoElementoFocado = null;
let leitorSintese = window.speechSynthesis;
let utteranceLeitura = null;

function abrirModalDica(idDica) {
    const dica = dadosDicas[idDica];
    const modal = document.getElementById('modal-dica');
    if (!dica || !modal) return;

    ultimoElementoFocado = document.activeElement;
    document.getElementById('modal-etiqueta').textContent = dica.etiqueta;
    document.getElementById('modal-titulo').textContent = dica.titulo;
    document.getElementById('modal-texto').innerHTML = dica.conteudo;
    document.getElementById('btn-ler-texto').innerHTML = '<span aria-hidden="true">🔊</span> Ler em voz alta';

    modal.classList.add('ativo');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-aberto');
    document.querySelector('.fechar-modal').focus();
}

function fecharModal() {
    const modal = document.getElementById('modal-dica');
    if (!modal) return;

    pararLeituraVoz();
    modal.classList.remove('ativo');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-aberto');

    if (ultimoElementoFocado && typeof ultimoElementoFocado.focus === 'function') {
        ultimoElementoFocado.focus();
    }
}

function alternarLeituraVoz() {
    const botao = document.getElementById('btn-ler-texto');
    if (!botao || !('speechSynthesis' in window)) {
        if (botao) botao.textContent = 'Leitura não disponível neste navegador';
        return;
    }

    if (leitorSintese.speaking) {
        pararLeituraVoz();
        return;
    }

    const titulo = document.getElementById('modal-titulo').textContent;
    const texto = document.getElementById('modal-texto').innerText.replace(/\s+/g, ' ').trim();
    utteranceLeitura = new SpeechSynthesisUtterance(`${titulo}. ${texto}`);
    utteranceLeitura.lang = 'pt-BR';
    utteranceLeitura.rate = 0.86;
    utteranceLeitura.pitch = 1;
    utteranceLeitura.onend = () => {
        botao.innerHTML = '<span aria-hidden="true">🔊</span> Ler em voz alta';
    };
    utteranceLeitura.onerror = () => {
        botao.innerHTML = '<span aria-hidden="true">🔊</span> Tentar ler novamente';
    };

    botao.innerHTML = '<span aria-hidden="true">■</span> Parar leitura';
    leitorSintese.cancel();
    leitorSintese.speak(utteranceLeitura);
}

function pararLeituraVoz() {
    if ('speechSynthesis' in window) leitorSintese.cancel();
    const botao = document.getElementById('btn-ler-texto');
    if (botao) botao.innerHTML = '<span aria-hidden="true">🔊</span> Ler em voz alta';
}

function revelarPista(numeroPista) {
    const explicacao = document.getElementById('texto-explicacao-pista');
    if (!explicacao) return;

    const pistas = {
        1: '<strong>Alerta 1 — contacto desconhecido:</strong> burlões usam desculpas como “o ecrã do telemóvel avariou” para justificar um número novo. Confirme ligando para o contacto antigo.',
        2: '<strong>Alerta 2 — pedido urgente:</strong> a pressa faz com que você aja por impulso, sem tempo para avaliar se a história é verdadeira.',
        3: '<strong>Alerta 3 — pedido de dinheiro:</strong> nunca transfira valores para um número novo de WhatsApp sem fazer uma chamada convencional para confirmar.'
    };

    explicacao.innerHTML = pistas[numeroPista] || 'Procure sinais de urgência, número desconhecido e pedido de dinheiro.';
}

const dadosQuiz = [
    {
        emoticon: '🏦',
        pergunta: 'O gestor do seu banco liga a dizer que a sua conta foi bloqueada e pede para digitar a palavra-passe no telefone. O que faz?',
        respostaSegura: false,
        explicacao: 'Exatamente! <strong>É um perigo.</strong> Bancos e funcionários reais nunca pedem palavras-passe ou códigos secretos por telefone.'
    },
    {
        emoticon: '📞',
        pergunta: 'Seu neto liga de um número desconhecido, diz que sofreu um acidente e exige dinheiro imediato. O que faz?',
        respostaSegura: false,
        explicacao: 'Perfeito! <strong>É um perigo.</strong> Desligue e ligue para o número oficial do seu neto ou dos pais dele para confirmar.'
    },
    {
        emoticon: '🔐',
        pergunta: 'Um amigo envia uma promoção de loja famosa. Antes de clicar, você pesquisa a oferta no site oficial. Isto é:',
        respostaSegura: true,
        explicacao: 'Muito bem! <strong>Isto é seguro.</strong> Confirmar links nos canais oficiais antes de abrir ajuda a evitar vírus e roubo de dados.'
    }
];

let indexQuestaoAtual = 0;
let pontuacaoJogador = 0;

function atualizarPainelQuiz() {
    const questaoAtual = dadosQuiz[indexQuestaoAtual];
    if (!questaoAtual) return;

    document.getElementById('progresso-etapa').textContent = `Situação ${indexQuestaoAtual + 1} de ${dadosQuiz.length}`;
    document.getElementById('pontuacao-atual').textContent = `Pontuação: ${pontuacaoJogador}`;
    document.getElementById('barra-indicadora').style.width = `${((indexQuestaoAtual + 1) / dadosQuiz.length) * 100}%`;
    document.getElementById('quiz-emoticon').textContent = questaoAtual.emoticon;
    document.getElementById('texto-pergunta-quiz').innerHTML = questaoAtual.pergunta;
}

function avaliarEscolhaQuiz(opcaoUsuario) {
    const questaoAtual = dadosQuiz[indexQuestaoAtual];
    const acertou = opcaoUsuario === questaoAtual.respostaSegura;
    const painelFeedback = document.getElementById('painel-feedback');
    const tituloFeedback = document.getElementById('feedback-titulo');

    if (acertou) {
        pontuacaoJogador += 1;
        document.getElementById('feedback-emoticon').textContent = '🎉';
        tituloFeedback.innerHTML = 'Excelente! Você acertou!';
        tituloFeedback.style.color = 'var(--marca-sucesso)';
    } else {
        document.getElementById('feedback-emoticon').textContent = '💡';
        tituloFeedback.innerHTML = 'Atenção a este detalhe';
        tituloFeedback.style.color = 'var(--marca-destaque)';
    }

    document.getElementById('feedback-mensagem').innerHTML = questaoAtual.explicacao;
    painelFeedback.style.display = 'flex';
}

function carregarProximaQuestao() {
    document.getElementById('painel-feedback').style.display = 'none';

    if (indexQuestaoAtual < dadosQuiz.length - 1) {
        indexQuestaoAtual += 1;
        atualizarPainelQuiz();
        return;
    }

    document.getElementById('bloco-interacao-pergunta').classList.add('escondido');
    document.getElementById('progresso-etapa').classList.add('escondido');
    document.getElementById('pontuacao-atual').classList.add('escondido');
    document.getElementById('painel-final').classList.remove('escondido');
    document.getElementById('resultado-final-pontos').textContent = `${pontuacaoJogador} de ${dadosQuiz.length} acertos!`;
}

function reiniciarJogo() {
    indexQuestaoAtual = 0;
    pontuacaoJogador = 0;
    document.getElementById('bloco-interacao-pergunta').classList.remove('escondido');
    document.getElementById('progresso-etapa').classList.remove('escondido');
    document.getElementById('pontuacao-atual').classList.remove('escondido');
    document.getElementById('painel-final').classList.add('escondido');
    atualizarPainelQuiz();
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarPainelQuiz();
    document.getElementById('aba-dicas')?.setAttribute('aria-current', 'page');

    document.getElementById('modal-dica')?.addEventListener('click', (event) => {
        if (event.target.id === 'modal-dica') fecharModal();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && document.getElementById('modal-dica')?.classList.contains('ativo')) {
            fecharModal();
        }
    });
});
