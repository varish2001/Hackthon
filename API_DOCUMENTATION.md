# API Documentation

## Endpoints Reference

---

## Health Check

### GET `/`

**Purpose:** Check if server is running

**URL:** `http://localhost:5000/`

**Response:**
```json
{
  "success": true,
  "message": "Know Your Rootshyyy API Server is running",
  "version": "1.0.0"
}
```

**Status Code:** `200`

---

## Generate Story

### POST `/api/stories/generate`

**Purpose:** Generate AI story about a monument

**Base URL:** `http://localhost:5000`

**Endpoint:** `/api/stories/generate`

**Full URL:** `http://localhost:5000/api/stories/generate`

---

### Request

**Method:** `POST`

**Headers:**
```
Content-Type: application/json
```

**Body Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `monumentName` | string | Yes | Name of the monument |

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/stories/generate \
  -H "Content-Type: application/json" \
  -d '{
    "monumentName": "Taj Mahal"
  }'
```

**JavaScript Fetch Example:**
```javascript
fetch('http://localhost:5000/api/stories/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ monumentName: 'Taj Mahal' })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
```

---

### Success Response

**Status Code:** `200`

**Response Body:**
```json
{
  "success": true,
  "monumentName": "Taj Mahal",
  "story": "The Taj Mahal stands as a timeless testament to love and architectural brilliance. Built by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, this ivory-white marble mausoleum showcases Indo-Islamic architecture at its finest. Located in Agra, India, it attracts millions of visitors annually. The monument features intricate inlay work, calligraphy, and perfectly proportioned gardens. Recognized as one of the Seven Wonders of the World, the Taj Mahal symbolizes eternal love and remains an iconic symbol of India's cultural heritage and artistic prowess.",
  "wordCount": 118
}
```

**Response Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Whether request was successful |
| `monumentName` | string | Monument name (as provided) |
| `story` | string | Generated AI story (100-120 words) |
| `wordCount` | number | Word count of the story |

---

### Error Responses

#### Missing Monument Name

**Status Code:** `400`

**Request:**
```json
{ "monumentName": "" }
```

**Response:**
```json
{
  "success": false,
  "message": "Monument name is required"
}
```

---

#### Invalid OpenAI API Key

**Status Code:** `401`

**Response:**
```json
{
  "success": false,
  "message": "Invalid OpenAI API key"
}
```

**Fix:** 
- Check your `.env` file
- Verify API key is correct
- Ensure you have billing setup on OpenAI

---

#### Server Error

**Status Code:** `500`

**Response:**
```json
{
  "success": false,
  "message": "Error generating story. Please try again later.",
  "error": "Rate limit exceeded"
}
```

**Common causes:**
- OpenAI API rate limit exceeded
- Network connectivity issue
- API key doesn't have enough credits

---

## Testing Checklist

### 1. Backend Server Running
```bash
curl http://localhost:5000
# Should return success message
```

### 2. Story Generation
```bash
curl -X POST http://localhost:5000/api/stories/generate \
  -H "Content-Type: application/json" \
  -d '{"monumentName":"Taj Mahal"}'
# Should return story with 100-120 words
```

### 3. Error Handling (Invalid Input)
```bash
curl -X POST http://localhost:5000/api/stories/generate \
  -H "Content-Type: application/json" \
  -d '{"monumentName":""}'
# Should return error message
```

### 4. Error Handling (Missing Parameter)
```bash
curl -X POST http://localhost:5000/api/stories/generate \
  -H "Content-Type: application/json" \
  -d '{}'
# Should return error message
```

---

## Example Requests & Responses

### Example 1: Qutub Minar

**Request:**
```json
{ "monumentName": "Qutub Minar" }
```

**Response:**
```json
{
  "success": true,
  "monumentName": "Qutub Minar",
  "story": "The Qutub Minar is a stunning minaret and UNESCO World Heritage Site located in Delhi. Built in 1193 by Qutb-ud-din Aibak, this unique monument showcases Indo-Islamic architecture. Standing approximately 73 meters tall, it features intricate inscriptions in calligraphy. The tower has five storeys with balconies and is an architectural marvel. The monuments in its complex include mosques and tombs reflecting medieval Islamic art. Qutub Minar represents the triumph of Islamic civilization in India and remains a symbol of architectural excellence and historical significance, attracting history enthusiasts worldwide.",
  "wordCount": 114
}
```

### Example 2: Hawa Mahal

**Request:**
```json
{ "monumentName": "Hawa Mahal" }
```

**Response:**
```json
{
  "success": true,
  "monumentName": "Hawa Mahal",
  "story": "The Hawa Mahal, or Palace of Winds, is a magnificent terracotta-pink brick structure in Jaipur, Rajasthan. Built in 1799 by Maharaja Sawai Pratap Singh, this iconic monument features 953 small windows designed to allow royal women to observe street festivals. Its five-story structure showcases remarkable Mughal and Hindu architectural influences. The intricate lattice work and pyramidal roofs create an enchanting silhouette. Standing as a symbol of Jaipur's cultural wealth, Hawa Mahal attracts over two million visitors annually. This UNESCO-listed monument represents India's architectural ingenuity and passion for preserving cultural heritage beautifully.",
  "wordCount": 117
}
```

---

## Response Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Story generated successfully |
| 400 | Bad Request | Missing or invalid parameters |
| 401 | Unauthorized | Invalid OpenAI API key |
| 404 | Not Found | Endpoint doesn't exist |
| 500 | Server Error | OpenAI API error or server issue |

---

## Rate Limiting

OpenAI API has rate limits:
- **Free tier:** Limited requests per day
- **Paid tier:** Higher limits (check your account)

If you get "Rate limit exceeded" error:
- Wait a few moments before retrying
- Check usage on OpenAI dashboard

---

## Integration Examples

### React Component (Already Provided)
See `frontend/src/services/storyService.js`

### Node.js/Express (Using axios)
```javascript
const axios = require('axios');

async function getStory(monumentName) {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/stories/generate',
      { monumentName: monumentName }
    );
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

getStory('Taj Mahal');
```

### Python
```python
import requests
import json

url = 'http://localhost:5000/api/stories/generate'
data = {'monumentName': 'Taj Mahal'}

response = requests.post(url, json=data)
print(response.json())
```

---

## Best Practices

1. **Always provide monumentName:** Don't send empty strings
2. **Handle errors:** Check `success` field in response
3. **Add timeouts:** Set request timeout to 30 seconds
4. **Rate limiting:** Implement delays between requests
5. **Caching:** Cache results to save API calls
6. **Logging:** Log API requests for debugging

---

## Deployment Endpoints

### Example Production URLs

**Backend (Render):**
```
https://sanskritisetu-api.onrender.com/api/stories/generate
```

**Backend (Railway):**
```
https://your-app.railway.app/api/stories/generate
```

**Frontend (.env update):**
```env
REACT_APP_API_URL=https://sanskritisetu-api.onrender.com
```

---

## Glossary

| Term | Meaning |
|------|---------|
| API | Application Programming Interface |
| REST | Representational State Transfer |
| Endpoint | URL path where an API can be accessed |
| Payload | Data sent in request body |
| Token | OpenAI API authentication |
| Rate Limit | Maximum API calls allowed per period |

---

For more help, check the main [README.md](README.md)
