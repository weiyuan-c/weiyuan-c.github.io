document.addEventListener('DOMContentLoaded', () => {
    // Reveal elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Simple typing effect for tagline if desired, or just fade in
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        // Just keeping it simple with CSS animations for now
    }

    // Observe all elements with .card-item
    document.querySelectorAll('.card-item').forEach((item, index) => {
        // Add staggering delay
        if (index % 3 === 1) item.classList.add('delay-1');
        if (index % 3 === 2) item.classList.add('delay-2');
        observer.observe(item);
    });

    // Theme Toggle Logic
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

    // Check for saved preference. IF NONE, DEFAULT TO DARK.
    const savedTheme = localStorage.getItem('theme');
    let currentTheme = 'dark'; // Default to dark

    if (savedTheme) {
        currentTheme = savedTheme;
    }
    // Note: We deliberately ignore system preference here to enforce Dark default as requested.

    // Apply theme
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Set switch state: Unchecked = Dark (Default), Checked = Light
    if (currentTheme === 'light' && toggleSwitch) {
        toggleSwitch.checked = true;
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    }

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', switchTheme);
    }
});
