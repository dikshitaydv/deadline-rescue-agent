#  Deadline Rescue Agent

An AI-powered productivity companion that doesn't just remind you — it **intervenes**.  

---

##  Project Structure

```
deadline-rescue-agent/
│
├── frontend/                       
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx                 
│       ├── App.jsx                  
│       ├── index.css               
│       │
│       ├── pages/
│       │   └── Dashboard.jsx        
│       │
│       ├── components/
│       │   ├── Sidebar.jsx          
│       │   ├── TopBar.jsx           
│       │   ├── WelcomeCard.jsx      
│       │   ├── StatsRow.jsx         # 4 metric cards
│       │   ├── TaskList.jsx         # Task table with progress
│       │   ├── NotificationsPanel.jsx 
│       │   └── AddTaskModal.jsx     # Add task form modal
│       │
│       ├── hooks/
│       │   └── useTasks.js         
│       │
│       └── utils/
│           └── taskHelpers.js       
│
├── backend/                         # Node.js + Express
│   ├── server.js                    
│   ├── package.json
│   │
│   ├── routes/
│   │   ├── tasks.js                
│   │   └── rescue.js                # AI rescue plan route
│   │
│   ├── controllers/
│   │   ├── tasksController.js       
│   │   └── rescueController.js     
│   │
│   ├── services/
│   │   └── geminiService.js         # Gemini API calls 
│   │
│   └── middleware/
│       └── errorHandler.js
│
├── shared/
│   └── taskSchema.js                
│
├── .env.example                    
├── .gitignore
├── package.json                     
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
- **Deploy:** Frontend on Vercel and Backend on Render
