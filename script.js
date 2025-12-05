// User management
let users = JSON.parse(localStorage.getItem('maidEasyUsers')) || [];
let selectedRating = 0;

// Form handling
function showForm(formId) {
    document.getElementById('formOverlay').style.display = 'block';
    document.getElementById(formId).style.display = 'block';
}

function hideForm(formId) {
    document.getElementById('formOverlay').style.display = 'none';
    document.getElementById(formId).style.display = 'none';
}

function hideAllForms() {
    document.getElementById('formOverlay').style.display = 'none';
    document.querySelectorAll('.form-container').forEach(form => {
        form.style.display = 'none';
    });
}

// Login
function validateLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        alert('Logged in successfully! Welcome back, ' + user.name + '!');
        hideForm('loginForm');
    } else {
        alert('Invalid email or password. Please try again.');
    }
    
    return false;
}

// Sign up
function signUp(event) {
    event.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        alert('A user with this email already exists.');
        return false;
    }
    
    // Add new user
    users.push({ name, email, password });
    localStorage.setItem('maidEasyUsers', JSON.stringify(users));
    
    alert('Successfully signed up! Welcome to MaidEasy, ' + name + '!');
    hideForm('signupForm');
    
    return false;
}

// Rating
function rateService(rating) {
    selectedRating = rating;
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.classList.toggle('selected', index < rating);
    });
}

function submitRating() {
    const comment = document.getElementById('comment-box').value;
    if (selectedRating === 0) {
        alert("Please select a rating before submitting.");
    } else {
        alert("Thank you for your " + selectedRating + " star rating!");
        
        // Reset
        selectedRating = 0;
        document.querySelectorAll('.star').forEach(star => {
            star.classList.remove('selected');
        });
        document.getElementById('comment-box').value = '';
    }
}

// Service booking
function showService(service) {
    alert('Booking ' + service + ' service! In a real app, this would redirect to booking page.');
}

// Smooth scrolling
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});