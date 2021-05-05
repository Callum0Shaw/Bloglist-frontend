import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Logout from "./components/Logout";
import AddBlog from "./components/AddBlog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");

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

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Logging in with ", username, password);
    try {
      const currentUser = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(currentUser));
      blogService.setToken(currentUser.token);
      setUser(currentUser);
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage("Wrong username or password");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setUsername("");
      setPassword("");
    }
  };

  const createBlog = (event) => {
    event.preventDefault();
    const blog = {
      title: title,
      author: author,
      url: url,
    };
    const submittedBlog = async () => await blogService.postBlog(blog);
    submittedBlog();
    setMessage(`Blog: ${title} by ${author} added`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <Logout name={user.name} />
      <AddBlog
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        createBlog={createBlog}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
