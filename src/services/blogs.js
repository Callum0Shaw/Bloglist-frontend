import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const config = { headers: { Authorization: token } };
  const reponse = await axios.get(baseUrl, config);

  return reponse.data;
};

export default { getAll, setToken };
