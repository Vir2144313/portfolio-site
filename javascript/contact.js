document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
});

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const formData = new FormData(contactForm);
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formMessage.style.display = 'none';
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            formMessage.textContent = 'Thank you for your message!';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            
            contactForm.reset();
            
        } catch (error) {
            formMessage.textContent = 'Sorry, there was an error sending your message.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
}