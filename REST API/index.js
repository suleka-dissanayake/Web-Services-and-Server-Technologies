import express from "express";
import moviesRouter from "./routes/movies.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/movies", moviesRouter);

app.get("/", (req, res) => {
    console.log("We are in the homepage");
    res.send("Hello");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});