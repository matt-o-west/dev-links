import React from 'react'
import { signOut } from 'next-auth/react'
import useMobileDetect from '@/hooks/useMobileDetect'

const LogoutButton = () => {
  const isMobile = useMobileDetect()

  return (
    <button onClick={() => signOut({ callbackUrl: '/signin' })}>
      <div className='flex'>
        {!isMobile && (
          <p className='text-primary.gray pl-2 font-medium'>Logout</p>
        )}
        {isMobile && (
          <svg
            className='w-5 h-5 ml-1 text-primary.gray dark:text-white'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 16 16'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3'
            />
          </svg>
        )}
      </div>
    </button>
  )
}

export default LogoutButton
