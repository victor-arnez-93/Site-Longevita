/* ============================================================
   SCROLL SUAVE NO MENU
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e){
        // Ignora link do prontuário (tem handler específico)
        if(this.getAttribute("href") === "#prontuario") return;

        e.preventDefault();
        const alvo = document.querySelector(this.getAttribute("href"));
        if (alvo) {
            window.scrollTo({
                top: alvo.offsetTop - 80,
                behavior: "smooth"
            });
        }
    });
});

/* ============================================================
   ANIMAÇÃO DE ENTRADA DAS SEÇÕES (FADE-UP)
============================================================ */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("mostrar");
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll(".animar").forEach(sec => observer.observe(sec));

/* ============================================================
   ANIMAÇÃO DO HEADER (SOMBRA AO ROLAR)
============================================================ */
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (window.scrollY > 10) {
        header.classList.add("header-shadow");
    } else {
        header.classList.remove("header-shadow");
    }
});

/* ============================================================
   HOVER SUAVE EM BOTÕES
============================================================ */
document.querySelectorAll(".button-primary").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        btn.style.transform = "scale(1.03) translateY(-2px)";
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "scale(1) translateY(0)";
    });
});

/* ============================================================
   PLACEHOLDERS INTELIGENTES (efeito focus)
============================================================ */
document.querySelectorAll("input, textarea").forEach(campo => {
    campo.addEventListener("focus", () => {
        campo.style.borderColor = "#96B74B";
        campo.style.background = "#ffffff";
    });
    campo.addEventListener("blur", () => {
        campo.style.borderColor = "#ddd";
        campo.style.background = "#ffffff";
    });
});

/* ============================================================
   BOTÃO VOLTAR AO TOPO
============================================================ */
const btnTop = document.querySelector('.floating-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        btnTop.style.display = 'flex';
    } else {
        btnTop.style.display = 'none';
    }
});

/* ============================================================
   MENU HAMBURGUER MOBILE
============================================================ */

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            menu.classList.remove('active');
        });
    });

    // Fecha o menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            menu.classList.remove('active');
        }
    });
}

/* ============================================================
   ENVIO DO FORMULÁRIO (INTEGRAÇÃO FUTURA GOOGLE SHEETS)
============================================================ */
const formContato = document.querySelector('#contato form');

if (formContato) {
    formContato.addEventListener('submit', function(e) {
        e.preventDefault();

        const btnEnviar = this.querySelector('.btn-enviar');
        const textoOriginal = btnEnviar.innerHTML;

        // Mostra mensagem de carregamento
        btnEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        btnEnviar.disabled = true;
        btnEnviar.style.opacity = '0.6';

        // Captura os dados do formulário
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const mensagem = document.getElementById('mensagem').value;

        // Simulação de envio (substituir por integração real futura)
        setTimeout(() => {
            alert(`✅ Mensagem enviada com sucesso!\n\nOlá ${nome}, em breve entraremos em contato.\n\nObrigado!`);
            formContato.reset();

            // Restaura o botão
            btnEnviar.innerHTML = textoOriginal;
            btnEnviar.disabled = false;
            btnEnviar.style.opacity = '1';
        }, 1500);

        /*
        // INTEGRAÇÃO FUTURA COM GOOGLE SHEETS
        const formData = new FormData(this);
        const scriptURL = 'SUA_URL_GOOGLE_APPS_SCRIPT_AQUI';

        fetch(scriptURL, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === 'success') {
                alert('✅ Mensagem enviada com sucesso!\n\nEm breve entraremos em contato. Obrigado!');
                formContato.reset();
            } else {
                alert('❌ Erro ao enviar: ' + data.message);
            }
        })
        .catch(error => {
            alert('❌ Erro ao enviar mensagem.\n\nPor favor, tente novamente ou entre em contato pelo WhatsApp.');
            console.error('Erro:', error);
        })
        .finally(() => {
            btnEnviar.innerHTML = textoOriginal;
            btnEnviar.disabled = false;
            btnEnviar.style.opacity = '1';
        });
        */
    });
}

/* ============================================================
   CONSOLE MESSAGE (CRV SOLUÇÕES EM TI)
============================================================ */
console.log('%c🚀 Site desenvolvido por CRV Soluções em TI', 'background: #96B74B; color: #fff; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%cLongevitá © 2026 - Todos os direitos reservados', 'color: #523a34; font-size: 14px;');
