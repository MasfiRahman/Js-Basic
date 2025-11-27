// DOM Elements
const registrationForm = document.getElementById('registrationForm');
const dataDisplay = document.getElementById('dataDisplay');
const eventLog = document.getElementById('eventLog');

// Input elements
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const country = document.getElementById('country');
const newsletter = document.getElementById('newsletter');
const terms = document.getElementById('terms');

// Error elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const countryError = document.getElementById('countryError');
const termsError = document.getElementById('termsError');

// Event logger
function logEvent(message) {
    const now = new Date();
    const timeString = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
    
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `<span class="log-time">${timeString}</span> <span class="log-message">${message}</span>`;
    
    eventLog.appendChild(logEntry);
    eventLog.scrollTop = eventLog.scrollHeight;
}

// Validation functions
function validateName() {
    const name = fullName.value.trim();
    if (name.length < 2) {
        showError(fullName, nameError, 'Name must be at least 2 characters long');
        return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        showError(fullName, nameError, 'Name can only contain letters and spaces');
        return false;
    }
    showSuccess(fullName, nameError);
    return true;
}

function validateEmail() {
    const emailValue = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(emailValue)) {
        showError(email, emailError, 'Please enter a valid email address');
        return false;
    }
    showSuccess(email, emailError);
    return true;
}

function validatePhone() {
    const phoneValue = phone.value.trim();
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    
    if (!phoneRegex.test(phoneValue)) {
        showError(phone, phoneError, 'Please enter a valid phone number');
        return false;
    }
    showSuccess(phone, phoneError);
    return true;
}

function validateUsername() {
    const usernameValue = username.value.trim();
    if (usernameValue.length < 3) {
        showError(username, usernameError, 'Username must be at least 3 characters long');
        return false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(usernameValue)) {
        showError(username, usernameError, 'Username can only contain letters, numbers, and underscores');
        return false;
    }
    showSuccess(username, usernameError);
    return true;
}

function validatePassword() {
    const passwordValue = password.value;
    if (passwordValue.length < 6) {
        showError(password, passwordError, 'Password must be at least 6 characters long');
        return false;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordValue)) {
        showError(password, passwordError, 'Password must contain uppercase, lowercase, and numbers');
        return false;
    }
    showSuccess(password, passwordError);
    return true;
}

function validateConfirmPassword() {
    const confirmValue = confirmPassword.value;
    if (confirmValue !== password.value) {
        showError(confirmPassword, confirmPasswordError, 'Passwords do not match');
        return false;
    }
    showSuccess(confirmPassword, confirmPasswordError);
    return true;
}

function validateCountry() {
    if (!country.value) {
        showError(country, countryError, 'Please select your country');
        return false;
    }
    showSuccess(country, countryError);
    return true;
}

function validateTerms() {
    if (!terms.checked) {
        showError(terms, termsError, 'You must agree to the terms and conditions');
        return false;
    }
    showSuccess(terms, termsError);
    return true;
}

// Helper functions for showing errors/success
function showError(input, errorElement, message) {
    input.classList.add('invalid');
    input.classList.remove('valid');
    errorElement.textContent = message;
    logEvent(`VALIDATION ERROR: ${message}`);
}

function showSuccess(input, errorElement) {
    input.classList.add('valid');
    input.classList.remove('invalid');
    errorElement.textContent = '';
}

// Real-time validation
fullName.addEventListener('input', validateName);
email.addEventListener('input', validateEmail);
phone.addEventListener('input', validatePhone);
username.addEventListener('input', validateUsername);
password.addEventListener('input', validatePassword);
confirmPassword.addEventListener('input', validateConfirmPassword);
country.addEventListener('change', validateCountry);
terms.addEventListener('change', validateTerms);

// Form submission handler
registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    logEvent('FORM SUBMIT: Form submission attempted');
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();
    const isCountryValid = validateCountry();
    const isTermsValid = validateTerms();
    
    const isValid = isNameValid && isEmailValid && isPhoneValid && 
                   isUsernameValid && isPasswordValid && isConfirmValid && 
                   isCountryValid && isTermsValid;
    
    if (isValid) {
        logEvent('FORM SUCCESS: All validation passed');
        handleFormSubmission();
    } else {
        logEvent('FORM FAILED: Validation errors found');
        showNotification('Please fix the errors above', 'error');
    }
});

// Handle form data
function handleFormSubmission() {
    // Get form data
    const formData = {
        fullName: fullName.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        username: username.value.trim(),
        password: '••••••••', // Don't display actual password
        country: country.options[country.selectedIndex].text,
        newsletter: newsletter.checked ? 'Yes' : 'No',
        terms: terms.checked ? 'Agreed' : 'Not agreed',
        timestamp: new Date().toLocaleString()
    };
    
    // Display form data
    displayFormData(formData);
    
    // Show success message
    showNotification('Form submitted successfully!', 'success');
    
    // Log the data
    logEvent(`DATA COLLECTED: ${formData.fullName} (${formData.email})`);
    
    // In real application, you would send data to server here
    // Example: sendToServer(formData);
}

// Display form data
function displayFormData(data) {
    dataDisplay.innerHTML = `
        <div class="success-message">
            <h3>✅ Form Submitted Successfully!</h3>
            <p>Here's the data we collected:</p>
        </div>
        <div class="form-data">
            <div class="data-item">
                <span class="data-label">Full Name:</span>
                <span class="data-value">${data.fullName}</span>
            </div>
            <div class="data-item">
                <span class="data-label">Email:</span>
                <span class="data-value">${data.email}</span>
            </div>
            <div class="data-item">
                <span class="data-label">Phone:</span>
                <span class="data-value">${data.phone}</span>
            </div>
            <div class="data-item">
                <span class="data-label">Username:</span>
                <span class="data-value">${data.username}</span>
            </div>
            <div class="data-item">
                <span class="data-label">Country:</span>
                <span class="data-value">${data.country}</span>
            </div>
            <div class="data-item">
                <span class="data-label">Newsletter:</span>
                <span class="data-value">${data.newsletter}</span>
            </div>
            <div class="data-item">
                <span class="data-label">Terms Accepted:</span>
                <span class="data-value">${data.terms}</span>
            </div>
            <div class="data-item">
                <span class="data-label">Submitted At:</span>
                <span class="data-value">${data.timestamp}</span>
            </div>
        </div>
    `;
}

// Show notification
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4ecdc4' : '#ff6b6b'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Form reset handler
registrationForm.addEventListener('reset', function() {
    logEvent('FORM RESET: Form has been reset');
    
    // Clear all errors
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => element.textContent = '');
    
    // Remove validation classes
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.classList.remove('valid', 'invalid');
    });
    
    // Reset data display
    dataDisplay.innerHTML = `
        <h3>📊 Form Data Will Appear Here</h3>
        <p>Submit the form to see the collected data</p>
    `;
    
    showNotification('Form has been reset', 'info');
});

// Initial log
logEvent('SYSTEM: Form validation system initialized');