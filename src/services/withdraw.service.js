import axios from "axios";
import authHeader from "./auth.header";
const API_URL = "http://localhost:8080/api/";
// const API_URL = "https://seashell-app-jatrt.ondigitalocean.app/api/";

const withdraw_eth = (id, amount, eth_address) => {
    return axios.post(
        API_URL + "withdraw/eth/",
        {
        id,
        amount,
        eth_address,
        },
        { headers: authHeader() }
    );
    };

const WithdrawService = {
    withdraw_eth,
};

export default WithdrawService;