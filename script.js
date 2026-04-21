// 1. Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const icon = themeToggle.querySelector('i');

// Check LocalStorage for saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// 2. Form Handling & LocalStorage
const feedbackForm = document.getElementById('feedbackForm');
const submissionList = document.getElementById('submission-list');

// Load saved submissions from LocalStorage
let submissions = JSON.parse(localStorage.getItem('userFeedbacks')) || [];

function displaySubmissions() {
    submissionList.innerHTML = '';
    submissions.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'about-card animate-up'; // Reuse CSS card style
        card.innerHTML = `
            <h4>${item.name}</h4>
            <p style="font-size: 0.8rem; opacity: 0.7">${item.email}</p>
            <p>"${item.message}"</p>
        `;
        submissionList.appendChild(card);
    });
}

feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic Validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        const newEntry = { name, email, message };
        
        // Add to array and save
        submissions.unshift(newEntry); // Newest first
        localStorage.setItem('userFeedbacks', JSON.stringify(submissions));

        // UI Updates
        displaySubmissions();
        feedbackForm.reset();
        
        // Success Message
        const feedbackDiv = document.getElementById('form-feedback');
        feedbackDiv.textContent = "Thank you! Your message was saved locally.";
        feedbackDiv.classList.remove('hidden');
        feedbackDiv.style.color = "var(--accent-color)";
        
        setTimeout(() => feedbackDiv.classList.add('hidden'), 3000);
    }
});

// Initial load
displaySubmissions();