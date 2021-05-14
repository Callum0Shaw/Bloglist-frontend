import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");

  const blogFormRef = useRef();

  useEffect(() => {
    const fetchBlogs = async () => {
      const newBlogs = await blogService.getAll();
      setBlogs(sortBlogs(newBlogs));
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON);
      setUser(currentUser);
      blogService.setToken(currentUser.token);
    }
  }, []);

  const loginUser = async (loginDetails) => {
    try {
      const currentUser = await loginService.login(loginDetails);
      window.localStorage.setItem("loggedUser", JSON.stringify(currentUser));
      blogService.setToken(currentUser.token);
      setUser(currentUser);
    } catch (error) {
      setMessage("Wrong username or password");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const postBlog = async (blog) => {
    blogFormRef.current.toggleVisibility();
    const submittedBlog = await blogService.postBlog(blog);
    setMessage(`Blog: ${blog.title} by ${blog.author} added`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    setBlogs(blogs.concat(submittedBlog));
  };

  const likeBlog = async (blog) => {
    const likedBlog = await blogService.likeBlog(blog);
    setMessage(`You have liked: ${blog.title} by ${blog.author}`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    const updatedBlogs = blogs.map((blog) =>
      blog.id === likedBlog.id ? { ...blog, likes: blog.likes + 1 } : blog
    );
    setBlogs(sortBlogs(updatedBlogs));
  };

  const sortBlogs = (array) => {
    const sortedBlogs = array.sort((a, b) => (a.likes > b.likes ? -1 : 1));
    return sortedBlogs;
  };

  const deleteBlog = (blog) => {
    try {
      (async () => await blogService.deleteBlog(blog))();
      setMessage(`You have deleted:  ${blog.title} by ${blog.author}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    } catch (error) {
      setMessage("You do not have permission to delete this blog");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <LoginForm loginUser={loginUser} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <Logout name={user.name} />
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm postBlog={postBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
