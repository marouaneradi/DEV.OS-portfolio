export const labExperiments = [
  {
    id: "sql-playground",
    title: "SQL Query Simulator",
    category: "Database",
    description: "Execute interactive SQL queries against a live in-memory relational schema modeled after the ORMVAO cooperative database.",
    tables: {
      cooperatives: [
        { id: 1, name: "Coopérative Al-Baraka", region: "Ouarzazate", sector: "Huile d'Argan & Safran", members: 24 },
        { id: 2, name: "Coopérative Oasis Bio", region: "Skoura", sector: "Dattes & Dérivés", members: 18 },
        { id: 3, name: "Coopérative Rose Vallée", region: "Kelaat M'gouna", sector: "Eau de Rose & Cosmétiques", members: 32 }
      ],
      products: [
        { id: 101, coop_id: 1, name: "Safran Pur de Taliouine (1g)", price_mad: 45, stock: 120 },
        { id: 102, coop_id: 1, name: "Huile d'Argan Cosmétique (100ml)", price_mad: 95, stock: 8 },
        { id: 103, coop_id: 2, name: "Dattes Majhoul Premium (1kg)", price_mad: 110, stock: 45 },
        { id: 104, coop_id: 3, name: "Hydrolat d'Eau de Rose (250ml)", price_mad: 60, stock: 4 }
      ]
    },
    sampleQueries: [
      "SELECT * FROM cooperatives;",
      "SELECT * FROM products WHERE stock < 10;",
      "SELECT name, price_mad FROM products ORDER BY price_mad DESC;",
      "SELECT * FROM products WHERE coop_id = 1;"
    ]
  },
  {
    id: "regex-tester",
    title: "Regex Pattern Engine",
    category: "Algorithm",
    description: "Test and inspect Regular Expression patterns live against developer validation test cases (Emails, Moroccan Phone numbers, Git branches).",
    presets: [
      {
        name: "Moroccan Phone (+212)",
        pattern: "^(\\+212|0)([5-7])\\d{8}$",
        testString: "+212704460903"
      },
      {
        name: "Standard RFC 5322 Email",
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        testString: "radimarouane05@gmail.com"
      },
      {
        name: "Git Branch Nomenclature",
        pattern: "^(feature|fix|hotfix|release)\\s*\\/\\s*[a-z0-9._-]+$",
        testString: "feature/dev-os-window-manager"
      }
    ]
  },
  {
    id: "api-inspector",
    title: "REST Telemetry & API Inspector",
    category: "Network / API",
    description: "Simulate HTTP request-response lifecycles, inspect response headers, timing metrics, and JSON payload serialization.",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/cooperatives/status",
        status: 200,
        latencyMs: 42,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "x-ratelimit-remaining": "99",
          "server": "DEV.OS/Kernel-1.0"
        },
        response: {
          status: "healthy",
          uptime: "99.98%",
          database: "MySQL 8.0 connected",
          active_nodes: 3
        }
      },
      {
        method: "GET",
        path: "/api/v1/pv-archive/stats",
        status: 200,
        latencyMs: 65,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "x-compliance-standard": "OFPPT-PV-2026",
          "server": "DEV.OS/Kernel-1.0"
        },
        response: {
          archived_documents: 1420,
          pending_signatures: 0,
          integrity_hash: "sha256-e3b0c44298fc1c149afbf4c8996fb924"
        }
      }
    ]
  }
];

export default labExperiments;
