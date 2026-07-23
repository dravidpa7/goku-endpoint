import "dotenv/config";
import express, { json } from "express";
import fetchContributions from "./lib/github.js";
import buildSvg from "./lib/svg.js";
import { LongestStreak } from "./lib/logic.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/contributions", async (req,res) => {
    const username = req.query.username;
    if(!username) return res.status(400).json({ error: "username required" });

    try {
        const data = await fetchContributions(username);
        let streak = LongestStreak(data);
        res.json(
            streak
        )
    } catch (error) {
        res.status(500).json({error: error.message});
    }

})

app.get("/",(req,res)=>{
  res.send("GitHub Activity Graph API. Try /graph?username=dravidpa7");
})

app.listen(PORT,  () => console.log(`Server running on http://localhost:${PORT}`))