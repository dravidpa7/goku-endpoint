import "dotenv/config";
import express, { json } from "express";
import fetchContributions from "./lib/github.js";
import {buildSvg} from "./lib/svg.js";
import { LongestStreak } from "./lib/logic.js";
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(process.cwd(),'public')));

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

app.get("/graph", async (req,res) => {
    const username = req.query.username
    if (!username) return res.status(400).send("username required");

    try {
        const data = await fetchContributions(username);
        const streak = LongestStreak(data);

        console.log(streak);
        
        const svg = buildSvg(streak);
        res.setHeader("Content-Type", "image/svg+xml");
        res.setHeader("Cache-Control", "public, max-age=3600");
        res.send(svg);
    } catch (err) {
        res.status(500).send(`<svg xmlns="http://www.w3.org/2000/svg"><text y="20">${err.message}</text></svg>`);
    }

})

app.listen(PORT,  () => console.log(`Server running on http://localhost:${PORT}`))