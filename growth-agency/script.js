document.addEventListener('DOMContentLoaded', () => {

    // --- FUNÇÃO DO LOADER ---
    const loader = document.querySelector('.loader');
    window.addEventListener('load', () => {
        // Adiciona um pequeno delay para a transição ser mais suave
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 300);
    });

    // --- FUNÇÃO DO HEADER (MUDA DE COR AO ROLAR) ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- FUNCIONALIDADE DO MENU MOBILE ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        // Trava o scroll do body quando o menu está aberto
        document.body.classList.toggle('no-scroll');
    });

    // Fecha o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // --- ANIMAÇÃO DOS NÚMEROS (CONTADORES) ---
    const statsSection = document.querySelector('.stats');
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCounters = () => {
        statNumbers.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 segundos
            let start = 0;
            const stepTime = Math.abs(Math.floor(duration / target));

            const timer = setInterval(() => {
                start += 1;
                counter.textContent = start;
                if (start === target) {
                    clearInterval(timer);
                }
            }, stepTime);
        });
    };
    
    // --- OBSERVER PARA ANIMAÇÕES AO ROLAR ---
    const animatedElements = document.querySelectorAll('.anim-on-scroll');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animação dos contadores
                if (entry.target.classList.contains('stats')) {
                    animateCounters();
                    observer.unobserve(entry.target); // Anima apenas uma vez
                }
                
                // Animações gerais
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 // O elemento é considerado visível com 10% de sua área na tela
    });

    if (statsSection) {
        observer.observe(statsSection);
    }
    animatedElements.forEach(el => observer.observe(el));


    // --- ATUALIZA O LINK ATIVO NA NAVEGAÇÃO AO ROLAR ---
    const sections = document.querySelectorAll('section[id]');
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.nav-link').forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' }); // Ativa quando a seção está no meio da tela

    sections.forEach(section => navObserver.observe(section));


    // --- ATUALIZA O ANO NO RODAPÉ ---
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

