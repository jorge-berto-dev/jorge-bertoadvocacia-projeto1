// ===== INICIALIZAÇÃO DO AOS =====
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ===== MENU MOBILE =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const menuIcon = document.getElementById('menuIcon');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Troca o ícone entre 'bars' e 'times'
        if (navMenu.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
}

// Fecha o menu mobile ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 1023) {
            navMenu.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
});

// ===== HEADER STICKY COM SOMBRA =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== CONTADOR ANIMADO (NÚMEROS) =====
function animateNumbers() {
    const numerosSection = document.getElementById('numeros');
    if (!numerosSection) return;
    
    const anosElement = document.getElementById('numeroAnos');
    const empresasElement = document.getElementById('numeroEmpresas');
    const confiancaElement = document.getElementById('numeroConfianca');
    
    // Se já foi animado, não animar de novo
    if (numerosSection.dataset.animated === 'true') return;
    
    const targetAnos = parseInt(anosElement.dataset.target);
    const targetEmpresas = parseInt(empresasElement.dataset.target);
    const targetConfianca = parseInt(confiancaElement.dataset.target);
    
    let currentAnos = 0;
    let currentEmpresas = 0;
    let currentConfianca = 0;
    
    const duration = 2000; // 2 segundos
    const interval = 20; // Atualiza a cada 20ms
    const steps = duration / interval;
    
    const incrementAnos = targetAnos / steps;
    const incrementEmpresas = targetEmpresas / steps;
    const incrementConfianca = targetConfianca / steps;
    
    const counter = setInterval(() => {
        let finished = true;
        
        if (currentAnos < targetAnos) {
            currentAnos += incrementAnos;
            anosElement.textContent = Math.min(Math.floor(currentAnos), targetAnos);
            finished = false;
        } else {
            anosElement.textContent = targetAnos;
        }
        
        if (currentEmpresas < targetEmpresas) {
            currentEmpresas += incrementEmpresas;
            empresasElement.textContent = Math.min(Math.floor(currentEmpresas), targetEmpresas);
            finished = false;
        } else {
            empresasElement.textContent = targetEmpresas;
        }
        
        if (currentConfianca < targetConfianca) {
            currentConfianca += incrementConfianca;
            confiancaElement.textContent = Math.min(Math.floor(currentConfianca), targetConfianca);
            finished = false;
        } else {
            confiancaElement.textContent = targetConfianca;
        }
        
        if (finished) {
            clearInterval(counter);
            numerosSection.dataset.animated = 'true';
        }
    }, interval);
}

// ===== INTERSECTION OBSERVER PARA CONTADOR =====
const numerosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            numerosObserver.unobserve(entry.target); // Para de observar depois de animar
        }
    });
}, { threshold: 0.5 });

const numerosSection = document.getElementById('numeros');
if (numerosSection) {
    numerosObserver.observe(numerosSection);
}

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && href !== '') {
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== VALIDAÇÃO DO FORMULÁRIO DE NEWSLETTER =====
const newsletterForm = document.getElementById('newsletterForm');
const newsletterMessage = document.getElementById('newsletterMessage');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = document.getElementById('newsletterEmail');
        const email = emailInput.value.trim();
        
        // Validação simples de email
        if (email === '') {
            showNewsletterMessage('Por favor, insira seu e-mail.', 'error');
            emailInput.classList.add('error');
        } else if (!email.includes('@') || !email.includes('.')) {
            showNewsletterMessage('Por favor, insira um e-mail válido.', 'error');
            emailInput.classList.add('error');
        } else {
            emailInput.classList.remove('error');
            showNewsletterMessage('E-mail cadastrado com sucesso!', 'success');
            newsletterForm.reset();
        }
    });
}

function showNewsletterMessage(message, type) {
    if (newsletterMessage) {
        newsletterMessage.textContent = message;
        newsletterMessage.style.color = type === 'success' ? '#C9A959' : '#ff4444';
        
        // Limpa a mensagem após 5 segundos
        setTimeout(() => {
            newsletterMessage.textContent = '';
        }, 5000);
    }
}

// ===== AJUSTE INICIAL PARA ÂNCORAS NA URL =====
window.addEventListener('load', () => {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 200);
        }
    }
});