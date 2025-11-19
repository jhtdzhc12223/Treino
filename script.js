// script.js - VERSÃO CORRIGIDA
document.addEventListener('DOMContentLoaded', function() {
    console.log('Site do treino G&L&V carregado!');
    
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
    
    // Adicionar funcionalidade de marcar exercícios completos
    const exercicios = document.querySelectorAll('.exercicio');
    
    exercicios.forEach(exercicio => {
        exercicio.addEventListener('click', function(e) {
            // Não marcar como completo se clicar em um ícone de dica
            if (!e.target.classList.contains('dica-icon')) {
                this.classList.toggle('completo');
                salvarProgresso();
            }
        });
    });
    
    // Modal para dicas - ATUALIZADO PARA L E V
    const modal = document.getElementById('dicaModal');
    const dicaTexto = document.getElementById('dicaTexto');
    const dicaTitulo = document.getElementById('dicaTitulo');
    const closeBtn = document.querySelector('.close');
    
    if (modal && dicaTexto && closeBtn && dicaTitulo) {
        document.querySelectorAll('.dica-icon').forEach(icon => {
            icon.addEventListener('click', function(e) {
                e.stopPropagation();
                const dica = this.getAttribute('data-dica');
                const isL = this.classList.contains('L-icon');
                const isV = this.classList.contains('V-icon');
                
                dicaTexto.textContent = dica;
                
                // Definir título baseado no tipo de ícone
                if (isL) {
                    dicaTitulo.textContent = '💪 Dica do Luiz';
                    dicaTitulo.style.color = '#ff3333';
                } else if (isV) {
                    dicaTitulo.textContent = '🔥 Dica do Vinicios';
                    dicaTitulo.style.color = '#3366ff';
                } else {
                    dicaTitulo.textContent = '💡 Dica do Exercício';
                    dicaTitulo.style.color = '#ff3333';
                }
                
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
        localStorage.setItem('treinoGLV', JSON.stringify(exerciciosCompletos));
    }
    
    // Carregar progresso do localStorage
    function carregarProgresso() {
        const salvos = JSON.parse(localStorage.getItem('treinoGLV') || '[]');
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
