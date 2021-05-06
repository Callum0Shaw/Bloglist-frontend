import React, { useState } from "react";
import "./blogs.css"

const Blog = ({ blog, likeBlog }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const addLike = () => {
    likeBlog(blog)
  }

  if (!isExpanded) {
    return (
      <div className="minimisedBlog">
        <div className="blogItem">
          {blog.title} {blog.author}
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
        {blog.likes} <button onClick={addLike}>Like</button>
      </div>
      <div className="blogItem">{blog.author}</div>
    </div>
  );
};

export default Blog;
