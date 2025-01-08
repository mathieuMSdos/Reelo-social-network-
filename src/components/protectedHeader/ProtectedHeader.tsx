import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProtectedHeader = () => {
  return (
<header>
  <nav className='border border-slate-900'>
  <Link className='flex' href="/profil">
  <Image className='border border-black'
            src="/logo/logo_white_mode.png"
            width={170}
            height={70}
            alt="logo-icon"
          />

        </Link>
  </nav>
</header>
  );
};

export default ProtectedHeader;