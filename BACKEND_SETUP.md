# Backend Setup - Step by Step

## Complete Installation & Configuration Guide

---

## Step 1: Navigate to Backend Folder

```bash
cd backend
```

---

## Step 2: Install All Dependencies

Run this command to install all required npm packages:

```bash
npm install
```

**Packages installed:**
- **express** (^4.18.2) - Web framework for creating API endpoints
- **openai** (^4.28.0) - Official OpenAI API client library
- **dotenv** (^16.3.1) - Load environment variables from .env file
- **cors** (^2.8.5) - Enable Cross-Origin Resource Sharing
- **nodemon** (^3.0.2) - Auto-reload during development (dev only)

---

## Step 3: Get Your OpenAI API Key

### Option A: Quick Method
1. Visit: https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key (appears only once!)
4. Never share this key - it's like a password

### Option B: If You Don't Have OpenAI Account
1. Go to https://platform.openai.com/signup
2. Create account with email
3. Complete email verification
4. Set up billing method
5. Then follow "Option A" above

---

## Step 4: Configure .env File

Open `backend/.env` and update it:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-your_actual_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=development
```

**⚠️ Important:**
- Never commit .env file to GitHub
- It's already in .gitignore (protected)
- Keep your API key secret!

---

## Step 5: Start the Server

### For Development (with auto-reload):
```bash
npm run dev
```

### For Production (regular start):
```bash
npm start
```

**Expected console output:**
```
🚀 SanskritiSetu Backend Server running on port 5000
Environment: development
```

---

## Step 6: Verify Backend is Working

### Using Browser
1. Open: http://localhost:5000
2. Should see: `{"success":true,"message":"SanskritiSetu API Server is running","version":"1.0.0"}`

### Using curl
```bash
curl http://localhost:5000
```

### Test Story Generation
```bash
curl -X POST http://localhost:5000/api/stories/generate \
  -H "Content-Type: application/json" \
  -d '{"monumentName":"Taj Mahal"}'
```

**Expected response:**
```json
{
  "success": true,
  "monumentName": "Taj Mahal",
  "story": "The Taj Mahal is...",
  "wordCount": 115
}
```

---

## Troubleshooting

### Problem: "command not found: npm"
**Solution:** Install Node.js from https://nodejs.org/

### Problem: "Port 5000 already in use"
**Solution 1:** Change PORT in .env to 5001
**Solution 2:** Kill process: `lsof -ti:5000 | xargs kill` (Mac/Linux)

### Problem: "Cannot find module 'openai'"
**Solution:** Run `npm install` again

### Problem: "Invalid API key"
**Solution:** 
1. Double-check your key in .env
2. Visit https://platform.openai.com/account/billing/overview to check balance
3. Make sure key starts with `sk-`

---

## File Structure

```
backend/
├── controllers/
│   └── storyController.js      ← Story generation logic
├── routes/
│   └── storyRoutes.js          ← API endpoints
├── index.js                    ← Main server file (START HERE)
├── package.json                ← Dependencies list
├── .env                        ← Your secrets (keep private!)
└── .gitignore                  ← Ignore .env, node_modules
```

---

## Next Step

✅ Backend is ready!

Now proceed to frontend setup: see `FRONTEND_SETUP.md`
