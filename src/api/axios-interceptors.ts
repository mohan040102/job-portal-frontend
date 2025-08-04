import axiosInstance from "./axios-instance";
import localStorageService from "../services/local-storage-service";
import { showSnackbar } from "../redux/snackbar-slice";
import { DateTime } from "luxon";
import constant from "../constants/constant";
import type { Store } from "@reduxjs/toolkit";
import formData from "form-data";

// Function to set up interceptors
const setupInterceptors = (store: Store) => {
    const { dispatch, getState } = store;

    // Request Interceptor: Attach JWT token & handle FormData headers
    axiosInstance.interceptors.request.use(
        (request) => {
            const token = localStorageService.getToken()?.access?.token;
            if (token) {
                request.headers.Authorization = `Bearer ${token}`;
            }
            if (request.data instanceof formData) {
                Object.assign(request.headers, { 'Content-Type': 'multipart/form-data', 'x-waf-token': getState().validationKey.token });
            }
            return request;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response Interceptor: Handle errors & token expiry
    axiosInstance.interceptors.response.use(
        (response) => {
            dispatch(setUserLastInteraction({ userLastInteraction: DateTime.now().toUnixInteger() }));
            return response;
        },
        (error) => {
            if (error.response?.status === 401 || error.response?.status === 403) {
                dispatch(removeUserInfo());
            }
            if (error?.response?.status === constant.HTTP_TOO_MANY_REQUEST) {
                dispatch(
                    showSnackbar({ type: "error", content: "Too Many Requests, Please Try Again Later" })
                );
            } else if (error.code === "ERR_CANCELED") {
                // Ignore canceled requests
            } else {
                const errorMessage = error?.response?.data?.message || error?.message;
                dispatch(showSnackbar({ type: "error", content: errorMessage }));
            }
            dispatch(setUserLastInteraction({ userLastInteraction: DateTime.now().toUnixInteger() }));
            return Promise.reject(error);
        }
    );
};

export default setupInterceptors;
