'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ProfilePage = () => {
  const [data, setData] = useState('nothing');
  const router = useRouter();

  const onLogout = async () => {
    try {
      const response = await axios.get('/api/users/logout');
      console.log(response.data);
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/certainUser');
    console.log(res.data);
    // from certainUser GET function
    setData(res.data.data._id);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile </h1>
      <hr />
      <p>Profile Page</p>
      <h2 className='p-3 rounded bg-green-500 mb-2'>
        {data === 'nothing' ? (
          'Nothing'
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        className='bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded'
        onClick={onLogout}
      >
        Logout
      </button>
      <button
        className='bg-green-800 hover:bg-blue-700 font-bold py-2 px-4 rounded my-2'
        onClick={getUserDetails}
      >
        Get User Details
      </button>
    </div>
  );
};

export default ProfilePage;
