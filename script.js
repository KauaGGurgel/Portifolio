// Função atalho para selecionar elementos (igual ao $ do jQuery)
const $ = sel => document.querySelector(sel);

// Atualiza o ano automaticamente no footer
const yearEl = $('#year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Botão de alternar tema (claro/escuro)
const toggleThemeBtn = $('#toggle-theme');

// Lê qual tema estava salvo no navegador
const savedTheme = localStorage.getItem('theme');

// Se existir tema salvo, aplica ao site
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Atualiza o estado ARIA do botão
    if (toggleThemeBtn) {
        toggleThemeBtn.setAttribute('aria-pressed', savedTheme === 'dark');
    }
}

// Ação do botão de alternar tema
if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener('click', () => {

        // Descobre o tema atual
        const current = document.documentElement.getAttribute('data-theme') === 'dark'
            ? 'dark'
            : 'light';

        // Alterna o tema
        const next = current === 'dark'
            ? 'light'
            : 'dark';

        // Aplica novo tema
        document.documentElement.setAttribute('data-theme', next);

        // Salva o tema no navegador
        localStorage.setItem('theme', next);

        // Atualiza ARIA
        toggleThemeBtn.setAttribute('aria-pressed', next === 'dark');
    });
}

// Seleção dos campos do formulário
const form = $('#form-contato');
const nome = $('#nome');
const email = $('#email');
const mensagem = $('#mensagem');

// Validação básica de email
function validarEmail(emailStr) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(emailStr.toLowerCase());
}

// Limpa mensagens de erro
function limparErros() {
    const errorNome = $('#error-nome');
    const errorEmail = $('#error-email');
    const errorMensagem = $('#error-mensagem');

    if (errorNome) errorNome.textContent = '';
    if (errorEmail) errorEmail.textContent = '';
    if (errorMensagem) errorMensagem.textContent = '';
}

// Validação do formulário
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // impede o envio
        limparErros();

        let valido = true;

        // Valida nome
        if (!nome.value.trim()) {
            $('#error-nome').textContent = 'Por favor, insira seu nome.';
            valido = false;
        }

        // Valida email
        if (!email.value.trim()) {
            $('#error-email').textContent = 'Por favor, insira seu email.';
            valido = false;
        } else if (!validarEmail(email.value)) {
            $('#error-email').textContent = 'Formato de e-mail inválido.';
            valido = false;
        }

        // Valida mensagem
        if (!mensagem.value.trim()) {
            $('#error-mensagem').textContent = 'Por favor, escreva uma mensagem.';
            valido = false;
        }

        // Se houver erro, foca no primeiro campo errado
        if (!valido) {
            const firstError = document.querySelector('.error:not(:empty)');
            if (firstError) {
                let field = firstError.previousElementSibling;
                if (field) field.focus();
            }
            return;
        }

        // Limpa campos após enviar
        nome.value = '';
        email.value = '';
        mensagem.value = '';

        // Abre modal de sucesso
        const modal = $('#modal');
        if (modal) {
            modal.hidden = false;
            $('#modal-close').focus();
        }
    });
}

// Botão fechar modal
const modalClose = $('#modal-close');
if (modalClose) {
    modalClose.addEventListener('click', () => {
        $('#modal').hidden = true;
    });
}

// Garante que o modal abre ao enviar o formulário (duplicado por segurança)
document.getElementById("form-contato").addEventListener("submit", function(e){
    e.preventDefault();
    document.getElementById("modal").style.display = "flex"; 
});

// Fecha o modal
document.getElementById("modal-close").addEventListener("click", function(){
    document.getElementById("modal").style.display = "none"; 
});

// Atualiza ano no footer (repetido, mas sem erro)
document.getElementById("year").textContent = new Date().getFullYear();

// Fecha modal com ESC
document.addEventListener('keydown', (ev) => {
    const modal = $('#modal');
    if (ev.key === 'Escape' && modal && !modal.hidden) {
        modal.hidden = true;
    }
});

// Rolagem suave para links internos (#sobre, #contato, etc.)
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {

        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);

        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
