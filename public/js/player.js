const botoes = document.querySelectorAll('.btn-click'); // Selecionar todos os botões
const videoListas = document.querySelectorAll('.outher-videos'); // Selecionar todas as vídeo-listas


botoes.forEach((botao, index) => {
    const videoLista = videoListas[index]; // Obter a vídeo-lista correspondente
  
    botao.addEventListener('click', () => {
      videoLista.classList.toggle('on'); // Alternar classe 'on' na vídeo-lista
    });
  });
  