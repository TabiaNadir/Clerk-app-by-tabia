'use client';

import Link from 'next/link';
import { UserButton, useAuth } from '@clerk/nextjs';

const Header = () => {
  const { userId } = useAuth();

  return (
    <nav className='flex items-center justify-between px-4 py-3 mb-4 bg-blue-700'> {/* Reduced padding and margin */}
      <div className='flex items-center'>
        <Link href='/'>
          <div className='text-lg font-bold text-white uppercase'>Clerk App</div>
        </Link>
      </div>
      <div className='flex items-center text-white'>
        {!userId && (
          <>
            <Link href='/sign-in' className='text-gray-300 hover:text-white mr-3'>
              Sign In
            </Link>
            <Link href='/sign-up' className='text-gray-300 hover:text-white mr-3'>
              Sign Up
            </Link>
            <Link href='/register' className='text-gray-300 hover:text-white mr-3'>
              Register
            </Link>
          </>
        )}
        {userId && (
          <Link href='/profile' className='text-gray-300 hover:text-white mr-3'>
            Profile
          </Link>
        )}
        <div className='ml-auto'>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </nav>
  );
};

export default Header;
