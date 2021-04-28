import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Logout from "./components/Logout";
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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      setUser(currentUser)
      blogService.setToken(currentUser.token)
    }
  }, [])

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
      <Logout name={user.name}/>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
