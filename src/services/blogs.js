import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const reponse = await axios.get(baseUrl);

  return reponse.data;
};

const postBlog = async (blog) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, blog, config);

  return response.data;
};

const likeBlog = async (blog) => {
  const config = { headers: { Authorization: token } };
  const newBlog = {
    user: blog.user,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url,
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, newBlog, config)

  return response.data;
}

const toExport = { getAll, postBlog, setToken, likeBlog };

export default toExport;
