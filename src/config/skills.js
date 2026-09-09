export const skills = [
  // Frontend
  {
    id: "react",
    name: "React.js",
    category: "Frontend",
    description: "Component-driven architecture, state management with hooks, virtual DOM reconciliation, and single-page application development.",
    projects: ["ecommerce-cooperatives", "pv-archive", "cinefind", "nimbus"],
    concepts: ["Custom Hooks", "Context API", "Component Lifecycle", "SPA Routing", "Performance Optimization"],
    related: ["javascript", "tailwind", "bootstrap"]
  },
  {
    id: "javascript",
    name: "JavaScript (ES6+)",
    category: "Frontend",
    description: "Core language foundation: asynchronous programming, event loop, closures, DOM manipulation, and modern syntax.",
    projects: ["ecommerce-cooperatives", "pv-archive", "cinefind", "gitfinder"],
    concepts: ["Async/Await", "Promises", "DOM APIs", "Event Delegation", "ES Modules"],
    related: ["react", "express", "jquery"]
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    description: "Utility-first CSS framework for engineering modern, responsive, high-performance web applications and design systems.",
    projects: ["ecommerce-cooperatives", "cinefind", "nimbus"],
    concepts: ["Responsive Layouts", "Dark Mode Architecture", "Custom Token Systems", "Flexbox/Grid"],
    related: ["react", "bootstrap"]
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    category: "Frontend",
    description: "Responsive grid layout engine, pre-built components, and rapid administrative UI scaffolding.",
    projects: ["pv-archive", "cooperative-market"],
    concepts: ["12-Column Grid", "Responsive Breakpoints", "Modal Systems", "Admin Scaffolding"],
    related: ["jquery", "tailwind"]
  },
  {
    id: "jquery",
    name: "jQuery",
    category: "Frontend",
    description: "Cross-browser DOM traversal, event handling, animation primitives, and AJAX request orchestration in legacy and hybrid setups.",
    projects: ["cooperative-market"],
    concepts: ["DOM Manipulation", "AJAX Shorthands", "Event Binding", "Chaining"],
    related: ["javascript", "bootstrap"]
  },

  // Backend
  {
    id: "laravel",
    name: "Laravel",
    category: "Backend",
    description: "Robust PHP framework for building enterprise-grade REST APIs, MVC applications, authentication systems, and database migrations.",
    projects: ["ecommerce-cooperatives", "pv-archive"],
    concepts: ["Eloquent ORM", "Service Containers", "Middleware & Auth", "Blade Templating", "Database Migrations & Seeders"],
    related: ["php", "mysql", "react"]
  },
  {
    id: "php",
    name: "PHP",
    category: "Backend",
    description: "Server-side language for data processing, session management, secure backend logic, and relational database interaction.",
    projects: ["ecommerce-cooperatives", "pv-archive", "cooperative-market"],
    concepts: ["Object-Oriented PHP", "Sessions & Cookies", "PDO & Security", "RESTful Architecture"],
    related: ["laravel", "mysql"]
  },
  {
    id: "express",
    name: "Express.js",
    category: "Backend",
    description: "Minimalist Node.js web application framework for crafting performant APIs, routing pipelines, and JSON microservices.",
    projects: [],
    concepts: ["Middleware Chains", "REST Endpoints", "CORS & Security", "JSON Processing"],
    related: ["javascript", "mongodb"]
  },
  {
    id: "python",
    name: "Python",
    category: "Backend",
    description: "Versatile programming language utilized for automation scripts, file system heuristics, CLI utilities, and AI integrations.",
    projects: ["smart-file-organizer"],
    concepts: ["Filesystem Automation", "Data Parsing", "Hash Verification", "CLI Scripting"],
    related: ["git", "docker"]
  },

  // Database
  {
    id: "mysql",
    name: "MySQL",
    category: "Database",
    description: "Relational database management system: schema normalization, index design, foreign key constraints, and transactional consistency.",
    projects: ["ecommerce-cooperatives", "pv-archive", "cooperative-market"],
    concepts: ["Relational Modeling", "Joins & Aggregations", "Transactions (ACID)", "Indexing Strategies", "Foreign Keys"],
    related: ["laravel", "php"]
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Database",
    description: "Document-oriented NoSQL database for flexible schema definitions, hierarchical data structures, and rapid JSON serialization.",
    projects: [],
    concepts: ["Document Modeling", "Aggregation Pipelines", "BSON / JSON Schemas", "Indexing"],
    related: ["express"]
  },

  // Tools
  {
    id: "git",
    name: "Git",
    category: "Tools",
    description: "Distributed version control system for branch management, commit histories, code merges, and team collaboration workflows.",
    projects: ["ecommerce-cooperatives", "pv-archive", "smart-file-organizer", "cinefind", "gitfinder"],
    concepts: ["Branching Strategies", "Merge Conflicts", "Interactive Rebase", "Commit Hygiene"],
    related: ["github", "gitlab"]
  },
  {
    id: "github",
    name: "GitHub",
    category: "Tools",
    description: "Cloud repository hosting, issue tracking, pull request code reviews, GitHub Pages, and CI/CD actions.",
    projects: ["ecommerce-cooperatives", "pv-archive", "smart-file-organizer", "cinefind", "gitfinder"],
    concepts: ["Pull Requests", "Code Reviews", "Release Management", "Issue Tracking"],
    related: ["git", "gitlab"]
  },
  {
    id: "gitlab",
    name: "GitLab",
    category: "Tools",
    description: "DevOps platform covering project planning, source code management, and automated deployment pipelines.",
    projects: [],
    concepts: ["CI/CD Pipelines", "Merge Requests", "Project Management"],
    related: ["git", "jira"]
  },
  {
    id: "docker",
    name: "Docker",
    category: "Tools",
    description: "Containerization platform to build, ship, and run reproducible applications across isolated environments.",
    projects: [],
    concepts: ["Dockerfiles", "Containers vs Images", "Port Mapping", "Environment Isolation"],
    related: ["git", "laravel"]
  },
  {
    id: "jira",
    name: "Jira Software",
    category: "Tools",
    description: "Agile project tracking software for sprint planning, backlog grooming, issue tracking, and team delivery velocity.",
    projects: ["pv-archive"],
    concepts: ["Scrum & Kanban Boards", "Sprint Cycles", "User Story Mapping", "Burndown Tracking"],
    related: ["gitlab", "github"]
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "Tools",
    description: "Primary extensible development environment optimized with linters, debuggers, Git lenses, and snippet engines.",
    projects: ["ecommerce-cooperatives", "pv-archive", "smart-file-organizer"],
    concepts: ["Extension Ecosystem", "Integrated Debugging", "Multi-root Workspaces"],
    related: ["git"]
  }
];

export default skills;
