'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SignUp = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    username: '',
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log('Signup successfully', response.data.message);
      // after successful signup, push to login page programmatically
      router.push('/login');
    } catch (error: any) {
      console.log('Signup failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-center text-black text-2xl'>
        {loading ? 'Processing' : 'Signup'}
      </h1>
      <hr />
      <label htmlFor='username'>username</label>
      <input
        id='username'
        type='text'
        value={user.username}
        placeholder='username'
        className='py-2 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-800'
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
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
        onClick={onSignup}
      >
        {buttonDisabled ? 'No Signup' : 'Signup Here'}
      </button>
      <Link href='/login'>Visit Login Page</Link>
    </div>
  );
};

export default SignUp;
