// Toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll section active link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150; // Adjust based on header height
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            let activeLink = document.querySelector(`header nav a[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
};

// Close menu when a navbar link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// Remove ScrollReveal for immediate visibility (no animation) for About and Projects sections
document.addEventListener('DOMContentLoaded', () => {
    // Directly add the 'show' class to the about and project sections without animation
    const aboutCards = document.querySelectorAll('.about-card');
    const projectCards = document.querySelectorAll('.project-card');
    const companyGroups = document.querySelectorAll('.company-group');

    aboutCards.forEach(card => {
        card.classList.add('show');
    });

    projectCards.forEach(card => {
        card.classList.add('show');
    });

    companyGroups.forEach(group => {
        group.classList.add('show');
    });

    // Apply ScrollReveal to only Home and Contact sections
    ScrollReveal({ 
        distance: '80px',
        duration: 2000,
        delay: 200
    });

    // Animations for Home Section
    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
    ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
});

// Initialize EmailJS with your Public Key
emailjs.init("w59PalM8_wOuhXWcr"); // Make sure this is your correct public key

// Get the form element
const form = document.getElementById('contact-form');

// Add an event listener to the form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Change button state during submission
    const submitBtn = document.getElementById('submit-btn');
    const originalBtnText = submitBtn.value;
    submitBtn.value = 'Sending...';
    submitBtn.disabled = true;

    // Get form data
    const templateParams = {
        from_name: document.getElementById('name').value.trim(),
        from_email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim(),
    };

    // Validate form fields
    if (!templateParams.from_name || !templateParams.from_email || 
        !templateParams.phone || !templateParams.subject || !templateParams.message) {
        alert('Please fill all fields');
        submitBtn.value = originalBtnText;
        submitBtn.disabled = false;
        return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(templateParams.from_email)) {
        alert('Please enter a valid email address.');
        submitBtn.value = originalBtnText;
        submitBtn.disabled = false;
        return;
    }

    // Validate phone number (must be at least 10 digits)
    const phonePattern = /^\d{10,}$/;
    if (!phonePattern.test(templateParams.phone)) {
        alert('Please enter a valid phone number (at least 10 digits).');
        submitBtn.value = originalBtnText;
        submitBtn.disabled = false;
        return;
    }

    console.log('Attempting to send with:', {
        service: "service_nj9sf0h",
        template: "template_nkq8523",
        params: templateParams
    });

    try {
        // First verify EmailJS is properly initialized
        if (!emailjs || typeof emailjs.send !== 'function') {
            throw new Error('EmailJS not properly initialized');
        }

        // Add timeout for the email sending
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('Request timed out (10 seconds)'));
            }, 10000);
        });

        // Attempt to send email
        const sendPromise = emailjs.send(
            "service_nj9sf0h", 
            "template_nkq8523", 
            templateParams
        );

        const response = await Promise.race([sendPromise, timeoutPromise]);
        
        console.log('EmailJS Response:', response);
        
        if (response.status === 200) {
            alert('Message sent successfully! Check your EmailJS dashboard to verify.');
            form.reset();
        } else {
            throw new Error(`Unexpected status: ${response.status}`);
        }
    } catch (error) {
        console.error('Email sending failed:', error);
        
        let errorMessage = 'Failed to send message. ';
        
        if (error.message.includes('timed out')) {
            errorMessage += 'The request took too long.';
        } else if (error.text) {
            errorMessage += error.text;
        } else if (error.message) {
            errorMessage += error.message;
        }
        
        alert(errorMessage);
        
        // Additional debug info
        console.log('EmailJS SDK Status:', {
            initialized: !!emailjs,
            hasSendMethod: typeof emailjs.send === 'function',
            userId: emailjs.userID
        });
    } finally {
        submitBtn.value = originalBtnText;
        submitBtn.disabled = false;
    }
});

// Typed.js initialization
document.addEventListener('DOMContentLoaded', function() {
    const typed = new Typed('.multiple-text', {
        strings: ['Flutter Developer', 'Mobile App Developer', 'Software Engineer'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });

    // Make iframes focusable for accessibility
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.setAttribute('title', iframe.getAttribute('title') || 'Project Demo');
    });
});
