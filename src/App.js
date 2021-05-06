import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import AddBlog from "./components/BlogForm";
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
      setBlogs(newBlogs);
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

  const loginUser = async (user) => {
    try {
      const currentUser = await loginService.login(user);
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
    console.log(submittedBlog);
    setMessage(`Blog: ${blog.title} by ${blog.author} added`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    setBlogs(blogs.concat(blog));
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
        <AddBlog postBlog={postBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
