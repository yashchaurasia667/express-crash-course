const posts = [
  { id: 1, title: "post 1" },
  { id: 2, title: "post 2" },
  { id: 3, title: "post 3" },
  { id: 4, title: "post 4" },
];

// @desc Get all posts
// @route GET /api/posts

export const getPosts = (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0)
    return res.status(200).json(posts.slice(0, limit));
  res.status(200).json(posts);
}

// @desc Get single post
// @route GET /api/posts/:id

export const getPost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`No post with id ${id}`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json(post);
}

// @desc Create new post
// @route POST /api/posts/

export const createPost = (req, res, next) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    const error = new Error("Please include a title");
    error.status = 400;
    return next(error);
  }
  posts.push(newPost);
  res.status(201).json(posts);
}

// @desc Update post
// @route /api/posts/:id

export const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`No post with id ${id}`);
    error.status = 404;
    return next(error);
  }

  post.title = req.body.title;
  res.status(200).json(post);
}

// @desc Update post
// @route /api/posts/:id

export const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`No post with id ${id}`)
    error.status = 404;
    return next(error);
  }

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
}