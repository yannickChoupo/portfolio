import React from 'react';
import { marked } from "marked";
import DOMPurify from "dompurify";

const initialState = `# 
A full-stack portfolio platform combining:

- 🧩 **Drupal CMS** (PHP-FPM + MariaDB)
- ⚛️ **React Frontend**
- 🟢 **Node.js / Express API**
- 🍃 **MongoDB**
- 🐳 **Docker-based development & deployment**

---

## 🏗 Architecture Overview

\`\`\`
Browser
   │
   ▼
Nginx (Reverse Proxy)
   ├── /     → Drupal CMS or React Client 
   |           (based on Docker profile)
   └── /api  → Express API
\`\`\`

The active root service (\`/\`) depends on the selected Docker profile.

---

## 🖥 Tech Stack

### Backend
- Node.js (Express)
- MongoDB
- JWT Authentication

### CMS
- Drupal 10
- MariaDB

### Frontend
- React
- TypeScript
- Axios

### DevOps
- Docker
- Docker Compose (profiles)
- Nginx reverse proxy

---

## 🐳 Docker Profiles

The project uses Docker Compose profiles to separate services.

| Profile     | Description            |
|------------|------------------------|
| \`drupal\`    | Drupal CMS stack       |
| \`portfolio\` | React + Node API stack |

### ▶ Run Portfolio Only

\`\`\`bash
docker compose --profile portfolio up -d
\`\`\`

### ▶ Run Drupal Only

\`\`\`bash
docker compose --profile drupal up -d
\`\`\`

### ▶ Run Full Stack

\`\`\`bash
docker compose --profile drupal --profile portfolio up -d
\`\`\`

---

## 🌍 Live Deployment

Production domain:  
https://www.njiloportfolio.de

---

## 📂 Project Structure

\`\`\`
Portfolio-Drupal/
│
├── portfolio/
│   ├── client/      # React frontend
│   └── server/      # Express API
│
├── Portfolio-Drupal/  # Drupal CMS
│
├── nginx/
├── docker-compose.yml
└── docker-compose-dev.yml
\`\`\`

---

## 🚀 Production Deployment

### Build & Push Updated Images

\`\`\`bash
docker build -t yannickkloud/portfolio:client-latest ./portfolio/client
docker build -t yannickkloud/portfolio:server-latest ./portfolio/server

docker push yannickkloud/portfolio:client-latest
docker push yannickkloud/portfolio:server-latest
\`\`\`

### Pull & Recreate on Server

\`\`\`bash
docker compose --profile portfolio pull portfolio-client portfolio-server
docker compose --profile portfolio up -d --force-recreate
\`\`\`

---

## 🧪 Useful Commands

### View Logs
\`\`\`bash
docker compose logs -f
\`\`\`

### Restart API
\`\`\`bash
docker compose restart portfolio-server
\`\`\`

### Rebuild Client
\`\`\`bash
docker compose build --no-cache portfolio-client
\`\`\`

### Stop All Services
\`\`\`bash
docker compose down
\`\`\`

---

## 📄 License

MIT
`;

const ProjectArchitecture: React.FC = () => {
    const text = initialState;
    const markdown = DOMPurify.sanitize(marked(text));
    return (
        <>
            <div id="ProjectArchitecture">
                <div className="container">
                    <header>
                        <h1>Project Architecture</h1>
                    </header>
                    <section>
                        <div
                            id="preview"
                            dangerouslySetInnerHTML={{ __html: markdown }}
                        ></div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default ProjectArchitecture;
