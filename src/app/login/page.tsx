'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log('Login Successful', response.data);
      router.push('/profile');
    } catch (error: any) {
      console.log('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-center text-black text-2xl'>
        {loading ? 'Processing' : 'Login'}
      </h1>
      <hr />

      <label htmlFor='email'>email</label>
      <input
        id='email'
        type='text'
        value={user.email}
        placeholder='email'
        className='py-2 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-800'
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor='password'>password</label>
      <input
        id='password'
        type='password'
        value={user.password}
        placeholder='password'
        className='py-2 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-800'
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        className='p-4 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        onClick={onLogin}
      >
        {buttonDisabled ? 'No Login' : 'Login Here'}
      </button>
      <Link href='/signup'>Visit SignUp Page</Link>
    </div>
  );
};

export default LoginPage;
