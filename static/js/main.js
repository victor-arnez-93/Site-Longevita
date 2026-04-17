/* ============================================================
   LONGEVITÁ - JAVASCRIPT COMPLETO 2026
   Desenvolvido por CRV Soluções em TI
============================================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================================
    // MENU MOBILE TOGGLE
    // ============================================================
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        const menuLinks = document.querySelectorAll('.menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });

        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
                menu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    // ============================================================
    // SCROLL SUAVE PARA ÂNCORAS
    // ============================================================
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ============================================================
    // ANIMAÇÃO DE ENTRADA (SCROLL REVEAL)
    // ============================================================
    const animarElementos = document.querySelectorAll('.animar');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('mostrar');
            }
        });
    }, observerOptions);
    animarElementos.forEach(elemento => observer.observe(elemento));

    // ============================================================
    // HEADER COM SOMBRA AO ROLAR
    // ============================================================
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('header-shadow');
        } else {
            header.classList.remove('header-shadow');
        }
    });

    // ============================================================
    // BOTÃO VOLTAR AO TOPO
    // ============================================================
    const btnTop = document.querySelector('.floating-top');
    if (btnTop) {
        window.addEventListener('scroll', function() {
            btnTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
        });
    }

    // ============================================================
    // CARROSSEL DESTAQUES & ATIVIDADES
    // ============================================================
    (function() {
        const track = document.querySelector('.carrossel-track');
        const container = document.querySelector('.carrossel-track-container');
        const btnPrev = document.querySelector('.carrossel-btn.prev');
        const btnNext = document.querySelector('.carrossel-btn.next');
        const dotsContainer = document.getElementById('carrossel-dots');

        if (!track || !btnPrev || !btnNext) return;

        const cards = Array.from(track.children);
        let currentIndex = 0;
        let autoPlayInterval;
        let isPaused = false;

        function getVisibleCount() {
            const w = window.innerWidth;
            if (w <= 480) return 2;
            if (w <= 768) return 3;
            if (w <= 1024) return 4;
            return 5;
        }

        function getCardWidth() {
            return cards[0].offsetWidth + 20; // 20 = gap
        }

        function getTotalPages() {
            return Math.ceil(cards.length / getVisibleCount());
        }

        function updateCarrossel() {
            const offset = currentIndex * getCardWidth() * getVisibleCount();
            track.style.transform = `translateX(-${offset}px)`;
            btnPrev.disabled = currentIndex === 0;
            btnNext.disabled = currentIndex >= getTotalPages() - 1;
            updateDots();
        }

        function buildDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            for (let i = 0; i < getTotalPages(); i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentIndex = i;
                    updateCarrossel();
                    resetAutoPlay();
                });
                dotsContainer.appendChild(dot);
            }
        }

        function updateDots() {
            if (!dotsContainer) return;
            dotsContainer.querySelectorAll('.dot')
                .forEach((d, i) => d.classList.toggle('active', i === currentIndex));
        }

        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                if (isPaused) return;
                if (currentIndex >= getTotalPages() - 1) {
                    currentIndex = 0;
                } else {
                    currentIndex++;
                }
                updateCarrossel();
            }, 4000);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        btnNext.addEventListener('click', () => {
            if (currentIndex < getTotalPages() - 1) {
                currentIndex++;
                updateCarrossel();
                resetAutoPlay();
            }
        });

        btnPrev.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarrossel();
                resetAutoPlay();
            }
        });

        // Pausa no hover
        track.addEventListener('mouseenter', () => { isPaused = true; });
        track.addEventListener('mouseleave', () => { isPaused = false; });

        // Swipe touch
        let startX = 0;
        track.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
            isPaused = true;
        }, { passive: true });
        track.addEventListener('touchend', e => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentIndex < getTotalPages() - 1) currentIndex++;
                else if (diff < 0 && currentIndex > 0) currentIndex--;
                updateCarrossel();
                resetAutoPlay();
            }
            setTimeout(() => { isPaused = false; }, 2000);
        });

        // Recalcula no resize
        window.addEventListener('resize', () => {
            currentIndex = 0;
            buildDots();
            updateCarrossel();
        });

        buildDots();
        updateCarrossel();
        startAutoPlay();
    })();

    // ============================================================
    // ABAS "NOSSO ESPAÇO"
    // ============================================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(`tab-${targetTab}`).classList.add('active');
        });
    });

    // ============================================================
    // EQUIPE MULTIDISCIPLINAR - TOGGLE MOBILE
    // ============================================================
    const multiItems = document.querySelectorAll('.multi-item');

    if (window.innerWidth <= 768) {
        multiItems.forEach(item => {
            item.addEventListener('click', function() {
                multiItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                setTimeout(() => { this.classList.remove('active'); }, 3000);
            });
        });
    }

    // ============================================================
    // FORMULÁRIO DE CONTATO
    // ============================================================
    const formContato = document.getElementById('form-contato');
    if (formContato) {
        formContato.addEventListener('submit', function(e) {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const mensagem = document.getElementById('mensagem').value;

            if (!nome || !email || !telefone || !mensagem) {
                alert('Por favor, preencha todos os campos!');
                return;
            }

            alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.\n\nEntraremos em contato em breve.`);
            formContato.reset();
        });
    }

    // ============================================================
    // MÁSCARA PARA TELEFONE
    // ============================================================
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 10) {
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else {
                value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            }
            e.target.value = value;
        });
    }

    // ============================================================
    // CONSOLE LOG
    // ============================================================
    console.log('%c🌿 Longevitá - Site carregado com sucesso!', 'color: #96B74B; font-size: 16px; font-weight: bold;');
    console.log('%c💻 Desenvolvido por CRV Soluções em TI', 'color: #EB7217; font-size: 12px;');

}); // FIM DOMContentLoaded