// script.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Site do treino Gabriel & Luiz carregado!');
    
    // Remover tela de carregamento
    setTimeout(function() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(function() {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
    
    // Adicionar funcionalidade de marcar exercícios completos
    const exercicios = document.querySelectorAll('.exercicio');
    
    exercicios.forEach(exercicio => {
        exercicio.addEventListener('click', function() {
            this.classList.toggle('completo');
        });
    });
    
    // Adicionar classe para exercícios completos no CSS
    const style = document.createElement('style');
    style.textContent = `
        .exercicio.completo {
            background-color: rgba(51, 102, 255, 0.2);
            opacity: 0.7;
        }
        .exercicio.completo .ordem {
            background-color: var(--azul);
        }
    `;
    document.head.appendChild(style);
    
    // Modal para dicas
    const modal = document.getElementById('dicaModal');
    const dicaTexto = document.getElementById('dicaTexto');
    const closeBtn = document.querySelector('.close');
    
    document.querySelectorAll('.dica-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            const dica = this.getAttribute('data-dica');
            dicaTexto.textContent = dica;
            modal.style.display = 'block';
        });
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });
    
    // Salvar progresso no localStorage
    function salvarProgresso() {
        const exerciciosCompletos = [];
        document.querySelectorAll('.exercicio.completo').forEach(ex => {
            exerciciosCompletos.push(ex.querySelector('.nome').textContent);
        });
        localStorage.setItem('treinoGabrielLuiz', JSON.stringify(exerciciosCompletos));
    }
    
    // Carregar progresso do localStorage
    function carregarProgresso() {
        const salvos = JSON.parse(localStorage.getItem('treinoGabrielLuiz') || '[]');
        document.querySelectorAll('.exercicio').forEach(ex => {
            const nomeExercicio = ex.querySelector('.nome').textContent;
            if (salvos.includes(nomeExercicio)) {
                ex.classList.add('completo');
            }
        });
    }
    
    // Salvar progresso quando um exercício é marcado
    exercicios.forEach(exercicio => {
        exercicio.addEventListener('click', salvarProgresso);
    });
    
    // Carregar progresso ao iniciar
    carregarProgresso();
});
