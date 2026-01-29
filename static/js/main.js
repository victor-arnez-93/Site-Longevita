/* ============================================================
   LONGEVITÁ - JAVASCRIPT ATUALIZADO 2026
   Desenvolvido por CRV Soluções em TI
============================================================ */

/* ============================================================
   SCROLL SUAVE NO MENU
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e){
        e.preventDefault();
        const alvo = document.querySelector(this.getAttribute("href"));
        if (alvo) {
            window.scrollTo({
                top: alvo.offsetTop - 80,
                behavior: "smooth"
            });

            // Fecha menu mobile se estiver aberto
            const menuToggle = document.querySelector('.menu-toggle');
            const menu = document.querySelector('.menu');
            if (menuToggle && menu) {
                menuToggle.classList.remove('active');
                menu.classList.remove('active');
            }
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
   MENU HAMBURGUER MOBILE
============================================================ */
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        menu.classList.toggle('active');
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
   CARROSSEL INFINITO DE ATIVIDADES
============================================================ */
const carrosselContainer = document.querySelector('.carrossel-container');
const carrosselTrack = document.querySelector('.carrossel-track');
const prevBtn = document.querySelector('.carrossel-btn.prev');
const nextBtn = document.querySelector('.carrossel-btn.next');

if (carrosselTrack && carrosselContainer) {
    const cards = Array.from(carrosselTrack.children);
    const cardWidth = cards[0].offsetWidth + 25; // largura do card + gap
    let currentIndex = 0;
    let autoPlayInterval;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    // Clona cards para efeito infinito
    const cloneFirst = cards.slice(0, 5).map(card => card.cloneNode(true));
    const cloneLast = cards.slice(-5).map(card => card.cloneNode(true));

    cloneFirst.forEach(clone => carrosselTrack.appendChild(clone));
    cloneLast.forEach(clone => carrosselTrack.insertBefore(clone, carrosselTrack.firstChild));

    currentIndex = 5; // Começa após os clones iniciais
    updateCarrossel(false);

    function updateCarrossel(animate = true) {
        const offset = -currentIndex * cardWidth;
        carrosselTrack.style.transition = animate ? 'transform 0.5s ease' : 'none';
        carrosselTrack.style.transform = `translateX(${offset}px)`;
    }

    function nextSlide() {
        currentIndex++;
        updateCarrossel();

        // Reset infinito
        if (currentIndex >= cards.length + 5) {
            setTimeout(() => {
                currentIndex = 5;
                updateCarrossel(false);
            }, 500);
        }
    }

    function prevSlide() {
        currentIndex--;
        updateCarrossel();

        // Reset infinito
        if (currentIndex < 0) {
            setTimeout(() => {
                currentIndex = cards.length + 4;
                updateCarrossel(false);
            }, 500);
        }
    }

    // Botões de navegação
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    // Auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 3000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Pausa ao hover
    carrosselContainer.addEventListener('mouseenter', stopAutoPlay);
    carrosselContainer.addEventListener('mouseleave', startAutoPlay);

    // Drag/Swipe
    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function dragStart(event) {
        isDragging = true;
        startPos = getPositionX(event);
        carrosselContainer.style.cursor = 'grabbing';
        stopAutoPlay();
    }

    function dragMove(event) {
        if (!isDragging) return;
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }

    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100) {
            nextSlide();
        } else if (movedBy > 100) {
            prevSlide();
        }

        currentTranslate = 0;
        prevTranslate = 0;
        carrosselContainer.style.cursor = 'grab';
        resetAutoPlay();
    }

    // Event listeners para drag
    carrosselContainer.addEventListener('mousedown', dragStart);
    carrosselContainer.addEventListener('mousemove', dragMove);
    carrosselContainer.addEventListener('mouseup', dragEnd);
    carrosselContainer.addEventListener('mouseleave', () => {
        if (isDragging) dragEnd();
    });

    // Touch events
    carrosselContainer.addEventListener('touchstart', dragStart);
    carrosselContainer.addEventListener('touchmove', dragMove);
    carrosselContainer.addEventListener('touchend', dragEnd);

    // Inicia auto-play
    startAutoPlay();

    // Recalcula ao redimensionar
    window.addEventListener('resize', () => {
        updateCarrossel(false);
    });
}

/* ============================================================
   MODAL DE ATIVIDADES (EQUIPE MULTIDISCIPLINAR)
============================================================ */
const modalAtividade = document.getElementById('modal-atividade');
const modalAtividadeImg = document.getElementById('modal-atividade-img');
const modalAtividadeTitulo = document.getElementById('modal-atividade-titulo');
const multiItems = document.querySelectorAll('.multi-item');

// Mapeia atividades para imagens (placeholder por enquanto)
const atividadeImages = {
    'arteterapia': 'static/imagens/atividades/arteterapia.jpg',
    'artesanato': 'static/imagens/atividades/artesanato.jpg',
    'psicologia': 'static/imagens/atividades/psicologia.jpg',
    'educacao-fisica': 'static/imagens/atividades/educacao-fisica.jpg',
    'pintura': 'static/imagens/atividades/pintura.jpg',
    'terapia-ocupacional': 'static/imagens/atividades/terapia-ocupacional.jpg',
    'pilates': 'static/imagens/atividades/pilates.jpg',
    'danca': 'static/imagens/atividades/danca.jpg'
};

multiItems.forEach(item => {
    item.addEventListener('click', () => {
        const atividade = item.dataset.atividade;
        const nome = item.querySelector('h4').textContent;
        const especialidade = item.querySelector('p').textContent;

        modalAtividadeImg.src = atividadeImages[atividade] || 'static/imagens/placeholder-atividade.jpg';
        modalAtividadeTitulo.textContent = `${nome} - ${especialidade}`;
        modalAtividade.classList.add('active');
    });
});

// Fecha modal de atividade
document.querySelector('.modal-close')?.addEventListener('click', () => {
    modalAtividade.classList.remove('active');
});

modalAtividade?.addEventListener('click', (e) => {
    if (e.target === modalAtividade) {
        modalAtividade.classList.remove('active');
    }
});

/* ============================================================
   ABAS NOSSO ESPAÇO
============================================================ */
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;

        // Remove active de todos
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Adiciona active no clicado
        btn.classList.add('active');
        document.getElementById(`tab-${targetTab}`).classList.add('active');
    });
});

/* ============================================================
   LIGHTBOX NOSSO ESPAÇO
============================================================ */
const lightbox = document.getElementById('lightbox-espacos');
const lightboxImg = document.getElementById('lightbox-img');
const espacoItems = document.querySelectorAll('.espaco-item');

espacoItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.dataset.img;
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
    });
});

// Fecha lightbox
document.querySelector('.lightbox-close')?.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
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
   ENVIO DO FORMULÁRIO (INTEGRAÇÃO FUTURA GOOGLE SHEETS)
============================================================ */
const formContato = document.querySelector('#form-contato');

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