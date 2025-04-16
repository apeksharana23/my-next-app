'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { AuthContext } from '../providers/authProvider';

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = (e) => {
    e.preventDefault();
    deleteCookie('token');
    setIsLoggedIn(false);
    router.push('/signin');
  };

  return (
    <nav className="flex flex-wrap items-center justify-between w-full py-4 px-4 text-lg text-gray-700 bg-white">
      <ul className="flex flex-wrap gap-4">
        <li><Link href="/" className="hover:text-purple-400">Home 1</Link></li>
        <li><Link href="/blog" className="hover:text-purple-400">Blog</Link></li>
        <li><Link href="/products" className="hover:text-purple-400">Product</Link></li>
        <li><Link href="/users" className="hover:text-purple-400">User</Link></li>

        {isLoggedIn ? (
          <>
            <li><Link href="/my-profile" className="hover:text-purple-400">My Profile</Link></li>
            <li><a href="#" onClick={handleLogout} className="hover:text-purple-400">Sign Out</a></li>
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
