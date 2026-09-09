import agrimarketImg from '../assets/agrimarket.jpg';
import pvArchiveImg from '../assets/pv-archive.jpg';

export const projects = [
  {
    id: "ecommerce-cooperatives",
    name: "Plateforme E-commerce pour Coopératives Agricoles",
    shortTitle: "E-commerce Coopératives",
    productName: "AgriMarket",
    organization: "ORMVAO",
    period: "19/01/2026 – 07/02/2026",
    category: "Full Stack",
    isFlagship: true,
    stack: ["Laravel", "React", "MySQL", "Tailwind CSS", "JavaScript", "PHP"],
    githubUrl: "https://github.com/marouaneradi/Cooperative_Market",
    demoUrl: "",
    screenshots: [
      {
        url: agrimarketImg,
        caption: "AgriMarket Marketplace Homepage — Hero banner, local agricultural cooperatives showcase, and regional terroir products catalog."
      }
    ],
    tagline: "Modern digital marketplace empowering agricultural cooperatives in Ouarzazate region to market and distribute local terroir products.",
    problem: "Agricultural cooperatives in the Ouarzazate region suffered from limited market reach, lack of direct-to-consumer sales channels, and manual paper-based inventory and order tracking.",
    solution: "Designed and engineered a centralized bilingual e-commerce platform that connects regional cooperatives directly with national consumers, featuring automated inventory tracking, order management, and secure administrative dashboards.",
    architecture: "Decoupled architecture with Laravel RESTful API backend, React frontend with responsive client-side routing, and normalized MySQL relational schema optimized for catalog indexing and transaction isolation.",
    features: [
      "Multi-vendor cooperative catalog with categorized agricultural products",
      "Dynamic shopping cart and multi-step checkout workflow",
      "Dedicated cooperative admin panel for product inventory and stock alerts",
      "Role-based access control (Customers, Cooperative Admins, Super Admin)",
      "Order lifecycle tracking with invoice and receipt generation",
      "Responsive, mobile-first design adapted for regional consumers"
    ],
    challenges: "Synchronizing inventory counts across disparate cooperative listings while ensuring fast page loads over variable mobile network conditions in rural zones.",
    learnings: "Deepened mastery of Laravel Eloquent relationships, API resource transformations, secure authentication flows, and building production React interfaces with high state complexity."
  },
  {
    id: "pv-archive",
    name: "Système d'Archivage et de Gestion des PV",
    shortTitle: "Gestion des PV d'Examens",
    productName: "Système PV Archivage",
    organization: "ISTA Ouarzazate",
    period: "03/02/2026 – 31/03/2026",
    category: "Full Stack",
    isFlagship: true,
    stack: ["Laravel", "React", "MySQL", "JavaScript", "PHP", "Bootstrap"],
    githubUrl: "https://github.com/marouaneradi/Systeme-D-archivage",
    demoUrl: "",
    screenshots: [
      {
        url: pvArchiveImg,
        caption: "Système PV Archivage Dashboard — Real-time analytics, deliberation minutes status (75/171 PV), archive completion rate, and workflow tracking."
      }
    ],
    tagline: "Secure institutional management and archival system for examination deliberations (Procès-Verbaux) at ISTA Ouarzazate.",
    problem: "Deliberation minutes (PVs) and examination records were historically handled via physical paperwork and unindexed spreadsheets, creating significant risks of document loss, slow retrieval times, and audit vulnerabilities.",
    solution: "Developed an enterprise digital archiving solution featuring encrypted document storage, automated PDF generation, fine-grained access control, and instant search across academic years, departments, and cohorts.",
    architecture: "Robust monolithic/API backend using Laravel with MySQL transactional storage, integrated with React components for dynamic data tables, PDF previewing, and live search indexing.",
    features: [
      "Automated extraction and generation of standardized examination minutes (PV)",
      "Multi-criteria archival search by session, module, trainer, and academic year",
      "Secure role-based permissions (Director, Department Heads, Pedagogical Council)",
      "Digital audit trail tracking document creation, modifications, and downloads",
      "Export capabilities (PDF, Excel) compliant with OFPPT administrative standards",
      "Data validation engine preventing grade discrepancies and duplicate entries"
    ],
    challenges: "Strict institutional compliance requirements regarding grade integrity, historical data formatting, and auditability.",
    learnings: "Strengthened skills in building enterprise data validation pipelines, PDF document generation at scale, and designing intuitive enterprise UX for administrative staff."
  },
  {
    id: "smart-file-organizer",
    name: "Smart File Organizer",
    shortTitle: "Smart File Organizer",
    organization: "Personal project",
    period: "2025 – 2026",
    category: "Python / Utility",
    isFlagship: true,
    stack: ["Python", "OS Automation", "CLI"],
    githubUrl: "https://github.com/marouaneradi",
    demoUrl: "",
    screenshots: [],
    tagline: "Intelligent desktop automation utility that organizes unstructured directories using heuristics and pattern recognition.",
    problem: "Developer and workstation download directories rapidly turn into unmanageable clutter containing hundreds of unclassified files, leading to wasted time searching for resources.",
    solution: "Engineered a fast, lightweight Python tool that categorizes and sorts files by MIME type, extension, metadata, and creation date, with customizable rules and an automatic rollback ledger.",
    architecture: "Modular Python architecture utilizing pathlib, watchdog for optional directory monitoring, and an SQLite ledger tracking file movements for 100% safe undo operations.",
    features: [
      "Instant directory scanning and classification across 20+ file categories",
      "Custom YAML/JSON rule configuration for custom extensions and destinations",
      "Safe transaction journal with one-command undo functionality",
      "Interactive CLI mode with colored terminal feedback and progress bars",
      "Duplicate file detection via MD5/SHA-256 hash comparison"
    ],
    challenges: "Ensuring zero data loss during collisions and handling permission edge-cases across cross-platform OS filesystems.",
    learnings: "Mastery of Python filesystem utilities, hash-based deduplication algorithms, and designing defensive software with transaction rollbacks."
  },
  {
    id: "cinefind",
    name: "CineFind — Movie Discovery Hub",
    shortTitle: "CineFind",
    organization: "Open Source / GitHub",
    period: "2025",
    category: "Frontend",
    isFlagship: false,
    stack: ["React", "JavaScript", "Tailwind CSS", "REST API"],
    githubUrl: "https://github.com/marouaneradi",
    demoUrl: "",
    screenshots: [],
    tagline: "Dynamic movie exploration platform featuring real-time search, ratings, and curated cinematic collections.",
    problem: "Need for an ultra-fast, responsive web interface to browse and filter cinema databases with seamless pagination and debounced queries.",
    solution: "Built a responsive Single Page Application powered by React and TMDB API, featuring client-side caching, bookmarking, and trailer playback.",
    features: [
      "Debounced live search across global movie database",
      "Trending and top-rated curated reels",
      "Detailed modal views with ratings, cast, and trailers"
    ]
  },
  {
    id: "gitfinder",
    name: "GitFinder — Developer Profile Explorer",
    shortTitle: "GitFinder",
    organization: "Open Source / GitHub",
    period: "2025",
    category: "Frontend",
    isFlagship: false,
    stack: ["JavaScript", "HTML5", "CSS3", "GitHub API"],
    githubUrl: "https://github.com/marouaneradi",
    demoUrl: "",
    screenshots: [],
    tagline: "Interactive GitHub user analytics interface querying the GitHub REST API to visualize developer statistics and repositories.",
    problem: "Evaluating GitHub developers and repositories required multiple clicks through GitHub's standard UI.",
    solution: "Created a streamlined tool displaying user statistics, top starred repositories, commit activity, and language distributions in one dashboard.",
    features: [
      "Instant GitHub user search with error boundary handling",
      "Repository breakdown with stars, forks, and primary languages",
      "Responsive cards with direct links to live repositories"
    ]
  },
  {
    id: "nimbus",
    name: "Nimbus Weather Engine",
    shortTitle: "Nimbus",
    organization: "Open Source / GitHub",
    period: "2025",
    category: "Frontend",
    isFlagship: false,
    stack: ["React", "Tailwind CSS", "Weather API"],
    githubUrl: "https://github.com/marouaneradi",
    demoUrl: "",
    screenshots: [],
    tagline: "Minimalist weather telemetry dashboard providing current conditions and 7-day forecasts with geolocation.",
    problem: "Many weather apps are cluttered with intrusive ads and slow interfaces.",
    solution: "Delivered a clean, high-performance telemetry dashboard displaying temperature, UV index, wind speed, and animated weather states.",
    features: [
      "Automatic geolocation detection and city search",
      "Hourly weather trajectory and 7-day meteorological forecasts",
      "Dynamic ambient theme adjusting to atmospheric conditions"
    ]
  },
  {
    id: "cooperative-market",
    name: "Cooperative Market Showcase",
    shortTitle: "Cooperative Market",
    organization: "Open Source / GitHub",
    period: "2025",
    category: "Full Stack",
    isFlagship: false,
    stack: ["PHP", "MySQL", "Bootstrap", "jQuery"],
    githubUrl: "https://github.com/marouaneradi",
    demoUrl: "",
    screenshots: [],
    tagline: "Foundational digital catalog prototype designed for regional artisans and agricultural producers.",
    problem: "Early proof-of-concept testing dynamic inventory tables and relational ordering prior to the ORMVAO enterprise deployment.",
    solution: "Structured relational PHP/MySQL web application with session-based authentication and modular catalog views.",
    features: [
      "Relational product categorization in MySQL",
      "AJAX dynamic product filtering without full page reloads",
      "Admin CRUD operations for catalog maintenance"
    ]
  }
];

export default projects;
