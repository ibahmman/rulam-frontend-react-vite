import axiosInstance from "../api/axiosInstance"; // همان axiosInstance که JWT و baseURL داره


export const getProfile = (userId) => {
    console.log(userId);
    return axiosInstance.get(`/f/r/profiles/${userId}/`);
};