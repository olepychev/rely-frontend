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

const get_ars_user_balance = (id) => {
  return axios.get(API_URL + "user/balance_ars/" + id, { headers: authHeader() });
};

const get_usdt_user_balance = (id) => {
  return axios.get(API_URL + "user/balance_usdt/" + id, { headers: authHeader() });
};

const get_ether_user_balance = (id) => {
  return axios.get(API_URL + "user/balance_ether/" + id, { headers: authHeader() });
}

const get_bnb_user_balance = (id) => {
  return axios.get(API_URL + "user/balance_bnb/" + id, { headers: authHeader() });
}

const get_btc_user_balance = (id) => {
  return axios.get(API_URL + "user/balance_btc/" + id, { headers: authHeader() });
}

const get_user_staked_balance = (id) => {
  return axios.get(API_URL + "user/staked_balance/" + id, {
    headers: authHeader(),
  });
};

const get_transaction_history = (acc_number) => {
  return axios.get(API_URL + "user/transaction/" + acc_number, {
    headers: authHeader(),
  });
};

const get_staking_history = (acc_number) => {
  return axios.get(API_URL + "user/staking_transaction/" + acc_number, {
    headers: authHeader(),
  });
};

const get_bank_history = (acc_number) => {
  return axios.get(API_URL + "user/bank_transaction/" + acc_number, {
    headers: authHeader(),
  });
};

const deposit_funds = (data) => {
  return axios.post(
    API_URL + `user/deposit/`,
    data,
    { headers: authHeader() }
  );
};

const withdraw_money = (acc_number, withdrawAmount, description) => {
  return axios.post(
    API_URL + "user/withdraw/",
    {
      acc_number,
      withdrawAmount,
      description,
    },
    { headers: authHeader() }
  );
};

const stake_money = (acc_number, lock_days, amount) => {
  return axios.post(
    API_URL + "user/stake/",
    {
      acc_number,
      lock_days,
      amount,
    },
    { headers: authHeader() }
  );
};

const unstake_money = (acc_number, staking_id) => {
  return axios.post(
    API_URL + "user/unstake/",
    {
      acc_number,
      staking_id,
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

const get_eth_rate = async () => {
  const response = await axios.get(
    "https://criptoya.com/api/belo/eth/ars/0.5"
  );
  return response.data;
};

const get_btc_rate = async () => {
  const response = await axios.get(
    "https://criptoya.com/api/belo/btc/ars/0.5"
  );
  return response.data;
};

const get_eth_usdt_rate = async () => {
  const response = await axios.get(
    "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USDT"
  );
  return response.data;
};

const get_btc_usdt_rate = async () => {
  const response = await axios.get(
    "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USDT"
  );
  return response.data;
};

const get_btc_eth_rate = async () => {
  const response = await axios.get(
    "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=ETH"
  );
  return response.data;
};

const swap = async (acc_number, fromAmount, toAmount, fromToken, toToken) => {
  return axios.post(
    API_URL + "user/swap",
    {
      acc_number,
      fromAmount,
      toAmount,
      fromToken,
      toToken
    },
    { headers: authHeader() }
  )
}

const upload_profile_img = (id, image) => {
  return axios.post(
    API_URL + `user/image/${id}`,
    image,
    { headers: authHeader() }
  );
}

const get_profile_img = (id) => {
  return axios.get(
    API_URL + `user/image/${id}`,
    { headers: authHeader() }
  );
}

const upload_id_img = (id, images) => {
  return axios.post(
    API_URL + `user/kyc/id_img/${id}`,
    images,
    { headers: authHeader() }
  );
}

const upload_docs = (id, docs) => {
  return axios.post(
    API_URL + `user/kyc/docs/${id}`,
    docs,
    { headers: authHeader() }
  );
}

const send_query = (firstname, lastname, phone, email, query) => {
  return axios.post(
    API_URL + "query",
    {
      firstname,
      lastname,
      phone,
      email,
      query,
    }
  );
}

const UserService = {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
  getUserById,
  updateUserById,
  deposit_funds,
  withdraw_money,
  get_transaction_history,
  get_staking_history,
  get_bank_history,
  stake_money,
  unstake_money,
  get_user_staked_balance,
  get_usdt_rate,
  get_eth_rate,
  get_btc_rate,
  get_eth_usdt_rate,
  get_btc_eth_rate,
  get_btc_usdt_rate,
  swap,
  get_user_balance,
  get_ars_user_balance,
  get_usdt_user_balance,
  get_ether_user_balance,
  get_bnb_user_balance,
  get_btc_user_balance,
  upload_profile_img,
  get_profile_img,
  upload_id_img,
  upload_docs,
  send_query
};
export default UserService;
