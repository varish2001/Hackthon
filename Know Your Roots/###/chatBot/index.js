require("dotenv").config();
const express = require("express");
const sarvamStoryRoute = require("./sarvamStoryRoutes");
console.log('sarvamStoryRoute ->', typeof sarvamStoryRoute, sarvamStoryRoute && sarvamStoryRoute.constructor && sarvamStoryRoute.constructor.name);

const app = express();
app.use(express.json());

app.use("/api/sarvam", sarvamStoryRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
