import axios from "../axios";
export const handleLogin = async (email, password) => {
  try {
    const response = await axios.post("/api/login", { email, password });
    return response;
  } catch (error) {
    console.error("Login API Error:", error.response);
    return (
      error.response?.data || {
        errCode: -1,
        errMessage: "Email/Password không hợp lệ",
      }
    );
  }
};
export const getAllUser = async (inputId) => {
  return await axios.get(`/api/get-all-users?id=${inputId}`, {
    id: inputId,
  });
};

export const createUserAPI = async (data) => {
  return await axios.post("/api/create-user", data);
};
export const deleteUserAPI = async (id) => {
  return await axios.delete("/api/delete-user", {
    data: {
      id: id,
    },
  });
};
export const editUserAPI = async (data) => {
  return await axios.put("/api/edit-user", data);
};
export const getAllCodeService = async (data) => {
  return await axios.get(`/api/allcode?type=${data}`);
};
export const getTopDoctorHome = async (limit) => {
  return await axios.get(`/api/top-doctor-home?limit=${limit}`);
};
export const getAllDoctor = async () => {
  return await axios.get(`/api/get-all-doctor`);
};
export const saveDetailInfoDoctor = async (data) => {
  return await axios.post("/api/save-info-doctor", data);
};
export const getDetailInfoDoctor = async (doctorId) => {
  return await axios.get(`/api/get-detail-doctoc-by-id?id=${doctorId}`);
};
