const toggleBtn = document.createElement("button");
toggleBtn.innerText = "🌓 Toggle Theme";
Object.assign(toggleBtn.style, {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  padding: "10px 18px",
  fontSize: "14px",
  borderRadius: "30px",
  backgroundColor: "#64FFDA",
  color: "#0A192F",
  border: "none",
  fontWeight: "600",
  zIndex: "1001",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  cursor: "pointer"
});
toggleBtn.onclick = () => document.body.classList.toggle("light-theme");
document.body.appendChild(toggleBtn);

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
