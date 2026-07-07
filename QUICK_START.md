# 🚀 QUICK START GUIDE

Get your SanskritiSetu project running in 5 minutes!

---

## Prerequisites Check ✓

Before starting, verify you have:
- [ ] Node.js installed (https://nodejs.org/)
- [ ] OpenAI API key (https://platform.openai.com/api-keys)
- [ ] Terminal/Command Prompt
- [ ] Code Editor (VS Code recommended)

---

## 1️⃣ Get Your OpenAI API Key (2 minutes)

1. Visit: https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key (you'll need it in a moment)
4. **Never share this key!**

---

## 2️⃣ Backend Setup (2 minutes)

### Terminal 1 - Backend Server

```bash
cd backend

npm install

# Update .env file with your API key:
# OPENAI_API_KEY=your_actual_key_here

npm start
```

✅ Wait until you see:
```
🚀 SanskritiSetu Backend Server running on port 5000
```

---

## 3️⃣ Frontend Setup (1 minute)

### Terminal 2 - Frontend Server

```bash
cd frontend

npm install

npm start
```

✅ App automatically opens at: `http://localhost:3000`

---

## 4️⃣ Test It! (30 seconds)

1. In the browser app, enter: **Taj Mahal**
2. Click: **Generate Story**
3. Watch the magic happen! ✨

---

## What You Should See

**Input:**
```
Monument Name: Taj Mahal
```

**Output:**
```
The Taj Mahal is an ivory-white marble mausoleum built by Emperor Shah Jahan 
in memory of his beloved wife Mumtaz Mahal. This magnificent Indo-Islamic 
structure in Agra showcases architectural brilliance with intricate inlay work 
and beautiful gardens. Recognized as one of the Seven Wonders of the World, 
it symbolizes eternal love and India's cultural heritage...

Words: 115
```

---

## Troubleshooting

### Backend fails to start?
```bash
# Check if port 5000 is free
netstat -ano | findstr :5000  # Windows
lsof -i :5000                  # Mac/Linux

# If in use, change PORT in backend/.env to 5001
```

### Frontend shows "Cannot reach API"?
1. Verify backend is running
2. Check `frontend/.env` has correct URL
3. Open DevTools (F12) → Console for errors

### "Invalid API Key" error?
1. Double-check API key in `backend/.env`
2. Visit https://platform.openai.com/account/api-keys
3. Make sure key is not expired

### npm install fails?
```bash
# Clear cache and try again
npm cache clean --force
npm install
```

---

## File Structure

```
Hackthon/
├── backend/           ← API Server (Port 5000)
├── frontend/          ← React UI (Port 3000)
├── README.md          ← Full documentation
├── API_DOCUMENTATION.md ← API details
├── BACKEND_SETUP.md   ← Detailed backend guide
└── FRONTEND_SETUP.md  ← Detailed frontend guide
```

---

## What's Running

| Service | URL | Purpose |
|---------|-----|---------|
| Backend API | http://localhost:5000 | Story generation |
| Frontend UI | http://localhost:3000 | User interface |
| OpenAI API | External | AI generation |

---

## Monuments to Try

- Taj Mahal
- Qutub Minar
- Hawa Mahal
- India Gate
- Red Fort
- Konark Sun Temple
- Ajanta Caves
- Sanchi Stupa

---

## Next Steps

1. ✅ Complete this quick start
2. 📖 Read [README.md](README.md) for details
3. 🔌 Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
4. 🎨 Customize UI in `frontend/src/components/`
5. 🚀 Deploy to production!

---

## Deployment Checklist

Ready to deploy? Follow these steps:

### Backend Deployment (Render)
1. Push code to GitHub
2. Go to https://render.com
3. Create new Web Service from GitHub
4. Set environment variable: `OPENAI_API_KEY`
5. Deploy!

### Frontend Deployment (Vercel)
1. Push code to GitHub
2. Go to https://vercel.com
3. Import `frontend` folder
4. Set env: `REACT_APP_API_URL=your_backend_url`
5. Deploy!

---

## One-Liner Commands

Start everything at once (in separate terminals):

```bash
# Terminal 1
cd backend && npm install && npm start

# Terminal 2
cd frontend && npm install && npm start
```

---

## Need Help?

1. Check the console (F12 in browser)
2. Look at terminal errors
3. Read [README.md](README.md)
4. Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
5. Review [BACKEND_SETUP.md](BACKEND_SETUP.md) or [FRONTEND_SETUP.md](FRONTEND_SETUP.md)

---

## 🎉 You're All Set!

Happy hacking with **SanskritiSetu**! 🏛️

Questions? Check the full documentation files included in the project!
