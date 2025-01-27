const mongoose = require("mongoose");

// Comment Schema
const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    description: "Username of the commenter",
  },
  message: {
    type: String,
    required: [true, "Comment message is required"],
    description: "The comment text",
  },
  commentedAt: {
    type: Date,
    default: Date.now,
    description: "Automatically records the comment creation time",
  },
});

// Blog Post Schema
const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Blog title is required"],
    minlength: [5, "Title must be at least 5 characters long"],
    description: "Serves as the title of the blog post",
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    minlength: [50, "Content must be at least 50 characters long"],
    description: "The main content of the blog post",
  },
  author: {
    type: String,
    description: "Username of the author",
  },
  tags: {
    type: [String],
    description: "Optional field for storing tags or keywords related to the post",
  },
  category: {
    type: String,
    default: "General",
    description: "Indicates the post category",
  },
  likes: {
    type: [String],
    description: "Stores usernames of users who liked the post",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    description: "Automatically records the post creation time",
  },
  updatedAt: {
    type: Date,
    description: "Automatically updated on modifications",
  },
  comments: [commentSchema], // Embedding comments as subdocuments
});

// Middleware to update `updatedAt` field on document update
blogPostSchema.pre("save", function (next) {
  if (!this.isNew) {
    this.updatedAt = Date.now();
  }
  next();
});

// Creating the models
const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;
