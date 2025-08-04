import api from '../api/axios-instance';
import localstorageService from '../services/local-storage-service';
import React from 'react';

export const loginAsync = async (user, { rejectWithValue }) => {
    try {
      const header = {
        auth: { username: user.email, password: user.password },
      };
      const response = await api.post("auth/login", {}, header);

      if (response.status === 200) {
        localstorageService.setToken(response.data);
        return response.data;
      } else {
        return rejectWithValue(`Login failed with status: ${response.status}`);
      }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login Failed! Please try again");
    }
  };

export const getUser = async (email) => {
  const token = localstorageService.getToken();
   const headers = {
        headers: {
            Authorization: `Bearer ${token.token}`,
        },
    };
        const getUser = await api.get(`user/${email}`, headers);
        return getUser.data;
}



export const logoutAsync = async() => {
      localstorageService.removeToken();
}