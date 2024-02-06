import axios from "axios";

const requestService = () => {
  const getRequest = async ({ endpoint, headers }) => {
    try {
      const response = await axios.get(endpoint, { headers });
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

  const postRequest = async ({ endpoint, body }) => {
    try {
      const response = await axios.post(endpoint, body);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRequest = async ({ endpoint }) => {
    try {
      const response = await axios.delete(endpoint);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return { getRequest, postRequest, deleteRequest };
};

export default requestService;
