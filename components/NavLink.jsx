'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const NavLink = ({href,children}) => {
    const pathName = usePathname();
    const isActive = pathName === href;
  return (
    <Link
    href={href}
    className={`${
        isActive
        ? 'text-blue-600 hover:underline'
        : 'text-gray-700 hover:underline'
    }`}
    >
        {children}
    </Link>
  )
}

export default NavLink