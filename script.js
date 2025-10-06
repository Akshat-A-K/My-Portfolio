// Enhanced scroll animations with Instagram-like swipe effects
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add staggered delay for smoother animation
      setTimeout(() => {
        entry.target.classList.add('active');
      }, index * 150); // Increased delay for more dramatic effect
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully visible
});

reveals.forEach(section => observer.observe(section));

// Apply different animation types to different sections for variety
function applyAnimations() {
  // Hero section - special entrance
  const heroElements = document.querySelectorAll('#hero .reveal');
  heroElements.forEach((el, index) => {
    el.classList.add('reveal-up');
    el.style.animationDelay = `${index * 0.2}s`;
  });

  // About section - left swipe
  const aboutElements = document.querySelectorAll('#about .reveal');
  aboutElements.forEach((el, index) => {
    el.classList.add('reveal-left');
    el.style.animationDelay = `${index * 0.3}s`;
  });

  // Experience section - right swipe
  const experienceElements = document.querySelectorAll('#experience .reveal');
  experienceElements.forEach((el, index) => {
    el.classList.add('reveal-right');
    el.style.animationDelay = `${index * 0.2}s`;
  });

  // Projects section - bounce effect
  const projectElements = document.querySelectorAll('#projects .reveal');
  projectElements.forEach((el, index) => {
    el.classList.add('reveal-bounce');
    el.style.animationDelay = `${index * 0.1}s`;
  });

  // Skills section - scale effect
  const skillElements = document.querySelectorAll('#skills .reveal');
  skillElements.forEach((el, index) => {
    el.classList.add('reveal-scale');
    el.style.animationDelay = `${index * 0.15}s`;
  });

  // Contact section - rotate effect
  const contactElements = document.querySelectorAll('#contact .reveal');
  contactElements.forEach((el, index) => {
    el.classList.add('reveal-rotate');
    el.style.animationDelay = `${index * 0.25}s`;
  });
}

// Initialize animations on load
document.addEventListener('DOMContentLoaded', applyAnimations);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Hide preloader on load
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 500);
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

function updateThemeIcon() {
  if (document.body.classList.contains('light-theme')) {
    themeIcon.className = 'fas fa-sun';
  } else {
    themeIcon.className = 'fas fa-moon';
  }
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  updateThemeIcon();
});

// Initialize theme icon
updateThemeIcon();

// Typewriter effect for tagline
const tagline = document.getElementById('tagline');
const text = tagline.textContent;
tagline.textContent = '';
let i = 0;

function typeWriter() {
  if (i < text.length) {
    tagline.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
}

setTimeout(typeWriter, 1000);

window.addEventListener("load", () => {
  const skills = document.querySelector(".skills-grid");
  const projects = document.querySelector("#projects-grid");

  if (skills) {
    skills.innerHTML += skills.innerHTML;
  }

  if (projects) {
    projects.innerHTML += projects.innerHTML;
  }
});

// GitHub Repositories with Pagination and Swipe Animation
let currentPage = 0;
const reposPerPage = 6;
let allRepos = [];
let totalPages = 0;

fetch("https://api.github.com/users/Akshat-A-K/repos?per_page=100")
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    // Filter repos (exclude forks, sort by stars)
    allRepos = data
      .filter(repo => !repo.fork && !repo.private)
      .sort((a, b) => b.stargazers_count - a.stargazers_count);

    totalPages = Math.ceil(allRepos.length / reposPerPage);

    // Create pagination controls
    createPaginationControls();

    // Load first page
    loadPage(0);

    // Add swipe gesture support
    addSwipeGestures();
  })
  .catch(error => {
    console.warn('GitHub API failed, loading fallback projects:', error);
    // Fallback projects
    allRepos = [
      {
        name: "AI-Powered Chatbot",
        description: "Intelligent conversational AI built with Python and TensorFlow for natural language processing.",
        url: "https://github.com/Akshat-A-K",
        demo: null,
        stars: 45,
        language: "Python"
      },
      {
        name: "Computer Vision System",
        description: "Real-time object detection and image recognition using OpenCV and deep learning models.",
        url: "https://github.com/Akshat-A-K",
        demo: null,
        stars: 32,
        language: "Python"
      },
      {
        name: "Full-Stack Web App",
        description: "Modern web application with React frontend and Node.js backend, featuring real-time updates.",
        url: "https://github.com/Akshat-A-K",
        demo: null,
        stars: 28,
        language: "JavaScript"
      },
      {
        name: "Data Analysis Dashboard",
        description: "Interactive dashboard for data visualization and analytics using Python, Pandas, and Plotly.",
        url: "https://github.com/Akshat-A-K",
        demo: null,
        stars: 21,
        language: "Python"
      },
      {
        name: "Machine Learning Pipeline",
        description: "Automated ML pipeline for data preprocessing, model training, and deployment.",
        url: "https://github.com/Akshat-A-K",
        demo: null,
        stars: 19,
        language: "Python"
      },
      {
        name: "Portfolio Website",
        description: "Professional portfolio website showcasing projects and skills with modern design.",
        url: "https://github.com/Akshat-A-K/My-Portfolio",
        demo: "https://akshat-a-k.github.io/My-Portfolio",
        stars: 15,
        language: "HTML"
      },
      {
        name: "Neural Network Framework",
        description: "Custom deep learning framework built from scratch with Python and NumPy.",
        url: "https://github.com/Akshat-A-K",
        demo: null,
        stars: 38,
        language: "Python"
      },
      {
        name: "IoT Smart Home System",
        description: "Complete IoT solution for smart home automation with Raspberry Pi and sensors.",
        url: "https://github.com/Akshat-A-K",
        demo: null,
        stars: 29,
        language: "Python"
      },
      {
        name: "Blockchain Voting System",
        description: "Secure and transparent voting system built on Ethereum blockchain.",
        url: "https://github.com/Akshat-A-K",
        demo: null,
        stars: 24,
        language: "Solidity"
      },
      {
        name: "Real-time Chat Application",
        description: "Scalable chat app with WebSocket integration and modern UI.",
        url: "https://github.com/Akshat-A-K",
        demo: null,
        stars: 18,
        language: "JavaScript"
      },
      {
        name: "Automated Testing Suite",
        description: "Comprehensive testing framework for web applications with CI/CD integration.",
        url: "https://github.com/Akshat-A-K",
        demo: null,
        stars: 16,
        language: "JavaScript"
      },
      {
        name: "3D Graphics Engine",
        description: "Custom 3D rendering engine built with WebGL and modern graphics techniques.",
        url: "https://github.com/Akshat-A-K",
        demo: null,
        stars: 12,
        language: "JavaScript"
      }
    ];

    totalPages = Math.ceil(allRepos.length / reposPerPage);
    createPaginationControls();
    loadPage(0);
    addSwipeGestures();
  });

function createPaginationControls() {
  const projectsSection = document.querySelector('#projects');
  if (!projectsSection) return;

  // Create pagination container
  const paginationContainer = document.createElement('div');
  paginationContainer.className = 'pagination-container';
  paginationContainer.innerHTML = `
    <div class="pagination-controls">
      <button class="pagination-btn prev-btn" disabled>
        <i class="fas fa-chevron-left"></i>
      </button>
      <div class="pagination-info">
        <span class="current-page">1</span>
        <span class="total-pages">of ${totalPages}</span>
      </div>
      <button class="pagination-btn next-btn">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    <div class="pagination-dots">
      ${Array.from({length: totalPages}, (_, i) =>
        `<span class="dot ${i === 0 ? 'active' : ''}" data-page="${i}"></span>`
      ).join('')}
    </div>
  `;

  // Insert after projects grid
  const projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid) {
    projectsGrid.parentNode.insertBefore(paginationContainer, projectsGrid.nextSibling);
  }

  // Add event listeners
  const prevBtn = paginationContainer.querySelector('.prev-btn');
  const nextBtn = paginationContainer.querySelector('.next-btn');
  const dots = paginationContainer.querySelectorAll('.dot');

  prevBtn.addEventListener('click', () => navigatePage(-1));
  nextBtn.addEventListener('click', () => navigatePage(1));

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const page = parseInt(dot.dataset.page);
      loadPage(page);
    });
  });
}

function loadPage(page) {
  currentPage = page;
  const start = page * reposPerPage;
  const end = start + reposPerPage;
  const pageRepos = allRepos.slice(start, end);

  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  // Remove shimmer effect
  grid.classList.remove('shimmer');

  // Clear existing content with fade out
  grid.style.opacity = '0';
  setTimeout(() => {
    grid.innerHTML = '';

    pageRepos.forEach(repo => {
      const div = document.createElement("div");
      div.className = "card reveal";
      div.innerHTML = `
        <div class="card-header">
          <h3>${repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
          <div class="repo-stats">
            <span class="stars"><i class="fas fa-star"></i> ${repo.stargazers_count || repo.stars}</span>
            <span class="language"><i class="fas fa-code"></i> ${repo.language || 'N/A'}</span>
          </div>
        </div>
        <p>${repo.description || "No description available."}</p>
        <div class="card-footer">
          <a href="${repo.html_url || repo.url}" target="_blank" class="btn-primary">
            <i class="fab fa-github"></i> View Code
          </a>
          ${(repo.homepage || repo.demo) ? `<a href="${repo.homepage || repo.demo}" target="_blank" class="btn-secondary">
            <i class="fas fa-external-link-alt"></i> Live Demo
          </a>` : ''}
        </div>
      `;
      grid.appendChild(div);
    });

    // Fade in new content
    setTimeout(() => {
      grid.style.opacity = '1';
      // Re-apply animations to new cards
      applyAnimations();
    }, 100);
  }, 300);

  // Update pagination controls
  updatePaginationControls();
}

function navigatePage(direction) {
  const newPage = currentPage + direction;
  if (newPage >= 0 && newPage < totalPages) {
    loadPage(newPage);
  }
}

function updatePaginationControls() {
  const paginationContainer = document.querySelector('.pagination-container');
  if (!paginationContainer) return;

  const prevBtn = paginationContainer.querySelector('.prev-btn');
  const nextBtn = paginationContainer.querySelector('.next-btn');
  const currentPageSpan = paginationContainer.querySelector('.current-page');
  const dots = paginationContainer.querySelectorAll('.dot');

  // Update button states
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage === totalPages - 1;

  // Update page number
  currentPageSpan.textContent = currentPage + 1;

  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentPage);
  });
}

function addSwipeGestures() {
  const projectsSection = document.querySelector('#projects');
  if (!projectsSection) return;

  let startX = 0;
  let startY = 0;
  let isSwiping = false;

  projectsSection.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isSwiping = true;
  });

  projectsSection.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = startX - currentX;
    const diffY = startY - currentY;

    // Only handle horizontal swipes
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      e.preventDefault();
    }
  });

  projectsSection.addEventListener('touchend', (e) => {
    if (!isSwiping) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = startX - endX;
    const diffY = startY - endY;

    // Check if it's a horizontal swipe
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 100) {
      if (diffX > 0) {
        // Swipe left - next page
        navigatePage(1);
      } else {
        // Swipe right - previous page
        navigatePage(-1);
      }
    }

    isSwiping = false;
  });

  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      navigatePage(-1);
    } else if (e.key === 'ArrowRight') {
      navigatePage(1);
    }
  });
}
