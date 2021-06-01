import React, { useState } from "react";
import PropTypes from "prop-types";

import "./blogs.css";

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddLike = () => {
    likeBlog(blog);
  };

  const handleDelete = () => {
    deleteBlog(blog);
  };

  if (!isExpanded) {
    return (
      <li className="blog">
        <div className="blogItem">
          {blog.title} by {blog.author}
          <button className="showBlog" onClick={toggleExpanded}>
            View
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="blog">
      <div className="blogItem">
        {blog.title}
        <button className="hideBlog" onClick={toggleExpanded}>
          Hide
        </button>
      </div>
      <div className="blogItem">{blog.url}</div>
      <div className="blogItem">
        {blog.likes}{" "}
        <button className="likeBlog" onClick={handleAddLike}>
          Like
        </button>
      </div>
      <div className="blogItem">{blog.author}</div>
      {user.username === blog.user.username && (
        <button className="deleteBlog" onClick={handleDelete}>
          Delete
        </button>
      )}
    </li>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
