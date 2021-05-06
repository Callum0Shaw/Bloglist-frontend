import React, { useState } from "react";
import "./blogs.css"

const Blog = ({ blog, likeBlog, deleteBlog, user })=> {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddLike = () => {
    likeBlog(blog)
  }

  const handleDelete = () => {
    deleteBlog(blog)
  }

  if (!isExpanded) {
    return (
      <div className="minimisedBlog">
        <div className="blogItem">
          {blog.title} by {blog.author}
          <button onClick={toggleExpanded}>View</button>
        </div>
      </div>
    );
  }

  return (
    <div className="expandedBlog">
      <div className="blogItem">
        {blog.title}
        <button onClick={toggleExpanded}>Hide</button>
      </div>
      <div className="blogItem">{blog.url}</div>
      <div className="blogItem">
        {blog.likes} <button onClick={handleAddLike}>Like</button>
      </div>
      <div className="blogItem">{blog.author}</div>
      {user.username === blog.user.username && <button onClick={handleDelete}>Delete</button>}
      
    </div>
  );
};

export default Blog;
