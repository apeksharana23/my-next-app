'use client';

import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCookie, getCookie } from 'cookies-next';
import { AuthContext } from '../providers/authProvider';
import Image from 'next/image';

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getCookie('token');
      if (token) {
        setIsLoggedIn(true);
      }
    }
    
    checkAuth();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    deleteCookie('token');
    setIsLoggedIn(false);
    setUser(null);
    router.push('/signin');
  };

  return (
    <nav className="flex flex-wrap items-center justify-end w-full py-4 px-4 text-lg text-gray-700 bg-white">
      <ul className="flex flex-wrap gap-4">
        <li><Link href="/" className="hover:text-purple-400">Home 1</Link></li>
        <li><Link href="/blog" className="hover:text-purple-400">Blog</Link></li>
        <li><Link href="/products" className="hover:text-purple-400">Product</Link></li>
        <li><Link href="/users" className="hover:text-purple-400">User</Link></li>
        <li><Link href="/contact-us" className="hover:text-purple-400">Contact Us</Link></li>

        {isLoggedIn ? (
          <>
            <li><Link href="/my-profile" className="hover:text-purple-400">My Profile</Link></li>
            <li><Link href="#" onClick={handleLogout} className="hover:text-purple-400">Sign Out</Link></li>
            <li><Link href="/my-profile" className="hover:text-purple-400"><Image src={user && user.profile ? user.profile: '/uploads/dummy-user.png'} alt="" height="30" width="30" className='profileImage' /> {user?.name} </Link></li>
          </>
        ) : (
          <>
            <li><Link href="/signup" className="hover:text-purple-400">Sign Up</Link></li>
            <li><Link href="/signin" className="hover:text-purple-400">Sign In</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
