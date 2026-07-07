# Architecture & Data Flow Guide

## Project Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    SanskritiSetu Platform                    │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────┐         ┌──────────────────────┐
│                      │         │                      │
│   FRONTEND (React)   │◄─────►  │  BACKEND (Express)   │
│   Port: 3000         │ HTTP    │  Port: 5000          │
│                      │         │                      │
└──────────────────────┘         └──────────────────────┘
                                          │
                                          │
                                          ▼ HTTPS
                                  ┌──────────────────────┐
                                  │  OpenAI API (GPT)    │
                                  │  Story Generation    │
                                  └──────────────────────┘
```

---

## Detailed Component Structure

```
FRONTEND (React)
├── StoryGenerator Component
│   ├── UI Elements
│   │   ├── Input field (monument name)
│   │   ├── Generate button
│   │   ├── Loading spinner
│   │   ├── Error message display
│   │   └── Story result display
│   │
│   └── State Management
│       ├── monumentName (user input)
│       ├── story (generated output)
│       ├── loading (boolean flag)
│       └── error (error message)
│
└── Services
    └── storyService.js
        └── generateStory(monumentName) function
            └── Calls backend API


BACKEND (Express)
├── Routes Layer
│   └── /api/stories/generate
│       └── POST request handler
│
├── Controller Layer
│   └── storyController.js
│       └── generateStory() function
│           ├── Validates input
│           ├── Prepares OpenAI prompt
│           ├── Calls OpenAI API
│           └── Returns formatted response
│
└── Configuration
    ├── .env (environment variables)
    └── index.js (server setup)


EXTERNAL
└── OpenAI API
    ├── Model: gpt-3.5-turbo
    ├── Input: Cultural history prompt
    └── Output: Generated story
```

---

## Complete Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ USER INTERACTION                                            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────┐
        │ User enters "Taj Mahal" in input   │
        └───────────────────────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────┐
        │ User clicks "Generate Story"       │
        └───────────────────────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────┐
        │ handleGenerateStory() triggered    │
        │ - Validates input                 │
        │ - Sets loading = true             │
        └───────────────────────────────────┘
                            │
                            ▼

┌─────────────────────────────────────────────────────────────┐
│ FRONTEND (React)                                            │
│ StoryGenerator Component                                    │
│ ─────────────────────────────────────────────             │
│ Shows: "Generating... 🔄" (spinner)                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼ HTTP POST
        ┌───────────────────────────────────────────────────┐
        │ POST http://localhost:5000/api/stories/generate    │
        │ Body: { monumentName: "Taj Mahal" }               │
        └───────────────────────────────────────────────────┘
                            │
                            ▼

┌─────────────────────────────────────────────────────────────┐
│ BACKEND (Express)                                            │
│ Route: POST /api/stories/generate                           │
│ ─────────────────────────────────────────────────────────  │
│ 1. Extract: monumentName = "Taj Mahal"                     │
│ 2. Validate: Check not empty                              │
│ 3. Prepare prompt: Cultural history template               │
│ 4. Create API request for OpenAI                           │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼ HTTPS

        ┌───────────────────────────────────────────────────┐
        │ OpenAI API (gpt-3.5-turbo)                         │
        │ ─────────────────────────────────────────────────│
        │ Prompt: "You are a cultural historian...           │
        │         Generate story about Taj Mahal..."         │
        │                                                    │
        │ Response: "The Taj Mahal stands as a              │
        │ timeless testament to love and..."                │
        │                                                    │
        │ Stories are: 100-120 words, engaging               │
        └───────────────────────────────────────────────────┘
                            │
                            ▼ JSON Response

┌─────────────────────────────────────────────────────────────┐
│ BACKEND (Express)                                            │
│ Process Response                                            │
│ ─────────────────────────────────────────────────────────  │
│ 1. Extract: story text                                    │
│ 2. Count: words                                            │
│ 3. Format: JSON response                                   │
│ 4. Return: HTTP 200 OK                                     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼ HTTP Response

        ┌───────────────────────────────────────────────────┐
        │ {                                                  │
        │   "success": true,                                │
        │   "monumentName": "Taj Mahal",                     │
        │   "story": "The Taj Mahal stands...",              │
        │   "wordCount": 115                                │
        │ }                                                  │
        └───────────────────────────────────────────────────┘
                            │
                            ▼

┌─────────────────────────────────────────────────────────────┐
│ FRONTEND (React)                                            │
│ Receive & Display                                           │
│ ─────────────────────────────────────────────────────────  │
│ 1. Parse: JSON response                                   │
│ 2. Validate: Check success = true                          │
│ 3. Update: story state with data                           │
│ 4. Update: loading = false                                 │
│ 5. Render: Story display card                              │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────────────────┐
        │ Display:                                           │
        │ ┌─────────────────────────────────┐               │
        │ │ Taj Mahal                        │               │
        │ │                                  │               │
        │ │ The Taj Mahal stands as a       │               │
        │ │ timeless testament to love...   │               │
        │ │                                  │               │
        │ │ 📝 Words: 115                    │               │
        │ └─────────────────────────────────┘               │
        └───────────────────────────────────────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────┐
        │ User reads the story! ✨           │
        │ Happy hacking! 🎉                  │
        └───────────────────────────────────┘
```

---

## File Dependencies

```
Frontend
└── src/
    ├── App.js
    │   └── imports → components/StoryGenerator.js
    │       ├── imports → services/storyService.js
    │       │   └── uses → fetch API (generates HTTP request)
    │       │       └── calls → Backend /api/stories/generate
    │       │
    │       └── imports → components/StoryGenerator.css
    │
    └── index.js
        └── imports → App.js


Backend
└── index.js
    ├── imports → routes/storyRoutes.js
    │   └── imports → controllers/storyController.js
    │       ├── imports → openai (NPM package)
    │       ├── imports → process.env (dotenv)
    │       └── uses → OpenAI API
    │
    └── imports → express, cors, dotenv
```

---

## Request/Response Cycle Timing

```
Time    │ Location           │ Action              │ Duration
────────┼────────────────────┼─────────────────────┼─────────────
T0      │ Frontend (Browser) │ User clicks button  │ Instant
T0+0ms  │ Frontend (React)   │ Validate input      │ 1ms
T0+1ms  │ Frontend           │ API call starts     │ 0ms
T0+2ms  │ Network            │ Request sent        │ ~10-50ms
T0+50ms │ Backend            │ Request received    │ 0ms
T0+50ms │ Backend            │ Validate input      │ 1ms
T0+51ms │ Backend            │ Prepare prompt      │ 2ms
T0+53ms │ Backend            │ OpenAI API call     │ 0ms
T0+54ms │ Network            │ To OpenAI           │ ~50-100ms
T0+150ms│ OpenAI API         │ Generate story      │ 1000-3000ms*
T0+3150ms│ Network           │ Response from API   │ ~50-100ms
T0+3200ms│ Backend           │ Process response    │ 5ms
T0+3205ms│ Network           │ Response to browser │ ~10-50ms
T0+3250ms│ Frontend (React)  │ Display story       │ Instant
─────────┴────────────────────┴─────────────────────┴─────────────
          Total time: ~3-4 seconds typical

*Most time spent at OpenAI API (generating text with AI)
```

---

## Error Handling Flow

```
User enters empty string
│
▼
Frontend validation
├─ Catches empty input
├─ Shows error: "Please enter a monument name"
└─ Stops (doesn't send request)


User enters valid name
│
▼
Frontend sends POST request
│
├─ Backend validation
│  ├─ If invalid: Return 400 error
│  └─ If valid: Continue
│
├─ OpenAI API call
│  ├─ If API key invalid: Return 401 error
│  ├─ If rate limited: Return 429 error
│  ├─ If API error: Return 500 error
│  └─ If success: Continue
│
└─ Return story to frontend
   │
   ├─ If success: Display story
   └─ If error: Show error message
```

---

## Environment Setup Visualization

```
Developer's Computer
│
├──────────────────────────────┐
│  backend/                     │
│  ├─ .env                      │ ◄── Set OPENAI_API_KEY
│  ├─ package.json              │
│  ├─ index.js                  │
│  ├─ routes/                   │
│  ├─ controllers/              │
│  └─ node_modules/             │
│      └─ openai/               │
│      └─ express/              │
│                               │
│  npm install                  │
│  npm start                    │
│  └─ Port 5000 ◄── Running     │
└──────────────────────────────┘
│
├──────────────────────────────┐
│  frontend/                    │
│  ├─ .env                      │ ◄── Set API_URL = localhost:5000
│  ├─ package.json              │
│  ├─ src/                      │
│  │  ├─ components/            │
│  │  ├─ services/              │
│  │  └─ ...                    │
│  └─ node_modules/             │
│      └─ react/                │
│                               │
│  npm install                  │
│  npm start                    │
│  └─ Port 3000 ◄── Running     │
└──────────────────────────────┘

User Access:
│
├─ http://localhost:3000    ◄── See React app
│
└─ Backend ◄── http://localhost:5000
   │
   └─ External ◄── OpenAI API (https://api.openai.com)
```

---

## Code Execution Flow

### Frontend Execution
```
App.js loads
└─ <StoryGenerator /> component renders
   ├─ State initialized: monumentName = ""
   ├─ UI rendered with input field
   ├─ User types "Taj Mahal"
   ├─ onClick: handleGenerateStory()
   │  ├─ setLoading(true)
   │  ├─ Call: generateStory("Taj Mahal")
   │  │  └─ fetch(URL, {method: POST, body: {...}})
   │  └─ Wait for response...
   │
   └─ Response received
      ├─ setLoading(false)
      ├─ setStory(response.data)
      └─ Render: <div className="story-result">...</div>
```

### Backend Execution
```
express app starts
└─ app.listen(5000)
   └─ Listen for requests
      
      Request POST /api/stories/generate
      └─ storyRoutes handler called
         └─ generateStory() controller
            ├─ Extract: req.body.monumentName
            ├─ Validate: not empty
            ├─ Create prompt
            ├─ openai.chat.completions.create({...})
            │  └─ API returns story
            ├─ Count words
            ├─ res.status(200).json({...})
            └─ Response sent to frontend
```

---

## Technology Stack

```
FRONTEND
├─ React 18.2.0        │ UI library
├─ Node.js              │ Runtime (for npm)
├─ CSS3                 │ Styling
└─ Fetch API            │ HTTP requests

BACKEND
├─ Node.js 14+          │ JavaScript runtime
├─ Express.js 4.18.2    │ Web framework
├─ OpenAI SDK 4.28.0    │ AI API client
├─ dotenv 16.3.1        │ Env variables
└─ CORS 2.8.5           │ Cross-origin support

DATABASE
└─ None (Stateless MVP) │ Could add MongoDB later

EXTERNAL
└─ OpenAI API           │ gpt-3.5-turbo model
```

---

## Scalability & Extensions

### Current MVP (Phase 1) ✓
- Single story generation
- No database
- Basic UI

### Phase 2 (Next Features)
- User authentication
- Save favorite stories
- Search history
- Multiple AI models

### Phase 3 (Scale Up)
- Database (MongoDB)
- User profiles
- Ratings & reviews
- Admin dashboard

### Phase 4 (Production)
- Caching layer (Redis)
- CDN for frontend
- Rate limiting
- Analytics

---

## Deployment Architecture

```
Development (Local)
Backend:  localhost:5000
Frontend: localhost:3000

Staging (Online Testing)
Backend:  staging-api.sanskritisetu.com
Frontend: staging.sanskritisetu.com

Production (Live)
Backend:  api.sanskritisetu.com (Render/Railway)
Frontend: sanskritisetu.com (Vercel/Netlify)
External: OpenAI API (HTTPS)
```

---

For more information, refer to:
- [README.md](README.md) - Overview
- [QUICK_START.md](QUICK_START.md) - Setup in 5 min
- [BACKEND_SETUP.md](BACKEND_SETUP.md) - Backend details
- [FRONTEND_SETUP.md](FRONTEND_SETUP.md) - Frontend details
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference
