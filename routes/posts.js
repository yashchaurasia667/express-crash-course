import express from 'express';
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

  if (!post)
    return res
      .status(404)
      .json({ message: `A post with the id of ${id} was not found` });
  res.status(200).json(post);
});

// Create new post
router.post('/', (req, res)=> {
  console.log(req.body);
  req.status(201).json(posts);
})

export default router;