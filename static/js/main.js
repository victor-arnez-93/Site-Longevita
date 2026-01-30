/* ============================================================
   LONGEVITÁ - JAVASCRIPT ATUALIZADO 2026
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

        // Fecha menu ao clicar em qualquer link
        const menuLinks = document.querySelectorAll('.menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });

        // Fecha menu ao clicar fora
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

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
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

    animarElementos.forEach(elemento => {
        observer.observe(elemento);
    });

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
            if (window.scrollY > 400) {
                btnTop.style.display = 'flex';
            } else {
                btnTop.style.display = 'none';
            }
        });
    }

    // ============================================================
    // CARROSSEL INFINITO COM DRAG/SWIPE
    // ============================================================
    const track = document.querySelector('.carrossel-track');
    const prevBtn = document.querySelector('.carrossel-btn.prev');
    const nextBtn = document.querySelector('.carrossel-btn.next');

    if (track && prevBtn && nextBtn) {
        const cards = Array.from(track.children);
        const cardWidth = cards[0].offsetWidth;
        const gap = 20;
        const totalCardWidth = cardWidth + gap;

        let currentIndex = 0;
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID = 0;

        // Clone os cards para loop infinito
        const cloneCount = 3;
        for (let i = 0; i < cloneCount; i++) {
            cards.forEach(card => {
                track.appendChild(card.cloneNode(true));
            });
        }

        // Auto-play
        let autoPlayInterval = setInterval(moveNext, 3500);

        // Botões
        nextBtn.addEventListener('click', () => {
            resetAutoPlay();
            moveNext();
        });

        prevBtn.addEventListener('click', () => {
            resetAutoPlay();
            movePrev();
        });

        function moveNext() {
            currentIndex++;
            updatePosition();
        }

        function movePrev() {
            currentIndex--;
            updatePosition();
        }

        function updatePosition() {
            currentTranslate = currentIndex * -totalCardWidth;
            prevTranslate = currentTranslate;
            track.style.transform = `translateX(${currentTranslate}px)`;

            // Reset infinito
            const totalCards = track.children.length;
            const originalCardsCount = cards.length;

            if (currentIndex >= totalCards - originalCardsCount) {
                setTimeout(() => {
                    track.style.transition = 'none';
                    currentIndex = originalCardsCount;
                    currentTranslate = currentIndex * -totalCardWidth;
                    prevTranslate = currentTranslate;
                    track.style.transform = `translateX(${currentTranslate}px)`;
                    setTimeout(() => {
                        track.style.transition = 'transform 0.5s ease';
                    }, 50);
                }, 500);
            }

            if (currentIndex < 0) {
                setTimeout(() => {
                    track.style.transition = 'none';
                    currentIndex = totalCards - (originalCardsCount * 2);
                    currentTranslate = currentIndex * -totalCardWidth;
                    prevTranslate = currentTranslate;
                    track.style.transform = `translateX(${currentTranslate}px)`;
                    setTimeout(() => {
                        track.style.transition = 'transform 0.5s ease';
                    }, 50);
                }, 500);
            }
        }

        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(moveNext, 3500);
        }

        // Drag com mouse
        track.addEventListener('mousedown', dragStart);
        track.addEventListener('mousemove', drag);
        track.addEventListener('mouseup', dragEnd);
        track.addEventListener('mouseleave', dragEnd);

        // Touch para mobile
        track.addEventListener('touchstart', dragStart);
        track.addEventListener('touchmove', drag);
        track.addEventListener('touchend', dragEnd);

        function dragStart(e) {
            isDragging = true;
            startPos = getPositionX(e);
            animationID = requestAnimationFrame(animation);
            track.style.cursor = 'grabbing';
            clearInterval(autoPlayInterval);
        }

        function drag(e) {
            if (!isDragging) return;
            const currentPosition = getPositionX(e);
            currentTranslate = prevTranslate + currentPosition - startPos;
        }

        function dragEnd() {
            isDragging = false;
            cancelAnimationFrame(animationID);
            track.style.cursor = 'grab';

            const movedBy = currentTranslate - prevTranslate;

            if (movedBy < -100) {
                currentIndex++;
            }

            if (movedBy > 100) {
                currentIndex--;
            }

            updatePosition();
            resetAutoPlay();
        }

        function getPositionX(e) {
            return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        }

        function animation() {
            track.style.transform = `translateX(${currentTranslate}px)`;
            if (isDragging) requestAnimationFrame(animation);
        }

        // Pause auto-play ao passar mouse
        track.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });

        track.addEventListener('mouseleave', () => {
            resetAutoPlay();
        });
    }

    // ============================================================
    // ABAS "NOSSO ESPAÇO"
    // ============================================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active de todos
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Adiciona active ao clicado
            this.classList.add('active');
            document.getElementById(`tab-${targetTab}`).classList.add('active');
        });
    });

    // ============================================================
    // LIGHTBOX PARA ESPAÇOS
    // ============================================================
    const espacoItems = document.querySelectorAll('.espaco-item');
    const lightbox = document.getElementById('lightbox-espacos');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox && lightboxImg && lightboxClose) {
        espacoItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.getAttribute('data-img');
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
            });
        });

        lightboxClose.addEventListener('click', function() {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
            }
        });
    }

    // ============================================================
    // EQUIPE MULTIDISCIPLINAR - TOGGLE MOBILE
    // ============================================================
    const multiItems = document.querySelectorAll('.multi-item');

    // Detecta se é mobile
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        multiItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active de todos
                multiItems.forEach(i => i.classList.remove('active'));
                // Adiciona active no clicado
                this.classList.add('active');

                // Remove após 3 segundos
                setTimeout(() => {
                    this.classList.remove('active');
                }, 3000);
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

            // Validação básica
            if (!nome || !email || !telefone || !mensagem) {
                alert('Por favor, preencha todos os campos!');
                return;
            }

            // Aqui você pode integrar com Google Sheets ou enviar email
            console.log({
                nome: nome,
                email: email,
                telefone: telefone,
                mensagem: mensagem
            });

            // Mensagem de sucesso
            alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.\n\nEntraremos em contato em breve.`);

            // Limpa formulário
            formContato.reset();

            // Redireciona para WhatsApp (opcional)
            const whatsappMsg = `Olá! Sou ${nome}. ${mensagem}`;
            const whatsappURL = `https://wa.me/5515981234567?text=${encodeURIComponent(whatsappMsg)}`;
            // window.open(whatsappURL, '_blank');
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

});
