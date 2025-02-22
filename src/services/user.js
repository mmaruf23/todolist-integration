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

export const findByUsername = async (token, search) => {
  try {
    const res = await axios.get(`${api}/user/search?username=${search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const setAdmin = async (token, username) => {
  try {
    const res = await axios.patch(
      `${api}/user/set-admin/${username}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error setting admin:', error);
    return null;
  }
};

export const deleteUserByUsername = async (token, username) => {
  try {
    const res = await axios.delete(`${api}/user/delete/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error delete user:', error);
    return null;
  }
};

export const getByUsername = async (token, username) => {
  try {
    const res = axios.get(`${api}/user/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserProfile = async (username, token, payload) => {
  try {
    const res = axios.put(`${api}/user/${username}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    
  }
};
