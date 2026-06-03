document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 15, 28, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(10, 15, 28, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Form submission handling to Brevo via AJAX
    const leadForm = document.getElementById('leadForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que el navegador vaya a la página en blanco
            
            const btn = leadForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Enviando...';
            btn.disabled = true;
            
            // Recolectar datos del formulario
            const formData = new FormData(leadForm);
            
            // Enviar a Brevo en segundo plano
            fetch(leadForm.action, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // Evita errores de CORS al cruzar dominios
            }).then(() => {
                // Mostrar mensaje de éxito
                formSuccess.classList.remove('hidden');
                
                // Resetear el formulario
                leadForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
                
                // Ocultar mensaje después de 8 segundos
                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                }, 8000);
            }).catch(error => {
                console.error('Error enviando formulario:', error);
                btn.innerText = originalText;
                btn.disabled = false;
                alert('Hubo un error de conexión, por favor intenta nuevamente.');
            });
        });
    }

    // Simple scroll animation for cards and elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation starting state to elements
    const animateElements = document.querySelectorAll('.card, .solution-item, .pricing-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});
