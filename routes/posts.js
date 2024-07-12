import express from "express";
const router = express.Router();

const posts = [
  { id: 1, title: "post 1" },
  { id: 2, title: "post 2" },
  { id: 3, title: "post 3" },
  { id: 4, title: "post 4" },
];

// Get all posts
router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0)
    return res.status(200).json(posts.slice(0, limit));
  res.status(200).json(posts);
});

// Get a single post
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) return res.status(404).json({ message: `No post with id ${id}` });
  res.status(200).json(post);
});

// Create new post
router.post("/", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title)
    return res.status(400).json({ message: "Please include a title" });
  posts.push(newPost);
  req.status(201).json(posts);
});

// Update post
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) return res.status(404).json({ message: `No post with id ${id}` });

  post.title = req.body.title;
  res.status(200).json(post);
});

// Delete post
router.delete('/:id', (req, res)=> {
  const id = parseInt(req.params.id);
  const post = posts.find((post)=> post.id === id);
  
  if(!post) return res.status(404).json({message: `No post with id ${id}`})
  
  posts = posts.filter((post)=> post.id !== id);
  res.status(200).json(posts);
})

export default router;
