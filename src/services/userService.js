import axios from '../axios';
export const handleLogin = async (email, password) => {
    try {
        const response = await axios.post("/api/login", {email, password});
        console.log(response);
        
        return response;
    } catch(error) {
        console.error("Login API Error:", error.response);
        return error.response?.data || { errCode: -1, errMessage: "Email/Password không hợp lệ" };
    }
    
}

