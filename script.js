// script.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Site do treino Gabriel & Luiz carregado!');
    
    // Remover tela de carregamento
    setTimeout(function() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 2000);
    
    // Verificar se a imagem da capa carregou
    const headerImg = document.querySelector('.header-img');
    if (headerImg) {
        headerImg.onerror = function() {
            console.log('Imagem da capa não carregou, usando fallback');
            // O CSS já tem um fallback de gradiente
        };
        
        headerImg.onload = function() {
            console.log('Imagem da capa carregada com sucesso');
        };
    }
    
    // Adicionar funcionalidade de marcar exercícios completos
    const exercicios = document.querySelectorAll('.exercicio');
    
    exercicios.forEach(exercicio => {
        exercicio.addEventListener('click', function() {
            this.classList.toggle('completo');
            salvarProgresso();
        });
    });
    
    // Modal para dicas
    const modal = document.getElementById('dicaModal');
    const dicaTexto = document.getElementById('dicaTexto');
    const closeBtn = document.querySelector('.close');
    
    if (modal && dicaTexto && closeBtn) {
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
    }
    
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
    
    // Carregar progresso ao iniciar
    carregarProgresso();
});
