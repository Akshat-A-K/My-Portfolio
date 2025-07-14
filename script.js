const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.2 });

reveals.forEach(section => observer.observe(section));

const toggleBtn = document.createElement('button');
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
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;
    data.forEach(repo => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <h3>${repo.name.replace(/-/g, ' ')}</h3>
        <p>${repo.description || ""}</p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;
      grid.appendChild(div);
    });
  });
