import express from "express";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let movies = [];

router.post("/", (req, res) => {
    const movie = {...req.body,id: uuidv4()};

    if (!movie || !movie.movieName) {
        return res.status(400).send("movieName is required");
    }

    movies.push(movie);

    res.send(`${movie.movieName} movie has been added to the database`);
});

router.get("/", (req, res) => {
    res.json(movies);
});

export default router;