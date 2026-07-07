#KNow your Roots - AI-Powered Cultural Learning Platform

An interactive hackathon project that generates engaging AI-powered stories about Indian cultural monuments using OpenAI API.

## 🏗️ Project Structure

```
Hackthon/
├── backend/
│   ├── controllers/
│   │   └── storyController.js       # API logic for story generation
│   ├── routes/
│   │   └── storyRoutes.js          # Express routes definition
│   ├── index.js                     # Main server file
│   ├── package.json                 # Backend dependencies
│   ├── .env                         # Environment variables (keep secret)
│   └── .gitignore
│
└── frontend/
    ├── public/
    │   └── index.html              # HTML entry point
    ├── src/
    │   ├── components/
    │   │   ├── StoryGenerator.js    # Main React component
    │   │   └── StoryGenerator.css   # Component styles
    │   ├── services/
    │   │   └── storyService.js      # API call functions
    │   ├── App.js                    # Root App component
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    ├── package.json
    ├── .env                         # Frontend environment variables
    └── .gitignore
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key (get from https://platform.openai.com/api-keys)

---

## ⚙️ Backend Setup

### 1. Install Backend Dependencies

Open terminal in the `backend` folder and run:

```bash
npm install
```

This will install:
- `express` - Web framework
- `openai` - OpenAI API client
- `dotenv` - Environment variable management
- `cors` - Cross-Origin Resource Sharing

### 2. Configure Environment Variables

Edit the `backend/.env` file:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_actual_openai_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=development
```

**How to get OpenAI API Key:**
1. Go to https://platform.openai.com/api-keys
2. Create a new secret key
3. Copy and paste it in `.env` file
4. Keep it secret - never commit to git!

### 3. Start Backend Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

Expected output:
```
🚀 SanskritiSetu Backend Server running on port 5000
Environment: development
```

### 4. Test Backend API (Optional)

Using curl:
```bash
curl -X POST http://localhost:5000/api/stories/generate \
  -H "Content-Type: application/json" \
  -d '{"monumentName":"Taj Mahal"}'
```

---

## 🎨 Frontend Setup

### 1. Install Frontend Dependencies

Open terminal in the `frontend` folder and run:

```bash
npm install
```

### 2. Configure Frontend Environment

The `frontend/.env` file is already configured:

```env
REACT_APP_API_URL=http://localhost:5000
```

Change it if your backend runs on a different port or URL.

### 3. Start Frontend Development Server

```bash
npm start
```

The app will automatically open at `http://localhost:3000`

---

## 📡 Backend Code Explanation

### Controller: `storyController.js`

**What it does:**
- Receives monument name from frontend
- Validates the input
- Sends a request to OpenAI API with a cultural history prompt
- Returns the generated story as JSON

**API Endpoint:**
```
POST /api/stories/generate
```

**Request Body:**
```json
{
  "monumentName": "Taj Mahal"
}
```

**Response:**
```json
{
  "success": true,
  "monumentName": "Taj Mahal",
  "story": "The Taj Mahal is an ivory-white marble mausoleum...",
  "wordCount": 115
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error generating story. Please try again later."
}
```

### Route: `storyRoutes.js`

**What it does:**
- Defines the POST endpoint `/generate`
- Maps it to the controller function

### Main Server: `index.js`

**What it does:**
- Initializes Express server
- Loads environment variables from `.env`
- Sets up middleware (CORS, JSON parsing)
- Registers route handlers
- Starts the server on the configured port

---

## 🎯 Frontend Code Explanation

### Service: `storyService.js`

**Function: `generateStory(monumentName)`**
- Makes a POST request to the backend API
- Sends the monument name
- Handles errors gracefully
- Returns the API response

**Usage:**
```javascript
const result = await generateStory("Qutub Minar");
console.log(result.story);
```

### Component: `StoryGenerator.js`

**What it does:**
- Provides UI for user to enter monument name
- Calls the `generateStory` function
- Displays the generated story
- Shows loading state while fetching
- Displays error messages if something goes wrong

**State Variables:**
- `monumentName` - User input
- `story` - Generated story data
- `loading` - Loading indicator
- `error` - Error messages

---

## 🔑 Environment Variables Explained

### Backend (.env)

| Variable | Purpose | Example |
|----------|---------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | `sk-...xyz` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` or `production` |

### Frontend (.env)

| Variable | Purpose | Example |
|----------|---------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000` |

---

## 📝 How It Works

1. **User enters a monument name** in the React UI
2. **Frontend sends POST request** to backend API with monument name
3. **Backend validates** the monument name
4. **Backend calls OpenAI API** with a cultural history prompt
5. **OpenAI returns** a generated story (100-120 words)
6. **Backend returns** the story as JSON response
7. **Frontend displays** the story with styling and word count

---

## 💡 Example Monuments to Try

- Taj Mahal
- Qutub Minar
- Hawa Mahal
- India Gate
- Ajanta Caves
- Khajuraho Temples
- Hampi Ruins
- Konark Sun Temple
- Sanchi Stupa
- Red Fort

---

## 🛠️ Troubleshooting

### Issue: "Invalid OpenAI API key"
**Solution:** Verify your API key in `.env` file is correct and not expired.

### Issue: CORS errors
**Solution:** Make sure both servers are running and frontend `.env` has correct backend URL.

### Issue: "Module not found" errors
**Solution:** Run `npm install` in both backend and frontend folders.

### Issue: Port already in use
**Solution:** Change the PORT in `.env` or kill the process using that port.

### Issue: API returns "Monument name is required"
**Solution:** Make sure you enter a monument name before clicking "Generate Story".

---

## 🚢 Deployment Tips for Hackathon

### Backend Deployment
- Use Render, Vercel, or Railway for free hosting
- Set environment variables in hosting platform
- Deploy with: `git push` (connected to GitHub)

### Frontend Deployment
- Use Vercel or Netlify for React hosting
- Update `REACT_APP_API_URL` to your production backend URL
- Deploy easily: Connect GitHub repo and it auto-deploys

---

## 📚 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [OpenAI API Guide](https://platform.openai.com/docs/guides/)
- [Node.js Best Practices](https://nodejs.org/en/docs/)

---

## 📝 Notes

- Stories are limited to 100-120 words for student engagement
- Each API call uses OpenAI tokens - monitor usage
- CORS is enabled for development (adjust as needed)
- Error handling is implemented for production-readiness

---

## ✨ Happy Hacking!

Good luck with your SanskritiSetu project! 🏛️🎓
