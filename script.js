document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded, initializing components...');
    initNavigation();
    initProjectFilters();
    initContactForm();
    initScrollAnimations();
    initSmoothScrolling();
    initParticleSystem();
    init3DEffects();
    initMagneticButtons();
    initParallaxEffect();
    initTypingAnimation();
    initProjectCardEffects();
    initSkillsAnimation();
});

// Navigation Functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) {
        console.error('Navigation elements not found');
        return;
    }

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        console.log('Hamburger clicked, menu toggled');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            console.log(`Nav link clicked: ${this.getAttribute('href')}`);
        });
    });

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Project Filtering
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length || !projectCards.length) {
        console.error('Filter buttons or project cards not found');
        return;
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            console.log(`Filter clicked: ${filter}`);
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 10);
                    console.log(`Showing card: ${card.querySelector('.project-title').textContent}`);
                } else {
                    card.classList.remove('visible');
                    card.classList.add('hidden');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                    console.log(`Hiding card: ${card.querySelector('.project-title').textContent}`);
                }
            });
        });
    });

    // Ensure all cards are visible on load
    projectCards.forEach(card => {
        card.classList.remove('hidden');
        card.style.display = 'block';
        card.classList.add('visible');
    });
    console.log('Initialized project cards as visible');
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('.submit-btn');
            const formData = new FormData(this);
            const errors = validateForm(formData);
            if (errors.length > 0) {
                showNotification(errors.join('<br>'), 'error');
                return;
            }
            submitBtn.classList.add('loading');
            console.log('Form submitted, simulating send...');
            setTimeout(() => {
                this.reset();
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                showNotification('Message sent successfully!', 'success');
                setTimeout(() => {
                    submitBtn.classList.remove('success');
                }, 2000);
            }, 2000);
        });
    } else {
        console.error('Contact form not found');
    }
}

function validateForm(formData) {
    const errors = [];
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const subject = formData.get('subject')?.trim();
    const message = formData.get('message')?.trim();

    if (!name || name.length < 2) {
        errors.push('Name must be at least 2 characters');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Valid email is required');
    }
    if (!subject || subject.length < 3) {
        errors.push('Subject must be at least 3 characters');
    }
    if (!message || message.length < 10) {
        errors.push('Message must be at least 10 characters');
    }
    return errors;
}

// Notification System
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">×</button>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });

    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
                console.log(`Element visible: ${entry.target.tagName}${entry.target.id ? `#${entry.target.id}` : ''}`);
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .timeline-item');
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                console.log(`Smooth scrolling to: ${targetId}`);
            }
        });
    });
}

// Particle System for Contact Section
function initParticleSystem() {
    const contactSection = document.querySelector('.contact-section');
    if (!contactSection) {
        console.error('Contact section not found for particle system');
        return;
    }

    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    contactSection.appendChild(particleContainer);

    function createParticle() {
        const particle = document.createElement('div');
        const size = Math.random() * 6 + 2;
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 215, 0, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 5 + 5}s linear infinite;
            pointer-events: none;
        `;
        particleContainer.appendChild(particle);
        setTimeout(() => {
            particle.remove();
        }, 10000);
    }

    for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, Math.random() * 5000);
    }
    setInterval(createParticle, 500);
}

// 3D Effects for Project Cards
function init3DEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Magnetic Buttons
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .filter-btn, .project-link, .social-link');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Parallax Effect
function initParallaxEffect() {
    const homeSection = document.querySelector('.home-section');
    if (!homeSection) {
        console.error('Home section not found for parallax effect');
        return;
    }

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        homeSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });
}

// Typing Animation for Home Title
function initTypingAnimation() {
    const titleName = document.querySelector('.title-name');
    if (!titleName) {
        console.error('Title name element not found');
        return;
    }

    const text = titleName.textContent;
    titleName.textContent = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            titleName.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    setTimeout(type, 500);
}

// Project Card Effects
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.project-link')) return;
            const techTags = card.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.classList.add('animate-tech');
                setTimeout(() => {
                    tag.classList.remove('animate-tech');
                }, 500);
            });
        });
    });
}

 const form = document.getElementById('contactForm');
        const button = form.querySelector('.submit-btn');
        const status = document.getElementById('form-status');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            button.classList.add('loading');
            status.textContent = 'Sending...';

            const formData = new FormData(form);
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    status.textContent = 'Message sent successfully!';
                    form.reset();
                } else {
                    status.textContent = 'Error: Could not send message.';
                }
            } catch (error) {
                status.textContent = 'Error: Could not send message.';
            } finally {
                button.classList.remove('loading');
            }
        });

// Skills Animation
function initSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = 'skillPop 0.5s ease forwards';
        }, index * 100);
    });
}