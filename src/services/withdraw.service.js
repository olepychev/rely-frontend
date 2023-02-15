import axios from "axios";
import authHeader from "./auth.header";
const API_URL = "http://localhost:8080/api/";
// const API_URL = "https://seashell-app-jatrt.ondigitalocean.app/api/";

const withdraw_eth = (acc_number, amount, to_address) => {
    return axios.post(
        API_URL + "user/withdraw/eth/",
        {
            acc_number,
            amount,
            to_address,
        },
        { headers: authHeader() }
    );
};

const withdraw_usdt = (acc_number, amount, to_address, chain) => {
    return axios.post(
        API_URL + "user/withdraw/usdt/",
        {
            acc_number,
            amount,
            to_address,
            chain,
        },
        { headers: authHeader() }
    );
};

const withdraw_btc = (acc_number, amount, to_address) => {
    return axios.post(
        API_URL + "user/withdraw/btc/",
        {
            acc_number,
            amount,
            to_address,
        },
        { headers: authHeader() }
    );
};

const WithdrawService = {
    withdraw_eth,
    withdraw_usdt,
    withdraw_btc,
};

export default WithdrawService;