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

// Scroll reveal
ScrollReveal({ 
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// Typed JS
const typed = new Typed('.multiple-text', {
    strings: ['Flutter Developer', 'Software Engineer', 'Mobile App Developer',],

    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// EmailJS Initialization
emailjs.init("8eakICxPhUTan-vnt");
// Get the form element
const form = document.getElementById('contact-form');

// Add an event listener to the form submission
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Form submission intercepted'); // Debugging

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Validate form fields
    if (!name || !email || !phone || !subject || !message) {
        alert('يرجى ملء جميع الحقول');
        return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('الرجاء إدخال بريد إلكتروني صحيح.');
        return;
    }

    // Validate phone number (must be at least 10 digits)
    const phonePattern = /^\d{10,}$/;
    if (!phonePattern.test(phone)) {
        alert('الرجاء إدخال رقم هاتف صحيح (10 أرقام على الأقل).');
        return;
    }

    // Set parameters for emailjs
    const templateParams = {
        from_name: name,
        from_email: email,
        phone: phone,
        subject: subject,
        message: message,
    };

    console.log('Sending email with data:', templateParams); // Debugging

    // Send email using emailjs
    emailjs.send("service_nj9sf0h","template_nkq8523", templateParams)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text); // Debugging
            alert('تم إرسال الرسالة بنجاح!');
            form.reset(); // Reset the form after successful submission
        })
        .catch((err) => {
            console.log('FAILED...', err); // Debugging

            // Extract the error message from the err object
            let errorMessage = 'حدث خطأ أثناء إرسال الرسالة. الرجاء المحاولة مرة أخرى.';
            if (err && err.text) {
                errorMessage = err.text; // Use the error message from EmailJS
            } else if (err && err.message) {
                errorMessage = err.message; // Use the error message from the err object
            }

            alert(errorMessage); // Display the error message
        });
});

 document.addEventListener('DOMContentLoaded', function() {
      // Make iframes focusable for accessibility
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        iframe.setAttribute('title', iframe.getAttribute('title') || 'Project Demo');
      });
    });