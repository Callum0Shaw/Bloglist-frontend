import React, {useState} from "react";
import Input from "./Input";

const BlogForm = ({ postBlog}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    };
    postBlog(newBlog);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <Input title="Title" type="text" value={title} setInput={setTitle} />
        <Input title="Author" type="text" value={author} setInput={setAuthor} />
        <Input title="Url" type="text" value={url} setInput={setUrl} />
        <button type="submit">Create</button>
      </form>
      <br></br>
    </div>
  );
};

export default BlogForm;
