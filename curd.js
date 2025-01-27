const mongoose = require("mongoose");
const BlogPost = require("./schema.js");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a new blog post
const createPost = async () => {
  const post = new BlogPost({
    title: "My First Blog Post",
    content: "This is the content of my first blog post. It must be at least 50 characters long.",
    author: "user123",
    tags: ["tech", "coding"],
  });

  try {
    const savedPost = await post.save();
    console.log("Post Created:", savedPost);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Add a comment to a blog post
const addComment = async (postId, username, message) => {
  try {
    const post = await BlogPost.findById(postId);
    if (!post) return console.log("Post not found");

    post.comments.push({ username, message });
    await post.save();
    console.log("Comment added.");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Fetch all blog posts
const getPosts = async () => {
  try {
    const posts = await BlogPost.find();
    console.log("Posts:", posts);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Update a blog post
const updatePost = async (postId, updates) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(postId, updates, { new: true });
    if (!post) return console.log("Post not found");
    console.log("Post Updated:", post);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Delete a blog post
const deletePost = async (postId) => {
  try {
    const post = await BlogPost.findByIdAndDelete(postId);
    if (!post) return console.log("Post not found");
    console.log("Post Deleted:", post);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Example usage
(async () => {
  await createPost(); // Create a new post
  // await addComment("POST_ID_HERE", "commenter123", "Great post!"); // Add a comment
  // await getPosts(); // Get all posts
  // await updatePost("POST_ID_HERE", { title: "Updated Title" }); // Update a post
  // await deletePost("POST_ID_HERE"); // Delete a post
  mongoose.disconnect(); // Disconnect after operations
})();
