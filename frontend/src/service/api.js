import axios from "axios";

const API_URI = "https://student-speaks-back.vercel.app";

// function to login user
export const loginUser = async (userData) => {
    try {
        const res = await axios.post(`${API_URI}/login`, userData);
        return res.data;
    } catch (error) {
        console.log("Error while calling the login API ", error.message);
    }
};

// function to signup user
export const signupUser = async (userData) => {
    try {
        const res = await axios.post(`${API_URI}/register`, userData);
        return res.data;
    } catch (error) {
        console.log("Error while calling the signup API ", error.message);
    }
};

export const sendFeedback = async (formData) =>{
    try {
        const res = await axios.post(`${API_URI}/send-feedback`,formData);
        return res.data;
        
    } catch (error) {
        console.log("Error while posting the feedbacl ", error.message);
    }
}

export const getFeedbacks = async () => {
    try {
        const res = await axios.get(`${API_URI}/feedbacks`);
        return res.data;
    } catch (error) {
        console.log("Error fetching feedbacks:", error.message);
        throw error; // Optionally handle the error higher up the call stack
    }
};


export const getUsers = async () =>{
    try {
        const res  = await axios.get(`${API_URI}/users`)
        return res.data
    } catch (error) {
        console.log("Error in fetching the users");
    }
}

export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_URI}/${userId}`);
        return response.data; // Assuming your backend returns a message upon successful deletion
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error; // You can handle errors further up the call stack as needed
    }
};