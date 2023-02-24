import axios from "axios";
import authHeader from "./auth.header";
const API_URL = "http://localhost:8080/api/";
// const API_URL = "https://seashell-app-jatrt.ondigitalocean.app/api/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};
const getUserBoard = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
};
const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};
const getUserById = (id) => {
    return axios.get(API_URL + "user/" + id, { headers: authHeader() });
};

const get_tvl = () => {
    return axios.get(API_URL + "admin/get_tvl", { headers: authHeader() });
};

const get_stakers = () => {
    return axios.get(API_URL + "admin/get_stakers", { headers: authHeader() });
};

const get_stakers_yield = () => {
    return axios.get(API_URL + "admin/get_stakers_yield", { headers: authHeader() });
};

const get_users = () => {
    return axios.get(API_URL + "admin/users", { headers: authHeader() });
};

const get_user_by_id = (id) => {
    return axios.get(API_URL + "admin/user/" + id, { headers: authHeader() });
};

const approve_deposit = (accountNumber, transactionId) => {
    return axios.post(API_URL + "admin/user/approve_deposit/", {
        accountNumber,
        transactionId,
    }, { headers: authHeader() }
    );
}

const approve_withdraw = (accountNumber, transactionId) => {
    return axios.post(API_URL + "admin/user/approve_withdraw/", {
        accountNumber,
        transactionId,
    }, { headers: authHeader() }
    );
}


const AdminService = {
    getPublicContent,
    getUserBoard,
    getAdminBoard,
    getUserById,
    get_tvl,
    get_stakers,
    get_stakers_yield,
    get_users,
    get_user_by_id,
    approve_deposit,
    approve_withdraw,
};
export default AdminService;

