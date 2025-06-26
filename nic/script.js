// script.js
document.addEventListener('DOMContentLoaded', ()=>{
    // Animazioni per gli elementi che appaiono in vista
    const animatedItems = document.querySelectorAll('.modern-timeline-item, .product-card, .partner-card, #hero .section-content-wrapper, .founder-card');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                if(entry.target.classList.contains('modern-timeline-item')) {
                    const items = Array.from(entry.target.parentElement.querySelectorAll('.modern-timeline-item'));
                    const index = items.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 150}ms`;
                }
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, {threshold: 0.1});
    animatedItems.forEach(item => observer.observe(item));

    // Animazione per la barra di progresso della timeline
    const timelinePage = document.getElementById('timeline-page');
    if (timelinePage) {
        new IntersectionObserver((entries, obs)=>{ 
            entries.forEach(entry => { 
                if(entry.isIntersecting){ 
                    timelinePage.classList.add('in-view'); 
                    obs.unobserve(timelinePage); 
                } 
            }); 
        }, {threshold:0.4}).observe(timelinePage);
    }

    // Comportamento della barra di navigazione allo scroll
    let lastScrollY = 0;
    const nav = document.querySelector('.main-nav');
    window.addEventListener('scroll', ()=>{
        const currentScrollY = window.scrollY;
        nav.classList.toggle('nav-scrolled', currentScrollY > 10);
        if(currentScrollY > lastScrollY && currentScrollY > 80) {
            if (!nav.classList.contains('nav-open')) nav.classList.add('nav-hidden');
        } else {
            nav.classList.remove('nav-hidden');
        }
        lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
    });

    // Gestione del menu hamburger su mobile
    const navToggle = document.querySelector('.nav-toggle');
    if(navToggle) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
        });
    }
    // Chiude il menu mobile se si clicca su un link (utile se si aggiungono ancore interne)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-open')) {
                nav.classList.remove('nav-open');
            }
        });
    });
});