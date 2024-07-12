import express from "express";
import path from "path";
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";

const app = express();

// logger middleware
app.use(logger);

// setup static folder
app.use(express.static(path.join(__dirname, "public")));

// app.get('/', (req, res)=> {
//     // res.send('<h1>Hello World!</h1>');
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

// app.get('/about', (req, res)=> {
//     // res.send('About');
//     res.sendFile(path.join(__dirname, 'public', 'about.html'));
// })

//Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use("/api/posts", posts);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
