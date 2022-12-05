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

const updateUserById = (id, firstname, lastname, phone, dni, address) => {
  return axios.patch(
    API_URL + "user/update/" + id,
    {
      firstname,
      lastname,
      phone,
      dni,
      address,
    },
    { headers: authHeader() }
  );
};

const get_user_balance = (id) => {
  return axios.get(API_URL + "user/balance/" + id, { headers: authHeader() });
};

const get_usdt_user_balance = (id) => {
  return axios.get(API_URL + "user/balance_usdt/" + id, { headers: authHeader() });
};

const get_ether_user_balance = (id) => {
  return axios.get(API_URL + "user/balance_ether/" + id, { headers: authHeader() });
}
const get_user_staked_balance = (id) => {
  return axios.get(API_URL + "user/staked_balance/" + id, {
    headers: authHeader(),
  });
};

const get_transaction_history = (id) => {
  return axios.get(API_URL + "user/transaction/" + id, {
    headers: authHeader(),
  });
};

const deposit_funds = (accountNumber, depositAmount, description) => {
  return axios.post(
    API_URL + "user/deposit/",
    {
      accountNumber,
      depositAmount,
      description,
    },
    { headers: authHeader() }
  );
};

const withdraw_money = (accountNumber, withdrawAmount, description) => {
  return axios.post(
    API_URL + "user/withdraw/",
    {
      accountNumber,
      withdrawAmount,
      description,
    },
    { headers: authHeader() }
  );
};

const stake_money = (accountNumber, amount) => {
  return axios.post(
    API_URL + "user/stake/",
    {
      accountNumber,
      amount,
    },
    { headers: authHeader() }
  );
};

const unstake_money = (accountNumber, amount) => {
  return axios.post(
    API_URL + "user/unstake/",
    {
      accountNumber,
      amount,
    },
    { headers: authHeader() }
  );
};

const get_usdt_rate = async () => {
  const response = await axios.get(
    "https://criptoya.com/api/belo/usdt/ars/0.5"
  );
  return response.data;
};

const exchange_ars_to_usdt = (accountNumber, exchangeAmount, usdtAmount) => {
  return axios.post(
    API_URL + "user/exchange_ars_to_usdt/",
    {
      accountNumber,
      exchangeAmount,
      usdtAmount,
    },
    { headers: authHeader() }
  );
}

const exchange_usdt_to_ars = (accountNumber, exchangeAmount, arsAmount) => {
  return axios.post(
    API_URL + "user/exchange_usdt_to_ars/",
    {
      accountNumber,
      exchangeAmount,
      arsAmount,
    },
    { headers: authHeader() }
  );
}


const UserService = {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
  getUserById,
  updateUserById,
  get_user_balance,
  deposit_funds,
  withdraw_money,
  get_transaction_history,
  stake_money,
  unstake_money,
  get_user_staked_balance,
  get_usdt_rate,
  exchange_ars_to_usdt,
  exchange_usdt_to_ars,
  get_usdt_user_balance,
  get_ether_user_balance,
};
export default UserService;
