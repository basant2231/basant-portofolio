// ═════════════════════════════════════════════════════════════════════
// BASANT ADEL EISSA — BESPOKE CRAFT PORTFOLIO SCRIPT
// Inspirations: Mobbin, Pinterest, Cosmos
// Features: Category Filters, One-Click Clipboard Copy, EmailJS, Sticky Nav
// ═════════════════════════════════════════════════════════════════════

// ─── 1. Sticky Header & Active Scrollspy Navigation ───
const header = document.querySelector('.header');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('header nav a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  if (header) {
    header.classList.toggle('sticky', window.scrollY > 40);
  }

  // Active section tracking
  let currentSectionId = '';
  sections.forEach((sec) => {
    const secTop = sec.offsetTop - 180;
    const secHeight = sec.offsetHeight;
    if (window.scrollY >= secTop && window.scrollY < secTop + secHeight) {
      currentSectionId = sec.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active');
    }
  });
});

// Mobile Drawer
if (menuIcon && navbar) {
  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuIcon.classList.remove('bx-x');
      navbar.classList.remove('active');
    });
  });
}

// ─── 2. Mobbin-Style Category Filter Tray ───
document.addEventListener('DOMContentLoaded', () => {
  const pillTabs = document.querySelectorAll('.pill-tab');
  const caseCards = document.querySelectorAll('.case-card');

  pillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      pillTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      caseCards.forEach((card) => {
        const category = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

// ─── 3. One-Click Copy Email with Delightful Toast ───
const copyEmailTrigger = document.getElementById('copy-email-trigger');
const toastNotice = document.getElementById('toast-notice');

if (copyEmailTrigger && toastNotice) {
  copyEmailTrigger.addEventListener('click', async () => {
    const emailToCopy = 'basantadeleissa@gmail.com';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailToCopy);
      } else {
        const tempInput = document.createElement('input');
        tempInput.value = emailToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      toastNotice.classList.add('show');
      setTimeout(() => {
        toastNotice.classList.remove('show');
      }, 2600);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  });
}

// ─── 4. File Upload Display ───
const attachmentInput = document.getElementById('attachment');
const fileCaption = document.getElementById('file-caption');

if (attachmentInput && fileCaption) {
  attachmentInput.addEventListener('change', () => {
    if (attachmentInput.files.length > 0) {
      fileCaption.textContent = `Attached: ${attachmentInput.files[0].name}`;
      fileCaption.style.color = '#00D2FF';
    } else {
      fileCaption.textContent = 'Attach project brief or specification (optional)';
      fileCaption.style.color = '';
    }
  });
}

// ─── 5. EmailJS Integration ───
if (typeof emailjs !== 'undefined') {
  emailjs.init('w59PalM8_wOuhXWcr');
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> <span>Sending...</span>";
    submitBtn.disabled = true;

    const templateParams = {
      from_name: document.getElementById('name').value.trim(),
      from_email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim(),
    };

    if (
      !templateParams.from_name ||
      !templateParams.from_email ||
      !templateParams.phone ||
      !templateParams.subject ||
      !templateParams.message
    ) {
      alert('Please fill in all required fields.');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(templateParams.from_email)) {
      alert('Please enter a valid email address.');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      return;
    }

    try {
      const response = await emailjs.send(
        'service_nj9sf0h',
        'template_nkq8523',
        templateParams
      );

      if (response.status === 200) {
        alert('Thank you! Your message has been sent successfully. I will get back to you shortly.');
        contactForm.reset();
        if (fileCaption) {
          fileCaption.textContent = 'Attach project brief or specification (optional)';
          fileCaption.style.color = '';
        }
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      alert('Failed to send message via form. Please email directly at basantadeleissa@gmail.com');
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}
