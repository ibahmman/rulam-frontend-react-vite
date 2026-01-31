import axiosInstance from "../api/axiosInstance"; // همان axiosInstance که JWT و baseURL داره


export const getProfile = (userId) => {
    console.log(userId);
    return axiosInstance.get(`/f/r/profiles/${userId}/`);
};

export const searchProfiles = (query) => {
  return axiosInstance.get("/f/r/profiles/", {
    params: { search: query },
  });
};

export const addFriend = (userId) => {
  return axiosInstance.post("/f/profile/friends/add/", { user_id: userId });
};