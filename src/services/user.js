import axios from 'axios';
const api = process.env.NEXT_PUBLIC_API;

export const allUsers = async (token) => {
  try {
    const res = await axios.get(`${api}/user/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
