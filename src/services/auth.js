import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const api = process.env.NEXT_PUBLIC_API;

export const register = async (payload) => {
  try {
    const response = await axios.post(`${api}/user/register`, payload);
    return response;
  } catch (error) {
    return error;
  }
};

export const login = async (payload) => {
  try {
    const response = await axios.post(`${api}/user/login`, payload);
    return response;
  } catch (error) {
    return error;
  }
};

export const getProfile = async (token) => {
  try {
    const response = await axios.get(`${api}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`, // Menetapkan token di header
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateProfile = async (edit, token, payload) => {
  try {
    const response = await axios.put(`${api}/user/me/${edit}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`, // Menetapkan token di header
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}

export const getRole = (token) => {
  return jwtDecode(token);
} 