document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const closeModalBtn = document.getElementById('close-modal');
  const readBtn = document.getElementById('read-btn');

  // Abre o modal e carrega os dados do card clicado
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title');
      const content = card.getAttribute('data-content');

      modalTitle.textContent = title;
      modalBody.textContent = content;

      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  // Função para fechar o modal e parar a leitura em voz alta
  function closeModal() {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    window.speechSynthesis.cancel(); // Interrompe a leitura se estiver ativa
  }

  closeModalBtn.addEventListener('click', closeModal);

  // Fecha o modal se clicar fora do conteúdo
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Botão de Leitura (Text-to-Speech)
  readBtn.addEventListener('click', () => {
    window.speechSynthesis.cancel(); // Para leituras anteriores

    const textToRead = `${modalTitle.textContent}. ${modalBody.textContent}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);

    utterance.lang = 'pt-BR';
    utterance.rate = 0.9; // Velocidade ligeiramente pausada para facilitar a compreensão

    window.speechSynthesis.speak(utterance);
  });
});
