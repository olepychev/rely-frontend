import React, { useState, useEffect, useMemo, useCallback } from 'react';
import TokenSelect from './TokenSelect';
import Currencies from '../../lib/Currencies.json';
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';

const Swap = () => {

  const [fromToken, setFromToken] = useState(Object.values(Currencies)[0]);
  const [toToken, setToToken] = useState(Object.values(Currencies)[1]);
  const [fromBalance, setFromBalance] = useState("");
  const [toBalance, setToBalance] = useState("");
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
        else if (toToken.name === 'ETHER') {
          UserService.get_eth_rate().then((response) => {
            setReceiveAmount(amount / response.ask);
          })
        }
      }
      else {
        if (fromToken.name === 'USDT') {
          if (toToken.name === 'ETHER') {
            UserService.get_eth_usdt_rate().then((response) => {
              setReceiveAmount(amount / response.USDT);
            })
          }
          else if (toToken.name === 'ARS') {
            UserService.get_usdt_rate().then((response) => {
              setReceiveAmount(amount * response.ask);
            })
          }
        }
        else if (fromToken.name === 'ETHER') {
          if (toToken.name === 'USDT') {
            UserService.get_eth_usdt_rate().then((response) => {
              setReceiveAmount(amount * response.USDT);
            })
          }
          else if (toToken.name === 'ARS') {
            UserService.get_eth_rate().then((response) => {
              setReceiveAmount(amount * response.ask);
            })
          }
        }
      }
      console.log("asdfasdfasd")
    }
  }, [fromToken, toToken, amount])

  function currencyFormat(num) {
    if (num) {
      console.log(num)
      return num.toFixed(2);
    }
  }

  const handleSwap = () => {
    if (fromToken && toToken) {
      if (fromToken.name === 'ARS') {
        if (toToken.name === 'USDT') {
          UserService.exchange_ars_to_usdt(currentUser.accountNumber, amount, receiveAmount).then((response) => {
            setMessage(response.data);
            setSuccessful(true);
            console.log(response);
            window.setTimeout(function () {
              window.location.reload();
            }, 1500);
          },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              setSuccessful(false);
              setMessage(resMessage);
            })
        }
        else if (toToken.name === 'ETHER') {
          UserService.get_eth_rate().then((response) => {
            UserService.exchange_ars_to_eth(currentUser.accountNumber, amount, receiveAmount).then((response) => {
              setMessage(response.data);
              setSuccessful(true);
              console.log(response);
              window.setTimeout(function () {
                window.location.reload();
              }, 1500);
            },
              (error) => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                setSuccessful(false);
                setMessage(resMessage);
              })
          })
        }
      }
      else {
        if (fromToken.name === 'USDT') {
          if (toToken.name === 'ETHER') {
            UserService.get_eth_usdt_rate().then((response) => {
              UserService.exchange_usdt_to_eth(currentUser.accountNumber, amount, receiveAmount).then((response) => {
                setMessage(response.data);
                setSuccessful(true);
                console.log(response);
                window.setTimeout(function () {
                  window.location.reload();
                }, 1500);
              },
                (error) => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();
                  setSuccessful(false);
                  setMessage(resMessage);
                })
            })
          }
          else if (toToken.name === 'ARS') {
            UserService.get_usdt_rate().then((response) => {
              UserService.exchange_usdt_to_ars(currentUser.accountNumber, amount, receiveAmount).then((response) => {
                setMessage(response.data);
                setSuccessful(true);
                console.log(response);
                window.setTimeout(function () {
                  window.location.reload();
                }, 1500);
              },
                (error) => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();
                  setSuccessful(false);
                  setMessage(resMessage);
                })
            })
          }
        }
        else if (fromToken.name === 'ETHER') {
          if (toToken.name === 'USDT') {
            UserService.get_eth_usdt_rate().then((response) => {
              UserService.exchange_eth_to_usdt(currentUser.accountNumber, amount, receiveAmount).then((response) => {
                setMessage(response.data);
                setSuccessful(true);
                console.log(response);
                window.setTimeout(function () {
                  window.location.reload();
                }, 1500);
              },
                (error) => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();
                  setSuccessful(false);
                  setMessage(resMessage);
                })
            })
          }
          else if (toToken.name === 'ARS') {
            UserService.get_eth_rate().then((response) => {
              UserService.exchange_eth_to_ars(currentUser.accountNumber, amount, receiveAmount).then((response) => {
                setMessage(response.data);
                setSuccessful(true);
                console.log(response);
                window.setTimeout(function () {
                  window.location.reload();
                }, 1500);
              },
                (error) => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();
                  setSuccessful(false);
                  setMessage(resMessage);
                })
            })
          }
        }
      }
      console.log("asdfasdfasd")
    }
  }
  return (
    <div className='flex justify-center px-32 py-20'>
      <div>
        {!successful &&
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
              <input className='bg-[#e5e7eb] border-0 rounded-md w-full' type='number' placeholder={0} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <p className='rounded-md bg-[#e5e7eb] px-2 py-2 mb-12 font-bold'>You will receive: {receiveAmount ? currencyFormat(receiveAmount) : 0}</p>
            <div className='flex justify-center w-full '>
              <button className='text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' onClick={handleSwap}>Swap</button>
            </div>
          </div>
        }

        {message && (
          <div className="form-group">
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
    </div>

  );
}

export default Swap;