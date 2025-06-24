// Script para animaciones y funcionalidades del portafolio
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navbar = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Añadir funcionalidad al menú móvil
    menuToggle.addEventListener('click', function() {
      document.querySelector('nav ul').classList.toggle('show');
    });
    
    // Navegación suave al hacer clic en enlaces
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Cerrar menú móvil si está abierto
        document.querySelector('nav ul').classList.remove('show');
        
        // Obtener el destino
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Scroll suave
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
      });
    });
    
    // Cambiar estilo del navbar al hacer scroll
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      // Actualizar link activo basado en la posición de scroll
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
    
    // Añadir animaciones a elementos cuando entran en el viewport
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add('fadeInUp');
        observer.unobserve(entry.target);
      });
    }, observerOptions);
    
    // Elementos para animar
    const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .skill-category, .contact-form');
    animatedElements.forEach(el => {
      appearOnScroll.observe(el);
    });
    
    // Añadir efecto glitch al título
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
      glitchText.setAttribute('data-text', glitchText.textContent);
    }
    
    // Formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí iría la lógica para enviar el formulario
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData.entries());
        
        // Efecto de enviado
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensaje enviado';
        submitBtn.disabled = true;
        
        // Simulación de envío (en producción, esto se reemplazaría por una llamada real)
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          contactForm.reset();
        }, 3000);
      });
    }
    
    // Efecto de escritura para el subtítulo
    const typeWriter = function(textElement, text, i, fnCallback) {
      if (i < text.length) {
        textElement.innerHTML = text.substring(0, i+1) + '<span class="cursor">|</span>';
        
        setTimeout(function() {
          typeWriter(textElement, text, i + 1, fnCallback);
        }, 100);
      } else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 700);
      }
    };
    
    // Iniciar efecto de escritura en el subtítulo
    const profileSubtitle = document.querySelector('.profile-info h4');
    if (profileSubtitle) {
      const text = profileSubtitle.textContent;
      profileSubtitle.textContent = '';
      
      setTimeout(function() {
        typeWriter(profileSubtitle, text, 0, function() {
          profileSubtitle.innerHTML = text;
        });
      }, 1000);
    }
    
    // Inicializar los tooltips para los botones de proyectos
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
      link.addEventListener('mouseenter', function() {
        this.setAttribute('data-title', 'Ver detalles');
      });
    });
    
    // Añadir efecto de paralaje a las formas de fondo
    window.addEventListener('mousemove', function(e) {
      const shapes = document.querySelectorAll('.shape');
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 2;
        shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });
  });
  
  // Función para añadir CSS dinámicamente para el efecto del cursor
  (function() {
    const style = document.createElement('style');
    style.innerHTML = `
      .cursor {
        animation: blink 1s infinite;
      }
      
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      
      nav ul.show {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 80px;
        left: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        padding: 20px;
        text-align: center;
        animation: fadeIn 0.3s ease;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      header.scrolled {
        background-color: rgba(0, 0, 0, 0.95);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }
    `;
    document.head.appendChild(style);
  })();
  // Agregar esta función al final de tu script.js existente

// Función para animar las barras de skills
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  const skillPercentages = document.querySelectorAll('.skill-percentage');
  
  skillBars.forEach((bar, index) => {
    const width = bar.getAttribute('data-width');
    const percentage = skillPercentages[index];
    
    // Resetear la barra
    bar.style.width = '0%';
    
    // Animar después de un pequeño delay
    setTimeout(() => {
      bar.style.width = width + '%';
      
      // Mostrar el porcentaje después de la animación
      setTimeout(() => {
        if (percentage) {
          percentage.classList.add('show');
        }
      }, 1500);
    }, 100);
  });
}

// OPCIÓN 1: Animar cuando la sección de skills sea visible
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
  const skillsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });
  
  skillsObserver.observe(skillsSection);
}4// Funcionalidad del modal - agregar al final de tu script.js

document.addEventListener('DOMContentLoaded', function() {
  // Seleccionar todos los botones que abren modales
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const modals = document.querySelectorAll('.modal');
  const closeBtns = document.querySelectorAll('.close');

  // Función para abrir modal
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    }
  }

  // Función para cerrar modal
  function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll del body
  }

  // Event listeners para botones que abren modales
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      openModal(modalId);
    });
  });

  // Event listeners para botones de cerrar (X)
  closeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const modal = this.closest('.modal');
      closeModal(modal);
    });
  });

  // Cerrar modal al hacer click fuera del contenido
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Cerrar modal con tecla ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.style.display === 'block') {
          closeModal(modal);
        }
      });
    }
  });
});

