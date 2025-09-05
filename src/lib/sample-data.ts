import { PortfolioData } from "@/types/portfolio";

export const sampleData: PortfolioData = {
  personal: {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    summary: "Full-stack developer with 5+ years of experience building scalable web applications. Passionate about creating intuitive user experiences and clean, maintainable code."
  },
  education: [
    {
      id: "edu1",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California, Berkeley",
      year: "2015-2019",
      grade: "3.8 GPA"
    },
    {
      id: "edu2",
      degree: "High School Diploma",
      institution: "Lincoln High School",
      year: "2011-2015",
      grade: "4.0 GPA"
    }
  ],
  experience: [
    {
      id: "exp1",
      title: "Senior Full Stack Developer",
      company: "TechCorp Inc.",
      duration: "2022 - Present",
      description: "Led development of customer-facing web applications using React, Node.js, and AWS. Mentored junior developers and improved application performance by 40%."
    },
    {
      id: "exp2",
      title: "Frontend Developer",
      company: "StartupXYZ",
      duration: "2020 - 2022",
      description: "Built responsive web applications using React and TypeScript. Collaborated with design teams to implement pixel-perfect UI components and improved user engagement by 25%."
    },
    {
      id: "exp3",
      title: "Junior Developer",
      company: "WebSolutions Ltd.",
      duration: "2019 - 2020",
      description: "Developed and maintained websites using HTML, CSS, JavaScript, and PHP. Gained experience in database design and API integration."
    }
  ],
  projects: [
    {
      id: "proj1",
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard. Built with React, Node.js, and MongoDB.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      githubUrl: "https://github.com/alexjohnson/ecommerce-platform",
      liveUrl: "https://myecommerce-demo.com"
    },
    {
      id: "proj2",
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration features, and project analytics.",
      technologies: ["Vue.js", "Express", "PostgreSQL", "Socket.io"],
      githubUrl: "https://github.com/alexjohnson/task-manager",
      liveUrl: "https://taskmanager-demo.com"
    },
    {
      id: "proj3",
      title: "Weather Analytics Dashboard",
      description: "Interactive dashboard displaying weather patterns and analytics using real-time data from multiple APIs with beautiful data visualizations.",
      technologies: ["React", "D3.js", "Python", "FastAPI", "Redis"],
      githubUrl: "https://github.com/alexjohnson/weather-dashboard"
    }
  ],
  skills: [
    "JavaScript", "TypeScript", "React", "Vue.js", "Node.js", "Python", 
    "AWS", "Docker", "PostgreSQL", "MongoDB", "GraphQL", "REST APIs"
  ],
  certifications: [
    "AWS Certified Solutions Architect",
    "Google Cloud Professional Developer",
    "MongoDB Certified Developer"
  ],
  social: {
    github: "https://github.com/alexjohnson",
    linkedin: "https://linkedin.com/in/alexjohnson"
  }
};