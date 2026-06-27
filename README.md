#  Deadline Rescue Agent

An AI-powered productivity companion that doesn't just remind you — it **intervenes**.  

---

## 📁 Project Structure

```
deadline-rescue-agent/
│
├── frontend/                        # React + Vite + Tailwind
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx                 # React entry point
│       ├── App.jsx                  # Root component / router
│       ├── index.css                # Global styles
│       │
│       ├── pages/
│       │   └── Dashboard.jsx        # Main dashboard page
│       │
│       ├── components/
│       │   ├── Sidebar.jsx          # Left icon nav
│       │   ├── TopBar.jsx           # Search, date, user avatar
│       │   ├── WelcomeCard.jsx      # Greeting + quick links
│       │   ├── StatsRow.jsx         # 4 metric cards
│       │   ├── TaskList.jsx         # Task table with progress
│       │   ├── NotificationsPanel.jsx # Right panel alerts
│       │   └── AddTaskModal.jsx     # Add task form modal
│       │
│       ├── hooks/
│       │   └── useTasks.js          # Task state + operations
│       │
│       └── utils/
│           └── taskHelpers.js       # Pure helper functions
│
├── backend/                         # Node.js + Express
│   ├── server.js                    # Express entry point
│   ├── package.json
│   │
│   ├── routes/
│   │   ├── tasks.js                 # CRUD routes
│   │   └── rescue.js                # AI rescue plan route
│   │
│   ├── controllers/
│   │   ├── tasksController.js       # Task logic (in-memory Day 1)
│   │   └── rescueController.js      # Rescue plan logic (stub → AI Day 2)
│   │
│   ├── services/
│   │   └── geminiService.js         # Gemini API calls (Day 2)
│   │
│   └── middleware/
│       └── errorHandler.js          # Global error handler
│
├── shared/
│   └── taskSchema.js                # Shared constants (effort, status, etc.)
│
├── .env.example                     # Copy to .env and fill in keys
├── .gitignore
├── package.json                     # Root (runs both with concurrently)
└── README.md
```

---

##  Getting Started

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd deadline-rescue-agent

# Install root + both workspaces
npm run install:all
```

### 2. Set up environment variables

```bash
cp .env.example .env
# Then open .env and add your GEMINI_API_KEY
```

### 3. Run in development

```bash
# From root — starts both frontend (port 3000) and backend (port 5000)
npm run dev
```

Or run separately:
```bash
cd frontend && npm run dev
cd backend  && npm run dev
```

---

##  Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **AI:** Gemini API via Google AI Studio
- **Deploy:** Google Cloud Run (via AI Studio Build Mode)
