import { PortfolioData, GeneratedFiles } from "@/types/portfolio";

export function generatePortfolioFiles(data: PortfolioData, isDark: boolean = false): GeneratedFiles {
  const theme = isDark ? 'dark' : 'light';
  
  const indexHtml = `<!DOCTYPE html>
<html lang="en" class="${theme}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personal.name} - Portfolio</title>
    <meta name="description" content="${data.personal.summary}">
    <link rel="stylesheet" href="styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <div class="portfolio-container">
        <!-- Hero Section -->
        <header class="hero" id="hero">
            <div class="hero-content">
                <h1 class="hero-title">${data.personal.name}</h1>
                <p class="hero-summary">${data.personal.summary}</p>
                <div class="hero-contact">
                    <span><i class="fas fa-envelope"></i> ${data.personal.email}</span>
                    <span><i class="fas fa-phone"></i> ${data.personal.phone}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${data.personal.location}</span>
                </div>
                <div class="social-links">
                    ${data.social.github ? `<a href="${data.social.github}" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>` : ''}
                    ${data.social.linkedin ? `<a href="${data.social.linkedin}" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>` : ''}
                </div>
            </div>
        </header>

        <!-- Education Section -->
        ${data.education.length > 0 ? `
        <section class="section" id="education">
            <div class="container">
                <h2 class="section-title">Education</h2>
                <div class="timeline">
                    ${data.education.map(edu => `
                    <div class="timeline-item">
                        <div class="timeline-content">
                            <h3>${edu.degree}</h3>
                            <h4>${edu.institution}</h4>
                            <span class="year">${edu.year}</span>
                            ${edu.grade ? `<span class="grade">Grade: ${edu.grade}</span>` : ''}
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
        </section>
        ` : ''}

        <!-- Experience Section -->
        ${data.experience.length > 0 ? `
        <section class="section" id="experience">
            <div class="container">
                <h2 class="section-title">Experience</h2>
                <div class="timeline">
                    ${data.experience.map(exp => `
                    <div class="timeline-item">
                        <div class="timeline-content">
                            <h3>${exp.title}</h3>
                            <h4>${exp.company}</h4>
                            <span class="duration">${exp.duration}</span>
                            <p class="description">${exp.description}</p>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
        </section>
        ` : ''}

        <!-- Projects Section -->
        ${data.projects.length > 0 ? `
        <section class="section" id="projects">
            <div class="container">
                <h2 class="section-title">Projects</h2>
                <div class="projects-grid">
                    ${data.projects.map(project => `
                    <div class="project-card">
                        <h3>${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-technologies">
                            ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                        </div>
                        <div class="project-links">
                            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="project-link"><i class="fab fa-github"></i> Code</a>` : ''}
                            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i> Live</a>` : ''}
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
        </section>
        ` : ''}

        <!-- Skills Section -->
        ${data.skills.length > 0 ? `
        <section class="section" id="skills">
            <div class="container">
                <h2 class="section-title">Skills</h2>
                <div class="skills-grid">
                    ${data.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
                </div>
            </div>
        </section>
        ` : ''}

        <!-- Certifications Section -->
        ${data.certifications.length > 0 ? `
        <section class="section" id="certifications">
            <div class="container">
                <h2 class="section-title">Certifications</h2>
                <div class="certifications-list">
                    ${data.certifications.map(cert => `<div class="certification-item"><i class="fas fa-certificate"></i> ${cert}</div>`).join('')}
                </div>
            </div>
        </section>
        ` : ''}

        <!-- Contact Section -->
        <section class="section contact-section">
            <div class="container">
                <h2 class="section-title">Get In Touch</h2>
                <p>Let's connect and discuss opportunities!</p>
                <a href="mailto:${data.personal.email}" class="contact-button">
                    <i class="fas fa-envelope"></i> Send Email
                </a>
            </div>
        </section>
    </div>

    <script src="script.js"></script>
</body>
</html>`;

  const stylesCss = `/* Portfolio Styles */
:root {
  --primary: ${isDark ? '#a855f7' : '#7c3aed'};
  --primary-light: ${isDark ? '#c084fc' : '#a855f7'};
  --background: ${isDark ? '#0f0f23' : '#ffffff'};
  --surface: ${isDark ? '#1a1a3a' : '#f8fafc'};
  --text-primary: ${isDark ? '#f1f5f9' : '#1e293b'};
  --text-secondary: ${isDark ? '#cbd5e1' : '#64748b'};
  --border: ${isDark ? '#334155' : '#e2e8f0'};
  --gradient-primary: linear-gradient(135deg, var(--primary), var(--primary-light));
  --shadow: ${isDark ? '0 10px 40px rgba(168, 85, 247, 0.3)' : '0 10px 40px rgba(124, 58, 237, 0.2)'};
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--background);
  color: var(--text-primary);
  line-height: 1.6;
  transition: all 0.3s ease;
}

.portfolio-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
  text-align: center;
  padding: 2rem;
}

.hero-content {
  max-width: 800px;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.hero-summary {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-contact {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
}

.hero-contact span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.social-links a:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

/* Sections */
.section {
  padding: 4rem 2rem;
  background: var(--surface);
}

.section:nth-child(even) {
  background: var(--background);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Timeline */
.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--gradient-primary);
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  width: 50%;
}

.timeline-item:nth-child(odd) {
  left: 0;
  padding-right: 3rem;
}

.timeline-item:nth-child(even) {
  left: 50%;
  padding-left: 3rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background: var(--primary);
  border-radius: 50%;
  top: 0;
  box-shadow: var(--shadow);
}

.timeline-item:nth-child(odd)::before {
  right: -10px;
}

.timeline-item:nth-child(even)::before {
  left: -10px;
}

.timeline-content {
  background: var(--background);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
}

.timeline-content h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--primary);
}

.timeline-content h4 {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.year, .duration {
  background: var(--gradient-primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.grade {
  margin-left: 1rem;
  color: var(--text-secondary);
  font-style: italic;
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.project-card {
  background: var(--background);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow);
}

.project-card h3 {
  color: var(--primary);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.project-description {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-badge {
  background: var(--gradient-primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.project-link:hover {
  color: var(--primary-light);
  transform: translateX(3px);
}

/* Skills Grid */
.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.skill-badge {
  background: var(--background);
  border: 2px solid var(--primary);
  color: var(--primary);
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.skill-badge:hover {
  background: var(--gradient-primary);
  color: white;
  transform: scale(1.05);
}

/* Certifications */
.certifications-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.certification-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--background);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border);
}

.certification-item i {
  color: var(--primary);
  font-size: 1.5rem;
}

/* Contact Section */
.contact-section {
  text-align: center;
  background: var(--gradient-primary);
  color: white;
}

.contact-section .section-title {
  color: white;
  -webkit-text-fill-color: white;
}

.contact-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.contact-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .hero-contact {
    flex-direction: column;
    gap: 1rem;
  }

  .timeline::before {
    left: 30px;
  }

  .timeline-item {
    width: 100%;
    left: 0 !important;
    padding-left: 4rem !important;
    padding-right: 0 !important;
  }

  .timeline-item::before {
    left: 20px !important;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .section {
    padding: 3rem 1rem;
  }
}`;

  const scriptJs = `// Portfolio Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elements = document.querySelectorAll('.section, .timeline-item, .project-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Hero section is always visible
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }
});`;

  return {
    indexHtml,
    stylesCss,
    scriptJs
  };
}