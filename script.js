document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        // Optional: Change icon based on state
        const icon = mobileMenu.classList.contains('hidden') ? 'menu' : 'x';
        mobileMenuBtn.innerHTML = `<i data-lucide="${icon}" class="w-6 h-6"></i>`;
        lucide.createIcons();
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.innerHTML = `<i data-lucide="menu" class="w-6 h-6"></i>`;
            lucide.createIcons();
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-lg', 'bg-darker/95');
        } else {
            navbar.classList.remove('shadow-lg', 'bg-darker/80');
        }
    });

    // Typing Effect Logic for the Demo Prompt
    const prompts = [
        "Добавь темную тему и анимацию при скролле...",
        "Создать дашборд с аналитикой и графиками...",
        "Подключить Stripe и настроить подписки...",
        "Сгенерировать Landing Page для кофейни..."
    ];
    
    const promptElement = document.getElementById('typing-prompt');
    let promptIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeWriter() {
        const currentPrompt = prompts[promptIndex];
        
        if (isDeleting) {
            promptElement.textContent = currentPrompt.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            promptElement.textContent = currentPrompt.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPrompt.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            promptIndex = (promptIndex + 1) % prompts.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Start typing animation
    if (promptElement) {
        typeWriter();
    }
});