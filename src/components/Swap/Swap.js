import React, { useState, useEffect, useMemo, useCallback } from 'react';
import TokenSelect from './TokenSelect';
import Currencies from '../../lib/Currencies.json';
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';
import { showLoading, hideLoading } from '../../lib/uiService';

const Swap = () => {

  const [fromToken, setFromToken] = useState(Object.values(Currencies)[0]);
  const [toToken, setToToken] = useState(Object.values(Currencies)[1]);
  const [fromBalance, setFromBalance] = useState(0);
  const [toBalance, setToBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [message, setMessage] = useState('');
  const [successful, setSuccessful] = useState(false);
  const currentUser = AuthService.getCurrentUser();


  useEffect(() => {
    if (fromToken) {
      if (fromToken.name === 'ARS') {
        UserService.get_user_balance(currentUser.id).then((res) => {
          setFromBalance(res.data);
        })
      }
      if (fromToken.name === 'USDT') {
        UserService.get_usdt_user_balance(currentUser.id).then((res) => {
          setFromBalance(res.data);
        })
      }
      if (fromToken.name === 'ETHER') {
        UserService.get_ether_user_balance(currentUser.id).then((res) => {
          setFromBalance(res.data);
        })
      }
      if (fromToken.name === 'BTC') {
        UserService.get_btc_user_balance(currentUser.id).then((res) => {
          setFromBalance(res.data);
        })
      }
    }
  }, [fromToken]);

  useEffect(() => {
    if (toToken) {
      if (toToken.name === 'ARS') {
        UserService.get_user_balance(currentUser.id).then((res) => {
          setToBalance(res.data);
        })
      }
      if (toToken.name === 'USDT') {
        UserService.get_usdt_user_balance(currentUser.id).then((res) => {
          setToBalance(res.data);
        })
      }
      if (toToken.name === 'ETHER') {
        UserService.get_ether_user_balance(currentUser.id).then((res) => {
          setToBalance(res.data);
        })
      }
      if (toToken.name === 'BTC') {
        UserService.get_btc_user_balance(currentUser.id).then((res) => {
          setToBalance(res.data);
        })
      }
    }
  }, [toToken]);

  useEffect(() => {
    if (fromToken && toToken) {
      if (toToken.name === fromToken.name) {
        const otherName = toToken.name === "ARS" ? "USDT" : "ARS"
        setToToken(Currencies[otherName])
      }
    }
  }, [fromToken, toToken])

  useEffect(() => {
    if (fromToken && toToken) {
      if (fromToken.name === 'ARS') {
        if (toToken.name === 'USDT') {
          UserService.get_usdt_rate().then((response) => {
            setReceiveAmount(amount / response.ask);
          })
        }
        if (toToken.name === 'ETHER') {
          UserService.get_eth_rate().then((response) => {
            setReceiveAmount(amount / response.ask);
          })
        }
        if (toToken.name === 'BTC') {
          UserService.get_btc_rate().then((response) => {
            setReceiveAmount(amount / response.ask);
          })
        }
      }
      if (fromToken.name === 'USDT') {
        if (toToken.name === 'ETHER') {
          UserService.get_eth_usdt_rate().then((response) => {
            setReceiveAmount(amount / response.USDT);
          })
        }
        if (toToken.name === 'ARS') {
          UserService.get_usdt_rate().then((response) => {
            setReceiveAmount(amount * response.ask);
          })
        }
        if (toToken.name === 'BTC') {
          UserService.get_btc_usdt_rate().then((response) => {
            setReceiveAmount(amount / response.USDT);
          })
        }
      }
      if (fromToken.name === 'ETHER') {
        if (toToken.name === 'USDT') {
          UserService.get_eth_usdt_rate().then((response) => {
            setReceiveAmount(amount * response.USDT);
          })
        }
        if (toToken.name === 'ARS') {
          UserService.get_eth_rate().then((response) => {
            setReceiveAmount(amount * response.ask);
          })
        }
        if (toToken.name === 'BTC') {
          UserService.get_btc_eth_rate().then((response) => {
            setReceiveAmount(amount / response.ETH);
          })
        }
      }
      if (fromToken.name === 'BTC') {
        if (toToken.name === 'USDT') {
          UserService.get_btc_usdt_rate().then((response) => {
            setReceiveAmount(amount * response.USDT);
          })
        }
        if (toToken.name === 'ARS') {
          UserService.get_btc_rate().then((response) => {
            setReceiveAmount(amount * response.ask);
          })
        }
        if (toToken.name === 'ETHER') {
          UserService.get_btc_eth_rate().then((response) => {
            setReceiveAmount(amount * response.ETH);
          })
        }
      }
    }
  }, [fromToken, toToken, amount])

  function currencyFormat(num) {
    if (typeof num !== 'undefined') {
      return num.toFixed(2);
    }
  }

  const handleSwap = () => {
    showLoading();
    if (fromToken && toToken) {
      UserService.swap(currentUser.accountNumber, amount, receiveAmount, fromToken.name, toToken.name).then((response) => {
        hideLoading();
        setMessage(response.data);
        setSuccessful(true);
        window.setTimeout(function () {
          window.location.reload();
        }, 1500);
      },
        (error) => {
          hideLoading();
          const resMessage =
            (error.response &&
              error.response.data) ||
            error.message ||
            error.toString();
          setSuccessful(false);
          setMessage(resMessage);
          setTimeout(() => {
            setMessage("");
          }, 2000);
        })
    }
  }
  return (
    <div>
      <div className='flex justify-center px-32 py-20'>
        <div>
          <div className='px-20 py-20 w-[600px] shadow-md rounded-lg bg-white'>
            <div className='flex flex-col gap-1 mb-12'>
              <TokenSelect
                title='From'
                token={fromToken}
                tokens={Currencies}
                select={setFromToken}
              />
              <p className='text-sm'>Your Balance: {currencyFormat(fromBalance)} </p>
            </div>
            <div className='flex flex-col gap-1 mb-12'>
              <TokenSelect
                title='To'
                token={toToken}
                tokens={Currencies}
                select={setToToken}
              />
              <p className='text-sm'>Your Balance: {currencyFormat(toBalance)}</p>
            </div>
            <div className='mb-12'>
              <p className='text-sm font-bold'>Amount</p>
              <input className='bg-[#e5e7eb] border-0 rounded-md w-full mb-1' type='number' placeholder={0} onChange={(e) => setAmount(e.target.value)} />
              {amount > fromBalance &&
                <p className='text-xs text-red-600'>Not enough balance</p>
              }
            </div>
            <p className='rounded-md bg-[#e5e7eb] px-2 py-2 mb-12 font-bold'>You will receive: {receiveAmount ? currencyFormat(receiveAmount) : 0}</p>
            <div className='flex justify-center w-full '>
              <button disabled={!amount || amount > fromBalance} className='text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400' onClick={handleSwap}>Swap</button>
            </div>
          </div>
        </div>
      </div>
      {message && (
        <div className="form-group fixed top-20 left-1/2 -translate-x-1/2">
          <div
            className={
              successful
                ? "bg-yellow-100 border border-yellow-400 yellow-red-700 px-4 py-3 rounded relative"
                : "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            }
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    </div>

  );
}

export default Swap;