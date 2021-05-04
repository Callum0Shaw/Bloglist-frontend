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

export default { getAll, postBlog, setToken };
