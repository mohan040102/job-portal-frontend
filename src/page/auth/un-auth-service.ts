import api from "../../api/axios-instance";

const validateToken = async (model) => {
    const headers = {
        headers: {
            Authorization: `Bearer ${model.token}`,
        },
    };
    return await api.post("api/auth/validate-token", {}, headers);
};

// Export all functions
const functions = {
    validateToken,
};

export default functions;
