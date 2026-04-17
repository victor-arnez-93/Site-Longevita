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
    // CONTROLES VÍDEO LOCAL (PLAY/PAUSE + MUTE)
    // ============================================================
    window.toggleVideo = function(videoId, btn) {
        const video = document.getElementById(videoId);
        const icon = btn.querySelector('i');
        if (video.paused) {
            video.play();
            icon.classList.replace('fa-play', 'fa-pause');
        } else {
            video.pause();
            icon.classList.replace('fa-pause', 'fa-play');
        }
    };

    window.toggleMute = function(videoId, btn) {
        const video = document.getElementById(videoId);
        const icon = btn.querySelector('i');
        video.muted = !video.muted;
        if (video.muted) {
            icon.classList.replace('fa-volume-up', 'fa-volume-mute');
        } else {
            icon.classList.replace('fa-volume-mute', 'fa-volume-up');
        }
    };

    // ============================================================
    // CONSOLE LOG
    // ============================================================
    console.log('%c🌿 Longevitá - Site carregado com sucesso!', 'color: #96B74B; font-size: 16px; font-weight: bold;');
    console.log('%c💻 Desenvolvido por CRV Soluções em TI', 'color: #EB7217; font-size: 12px;');

}); // FIM DOMContentLoaded