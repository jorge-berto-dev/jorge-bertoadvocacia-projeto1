// script.js

document.addEventListener('DOMContentLoaded', function() {
    
    // Inicialização do AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,
        once: true, // Animar apenas uma vez
        offset: 50
    });

    // 1. Menu Mobile (Hambúrguer)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Troca ícone entre hambúrguer e X
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 2. Header Sticky com Sombra
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Scroll Suave (Smooth Scroll) - manual para complementar o CSS scroll-behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 4. Contador Animado (Números) com Intersection Observer
    const numberSection = document.querySelector('.numbers');
    const numberSpans = document.querySelectorAll('.number');
    let animationStarted = false;

    function startCounter(element, target) {
        let current = 0;
        const increment = target / 60; // 60 frames em 2 segundos (aprox 30fps)
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.id === 'num3' ? '%' : '+'); // Adiciona % para o 100
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.id === 'num3' ? '%' : '+');
            }
        }, 30); // ~30ms para ~30fps, 2 segundos total
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animationStarted) {
                animationStarted = true;
                numberSpans.forEach(span => {
                    const target = parseInt(span.getAttribute('data-target'), 10);
                    if (!isNaN(target)) {
                        // Reseta para 0 antes de começar
                        span.textContent = '0';
                        startCounter(span, target);
                    }
                });
            }
        });
    }, { threshold: 0.5 }); // Dispara quando 50% da seção está visível

    if (numberSection) {
        observer.observe(numberSection);
    }

    // 5. Validação de Formulário (Newsletter)
    const newsletterForm = document.getElementById('newsletter-form');
    const feedbackDiv = document.getElementById('newsletter-feedback');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Validação simples de email
            if (email === '' || !email.includes('@') || !email.includes('.')) {
                showFeedback('Por favor, insira um e-mail válido.', 'error');
            } else {
                // Simula sucesso (aqui você adicionaria a lógica de envio real)
                showFeedback('E-mail cadastrado com sucesso!', 'success');
                emailInput.value = ''; // Limpa o campo
            }
        });
    }

    function showFeedback(message, type) {
        if (feedbackDiv) {
            feedbackDiv.textContent = message;
            feedbackDiv.style.display = 'block';
            feedbackDiv.style.color = type === 'success' ? '#a5d6a5' : '#f8d7da';
            
            // Esconde após 3 segundos
            setTimeout(() => {
                feedbackDiv.style.display = 'none';
            }, 3000);
        }
    }

    // 6. Links do WhatsApp (já estão no href do footer)
    // Não é necessário JS adicional, apenas garantir que o link abra em nova aba.
    // O atributo target="_blank" já faz isso.

}); // Fim do DOMContentLoaded