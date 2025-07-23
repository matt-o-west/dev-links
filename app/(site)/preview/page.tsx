'use client'
import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import ShareModal from '@/components/ShareLinkModal'
import axios from 'axios'
import ProfilePreview from '@/components/ProfilePreview'
import toast from 'react-hot-toast'
import useMobileDetect from '@/hooks/useMobileDetect'
import useSWR from 'swr'
interface User {
  links: {
    id: string
    url: string
    platform: string
  }[]
  id: string
  platform: string
  userUrl: string
  createdAt: Date
  userId: string
  username: string
  firstname: string
  lastname: string
  email: string
  profileImage: string
  updatedAt: Date
}

const Preview = () => {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobileDetect()
  const fetcher = (url: string) => axios.get(url).then((res) => res.data)

  const { data: profile, error } = useSWR('/api/profile', fetcher)

  useEffect(() => {
    if (error) {
      toast.error('An unexpected error occurred.')
      // Additional error handling can be added here
    }
  }, [error])

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  console.log(profile)

  return (
    <main className='flex flex-col justify-start align-middle items-center bg-background w-screen min-h-screen'>
      {!isMobile && (
        <div className='w-full h-1/3 bg-primary.blue absolute rounded-b-3xl top-0 left-0 z-0' />
      )}
      <nav className='flex bg-tertiary.gray rounded-lg desktop:w-[60rem] desktop:mt-1 tablet:w-[40rem] desktop:text-md tablet:mt-2 phone:w-80 phone:px-2 phone:text-sm h-16 items-start space-x-4 z-10 justify-between'>
        <Link
          href='/editor'
          className='bg-transparent text-center hover:bg-tertiary.blue text-primary.blue font-bold border-primary.blue border-2 rounded-md px-4 py-2 mr-4 desktop:w-52 tablet:w-72 self-center' // Added right margin
        >
          Back to Editor
        </Link>
        <button
          className='flex justify-center align-middle bg-primary.blue hover:bg-secondary.blue text-white font-bold border-primary.blue border-2 rounded-md px-4 py-2 desktop:w-52 tablet:w-72 self-center'
          onClick={toggleModal}
        >
          Share Link
        </button>
      </nav>

      {isOpen && (
        <ShareModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          uniqueUrl={profile.userUrl}
        />
      )}
      <div className='mb-6 max-w-[26rem] w-full z-40'>
        <ProfilePreview profile={profile} />
      </div>
    </main>
  )
}

export default Preview
