import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const newBlogs = await blogService.getAll();
      setBlogs(newBlogs);
    };
    fetchBlogs();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Logging in with ", username, password);
    try {
      const newUser = await loginService.login({ username, password });
      blogService.setToken(newUser.token);
      setUser(newUser);
      setUsername("");
      setPassword("");
    } catch (error) {
      alert("Wrong login details");
    }
  };
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
      <p>{user.name} logged in</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
