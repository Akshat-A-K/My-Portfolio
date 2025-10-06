const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add staggered delay for smoother animation
      setTimeout(() => {
        entry.target.classList.add('active');
      }, index * 100); // 100ms delay between each element
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully visible
});

reveals.forEach(section => observer.observe(section));

// Enhanced scroll animations with different effects
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -10px 0px'
};

const fadeInUpObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
    }
  });
}, observerOptions);

const slideInLeftObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'slideInLeft 0.8s ease-out forwards';
    }
  });
}, observerOptions);

const slideInRightObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'slideInRight 0.8s ease-out forwards';
    }
  });
}, observerOptions);

// Apply different animations to different elements
document.querySelectorAll('.fade-in-up').forEach(el => fadeInUpObserver.observe(el));
document.querySelectorAll('.slide-in-left').forEach(el => slideInLeftObserver.observe(el));
document.querySelectorAll('.slide-in-right').forEach(el => slideInRightObserver.observe(el));

// Parallax effect for background elements
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.parallax');

  parallaxElements.forEach(element => {
    const rate = element.dataset.parallax || 0.5;
    element.style.transform = `translateY(${scrolled * rate}px)`;
  });
});

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

fetch("https://api.github.com/users/Akshat-A-K/repos")
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;

    // Clear any existing content
    grid.innerHTML = '';

    // Filter and sort repos (exclude forks, sort by stars)
    const filteredRepos = data
      .filter(repo => !repo.fork && !repo.private)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6); // Show top 6 repos

    filteredRepos.forEach(repo => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <div class="card-header">
          <h3>${repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
          <div class="repo-stats">
            <span class="stars"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
            <span class="language"><i class="fas fa-code"></i> ${repo.language || 'N/A'}</span>
          </div>
        </div>
        <p>${repo.description || "No description available."}</p>
        <div class="card-footer">
          <a href="${repo.html_url}" target="_blank" class="btn-primary">
            <i class="fab fa-github"></i> View Code
          </a>
          ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="btn-secondary">
            <i class="fas fa-external-link-alt"></i> Live Demo
          </a>` : ''}
        </div>
      `;
      grid.appendChild(div);
    });
  })
  .catch(error => {
    console.warn('GitHub API failed, loading fallback projects:', error);
    const grid = document.getElementById("projects-grid");
    if (!grid) return;

    // Fallback projects
    const fallbackProjects = [
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
      }
    ];

    grid.innerHTML = '';
    fallbackProjects.forEach(project => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <div class="card-header">
          <h3>${project.name}</h3>
          <div class="repo-stats">
            <span class="stars"><i class="fas fa-star"></i> ${project.stars}</span>
            <span class="language"><i class="fas fa-code"></i> ${project.language}</span>
          </div>
        </div>
        <p>${project.description}</p>
        <div class="card-footer">
          <a href="${project.url}" target="_blank" class="btn-primary">
            <i class="fab fa-github"></i> View Code
          </a>
          ${project.demo ? `<a href="${project.demo}" target="_blank" class="btn-secondary">
            <i class="fas fa-external-link-alt"></i> Live Demo
          </a>` : ''}
        </div>
      `;
      grid.appendChild(div);
    });
  });
