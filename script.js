
const $ = sel => document.querySelector(sel);

const yearEl = $('#year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

const toggleThemeBtn = $('#toggle-theme');

const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (toggleThemeBtn) {
        toggleThemeBtn.setAttribute('aria-pressed', savedTheme === 'dark');
    }
}

if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light' ;

        const next = current === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        toggleThemeBtn.setAttribute('aria-pressed', next === 'dark');
    });
}

const form = $('#form-contato');
const nome = $('#nome');
const email = $('#email');
const mensagem = $('#mensagem');

function validarEmail(emailStr) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(emailStr.toLowerCase());
}

function limparErros() {
    const errorNome = $('#error-nome');
    const errorEmail = $('#error-email');
    const errorMensagem = $('#error-mensagem');

    if (errorNome) errorNome.textContent = '';
    if (errorEmail) errorEmail.textContent = '';
    if (errorMensagem) errorMensagem.textContent = '';
}

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        limparErros();

        let valido = true;

        if (!nome.value.trim()) {
            $('#error-nome').textContent = 'Por favor, insira seu nome.';
            valido = false;
        }

        if (!email.value.trim()) {
            $('#error-email').textContent = 'Por favor, insira seu email.';
            valido = false;
        } else if (!validarEmail(email.value)) {
            $('#error-email').textContent = 'Formato de e-mail inválido.';
            valido = false;
        }

        if (!mensagem.value.trim()) {
            $('#error-mensagem').textContent = 'Por favor, escreva uma mensagem.';
            valido = false;
        }

        if (!valido) {
            const firstError = document.querySelector('.error:not(:empty)');
            if (firstError) {
                let field = firstError.previousElementSibling;
                if (field) field.focus();
            }
            return;
        }

        nome.value = '';
        email.value = '';
        mensagem.value = '';

        const modal = $('#modal');
        if (modal) {
            modal.hidden = false;
            $('#modal-close').focus();
        }
    });
}

const modalClose = $('#modal-close');
if (modalClose) {
    modalClose.addEventListener('click', () => {
        $('#modal').hidden = true;
    });
}

document.getElementById("form-contato").addEventListener("submit", function(e){
    e.preventDefault();
    document.getElementById("modal").style.display = "flex"; 
});

document.getElementById("modal-close").addEventListener("click", function(){
    document.getElementById("modal").style.display = "none"; 
});

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("year").textContent = new Date().getFullYear();
document.addEventListener('keydown', (ev) => {
    const modal = $('#modal');
    if (ev.key === 'Escape' && modal && !modal.hidden) {
        modal.hidden = true;
    }
});

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