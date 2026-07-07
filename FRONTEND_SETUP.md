# Frontend Setup - Step by Step

## Complete Installation & Configuration Guide

---

## Step 1: Navigate to Frontend Folder

```bash
cd frontend
```

---

## Step 2: Install All Dependencies

Run this command to install all required npm packages:

```bash
npm install
```

**Packages installed:**
- **react** (^18.2.0) - UI library
- **react-dom** (^18.2.0) - React for web
- **react-scripts** (5.0.1) - Create React App tools
- **axios** (^1.6.0) - HTTP client (optional, using fetch instead)

---

## Step 3: Verify Backend is Running

**Important:** Make sure your backend server is running FIRST!

Check:
```bash
curl http://localhost:5000
```

Should return:
```json
{"success":true,"message":"SanskritiSetu API Server is running","version":"1.0.0"}
```

---

## Step 4: Configure Environment Variables

The `frontend/.env` file is pre-configured:

```env
REACT_APP_API_URL=http://localhost:5000
```

**Change this if:**
- Backend runs on a different port: `http://localhost:YOUR_PORT`
- Backend is deployed: `https://your-backend-url.com`

**Note:** Variable must start with `REACT_APP_` to be accessible in React

---

## Step 5: Start the Development Server

```bash
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view sanskritisetu-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

The app will automatically open in your browser! 🎉

---

## Step 6: Test the Application

1. **App should display:**
   - "🏛️ SanskritiSetu - AI Story Generator" title
   - Input field for monument name
   - "Generate Story" button

2. **Test the feature:**
   - Enter: "Taj Mahal"
   - Click: "Generate Story"
   - Wait for loading spinner
   - See: AI-generated story displayed

---

## Understanding the Code

### Frontend Architecture

```
Frontend
├── services/
│   └── storyService.js         ← Makes API calls
├── components/
│   ├── StoryGenerator.js       ← Main UI component
│   └── StoryGenerator.css      ← Styling
├── pages/
│   └── (add more pages here)
└── App.js                      ← Root component
```

### How Data Flows

```
User Input
    ↓
StoryGenerator Component
    ↓
generateStory() function (storyService.js)
    ↓
POST to http://localhost:5000/api/stories/generate
    ↓
Backend (OpenAI API)
    ↓
Story returned
    ↓
Display on UI
```

### Key Component: StoryGenerator.js

**State Variables:**
```javascript
const [monumentName, setMonumentName] = useState("");  // User input
const [story, setStory] = useState(null);              // Generated story
const [loading, setLoading] = useState(false);         // Loading flag
const [error, setError] = useState(null);              // Error messages
```

**Main Function:**
```javascript
const handleGenerateStory = async (e) => {
  // 1. Validate input
  // 2. Show loading
  // 3. Call API
  // 4. Display story or error
}
```

---

## Available Scripts

### Development Server
```bash
npm start
```
Starts development server with hot-reload

### Build for Production
```bash
npm run build
```
Creates optimized production build in `build/` folder

### Run Tests
```bash
npm test
```
Launch test runner in interactive mode

---

## Troubleshooting

### Problem: "Port 3000 already in use"
**Solution:** 
```bash
# Kill the process or use a different port
set PORT=3001
npm start
```

### Problem: "Cannot GET /"
**Solution:** Wait a bit for React to compile, refresh the page

### Problem: "Cannot find module 'react'"
**Solution:** Run `npm install` again

### Problem: API calls fail / "Failed to fetch"
**Possible causes:**
1. Backend is not running
2. Wrong URL in `.env` file
3. CORS issue - check backend has CORS enabled
4. Network connectivity issue

**Debug steps:**
1. Check backend at: http://localhost:5000
2. Verify `.env` in frontend folder
3. Check browser console for error details (F12)
4. Check backend console for error logs

### Problem: "Invalid OpenAI API key" error
**Solution:** 
1. Check backend `.env` file
2. Verify API key is correct
3. Test directly: `curl -X POST http://localhost:5000/api/stories/generate -H "Content-Type: application/json" -d '{"monumentName":"Test"}'`

---

## File Structure

```
frontend/
├── public/
│   └── index.html              ← HTML entry point
├── src/
│   ├── components/
│   │   ├── StoryGenerator.js   ← Main component
│   │   └── StoryGenerator.css  ← Styles
│   ├── services/
│   │   └── storyService.js     ← API functions
│   ├── App.js                  ← Root component
│   ├── index.js                ← React entry point
│   └── index.css               ← Global styles
├── package.json                ← Dependencies
├── .env                        ← Environment variables
└── .gitignore                  ← Git exclusions
```

---

## Development Tips

### Debug Mode
Open browser DevTools (F12) → Console tab to see:
- API request/response
- JavaScript errors
- Console.log statements

### React DevTools Extension
Install "React Developer Tools" browser extension for better debugging

### Network Tab
In DevTools → Network tab, see:
- All API requests
- Response data
- Request/response timing

---

## Building for Production

```bash
npm run build
```

This creates `build/` folder ready for deployment on:
- Vercel (free)
- Netlify (free)
- GitHub Pages
- Any static hosting

---

## Next Step

✅ Frontend is ready!

Your full application is now complete:
- Backend API: running on port 5000
- Frontend UI: running on port 3000

To use the app:
1. Enter a monument name
2. Click "Generate Story"
3. See AI-generated cultural story! 🎉

---

## Getting Help

Check browser console (F12) for error messages.
Check backend terminal for server errors.
