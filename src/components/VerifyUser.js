import React, { useEffect, useState } from 'react';
import AuthService from '../services/auth.service';
import { Link, useParams } from 'react-router-dom';

const VerifyUser = () => {
  const [confirmed, setConfirmed] = useState(false);
  const [message, setMessage] = useState('');
  const { confirmationCode } = useParams();

  useEffect(() => {
    AuthService.verifyUser(confirmationCode).then((response) => {
      setMessage(response);
      setConfirmed(true);
    }, (err) => {
      setConfirmed(false);
      setMessage(err.response.data);
      setTimeout(() => {
        window.location.href = '/';
      }, 2000)
    });
  });
  return (
    <>
      <div className='flex justify-center'>
        <div
          className={
            confirmed
              ? "bg-green-100 border border-green-400 green-red-700 px-4 py-3 rounded mt-56"
              : "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-56"
          }
          role="alert"
        >
          {message}
        </div>
      </div>
    </>
  );
}
export default VerifyUser;