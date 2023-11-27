import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);

export const createTip = (tipData) => API.post("/tip", tipData);
export const getTips = () => API.get("/tip");
export const getTip = (id) => API.get(`/tip/${id}`);
export const deleteTip = (id) => API.delete(`/tip/${id}`);
export const updateTip = (updatedTipData, id) =>
  API.patch(`/tip/${id}`, updatedTipData);
export const likeTip = (id) => API.post(`/tip/${id}/like`);
export const getTipsByUser = (userId) => API.get(`/tour/userTips/${userId}`);
